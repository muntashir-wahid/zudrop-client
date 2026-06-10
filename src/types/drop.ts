export type Purchase = {
  username: string;
  purchasedAt: string;
};

export type LiveDrop = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  availableStock: number;
  isActive?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date | null;
};

export type StockEvent = {
  action: "created" | "reserved";
  drop: LiveDrop;
};

export type Drop = {
  id: string;
  name: string;
  totalStock?: number;
  description: string | null;
  price: number;
  availableStock: number;
  isActive?: boolean;
  startsAt?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date | null;
  purchases?: Purchase[];
};
