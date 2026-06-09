// types/drop.ts

export type Buyer = {
  id: string;
  username: string;
  createdAt: string;
};

export type Drop = {
  id: string;
  name: string;
  totalStock: number;
  availableStock: number;

  startAt: string;

  recentPurchasers: Buyer[];

  reservation?: {
    id: string;
    active: boolean;
    expiresAt: string;
  } | null;
};
