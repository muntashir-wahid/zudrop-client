import { useEffect, useState } from "react";

import api from "../lib/http/axios";
import socket from "../lib/socket/client";
import type { Drop, StockEvent } from "../types/drop";

type SocketStatus = "connecting" | "live" | "reconnecting" | "offline";

const normalizeDrops = (payload: unknown): Drop[] => {
  if (Array.isArray(payload)) {
    return payload as Drop[];
  }

  if (payload && typeof payload === "object") {
    const maybeData = (payload as { data?: unknown }).data;
    if (Array.isArray(maybeData)) {
      return maybeData as Drop[];
    }

    const maybeDrops = (payload as { drops?: unknown }).drops;
    if (Array.isArray(maybeDrops)) {
      return maybeDrops as Drop[];
    }
  }

  return [];
};

const mergeDrop = (base: Drop | undefined, overlay: Drop) => {
  const merged: Drop = {
    ...(base ?? {}),
    ...overlay,
    description: overlay.description ?? base?.description ?? null,
    purchases: overlay.purchases ?? base?.purchases ?? [],
  };

  return merged;
};

const mergeDropCollections = (baseDrops: Drop[], overlayDrops: Drop[]) => {
  const overlayById = new Map(overlayDrops.map((drop) => [drop.id, drop]));
  const baseIds = new Set(baseDrops.map((drop) => drop.id));

  const merged = baseDrops.map((drop) => {
    const overlay = overlayById.get(drop.id);
    return overlay ? mergeDrop(drop, overlay) : drop;
  });

  const overlayOnlyDrops = overlayDrops.filter((drop) => !baseIds.has(drop.id));

  return [...overlayOnlyDrops, ...merged];
};

const upsertDrop = (currentDrops: Drop[], event: StockEvent) => {
  const existingIndex = currentDrops.findIndex((drop) => drop.id === event.drop.id);
  const currentDrop =
    existingIndex >= 0 ? currentDrops[existingIndex] : undefined;
  const nextDrop = mergeDrop(currentDrop, event.drop);

  if (existingIndex === -1) {
    return [nextDrop, ...currentDrops];
  }

  const nextDrops = [...currentDrops];
  nextDrops[existingIndex] = nextDrop;
  return nextDrops;
};

const useDrops = () => {
  const [drops, setDrops] = useState<Drop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [socketStatus, setSocketStatus] = useState<SocketStatus>("connecting");
  const [lastUpdatedAt, setLastUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    api
      .get("/drops")
      .then((response) => {
        if (!isMounted) {
          return;
        }

        setDrops((currentDrops) =>
          mergeDropCollections(normalizeDrops(response.data), currentDrops),
        );
      })
      .catch((error) => {
        console.error("Error fetching drops:", error);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleConnect = () => setSocketStatus("live");
    const handleDisconnect = () => setSocketStatus("offline");
    const handleReconnectAttempt = () => setSocketStatus("reconnecting");
    const handleReconnect = () => setSocketStatus("live");
    const handleConnectError = () => setSocketStatus("reconnecting");
    const handleStock = (event: StockEvent) => {
      setDrops((currentDrops) => upsertDrop(currentDrops, event));
      setLastUpdatedAt(new Date().toISOString());
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("reconnect_attempt", handleReconnectAttempt);
    socket.on("reconnect", handleReconnect);
    socket.on("connect_error", handleConnectError);
    socket.on("stock", handleStock);

    if (!socket.connected) {
      socket.connect();
    } else {
      setSocketStatus("live");
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("reconnect_attempt", handleReconnectAttempt);
      socket.off("reconnect", handleReconnect);
      socket.off("connect_error", handleConnectError);
      socket.off("stock", handleStock);
    };
  }, []);

  return {
    drops,
    isLoading,
    lastUpdatedAt,
    socketStatus,
  };
};

export default useDrops;
