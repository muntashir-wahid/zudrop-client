import { io } from "socket.io-client";

const getFallbackOrigin = () =>
  typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";

const resolveSocketUrl = () => {
  const rawUrl =
    import.meta.env.VITE_SOCKET_URL ??
    import.meta.env.VITE_API_URL ??
    import.meta.env.VITE_BASE_URL ??
    "";

  if (!rawUrl) {
    return getFallbackOrigin();
  }

  try {
    const parsedUrl = new URL(rawUrl, getFallbackOrigin());
    return parsedUrl.origin;
  } catch {
    return rawUrl;
  }
};

const socket = io(resolveSocketUrl(), {
  autoConnect: false,
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
});

export default socket;
