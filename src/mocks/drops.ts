import type { Drop } from "../types/drop";

export const mockDrops: Drop[] = [
  {
    id: "drop_1",
    name: "Air Jordan 1 Retro High OG",
    totalStock: 100,
    availableStock: 42,
    startAt: new Date(Date.now() + 1000 * 60 * 60).toISOString(),

    recentPurchasers: [
      { id: "u1", username: "Hasan", createdAt: "2026-06-09T10:00:00Z" },
      { id: "u2", username: "Rahim", createdAt: "2026-06-09T10:01:00Z" },
      { id: "u3", username: "Karim", createdAt: "2026-06-09T10:02:00Z" },
    ],

    reservation: null,
  },

  {
    id: "drop_2",
    name: "Nike Dunk Low ‘Panda’",
    totalStock: 50,
    availableStock: 0,
    startAt: new Date(Date.now() + 1000 * 60 * 120).toISOString(),

    recentPurchasers: [
      { id: "u4", username: "Siam", createdAt: "2026-06-09T09:50:00Z" },
      { id: "u5", username: "Nayeem", createdAt: "2026-06-09T09:51:00Z" },
      { id: "u6", username: "Rafi", createdAt: "2026-06-09T09:52:00Z" },
    ],

    reservation: null,
  },

  {
    id: "drop_3",
    name: "Yeezy Boost 350 V2",
    totalStock: 75,
    availableStock: 18,
    startAt: new Date(Date.now() + 1000 * 60 * 30).toISOString(),

    recentPurchasers: [
      { id: "u7", username: "Tanvir", createdAt: "2026-06-09T08:20:00Z" },
      { id: "u8", username: "Imran", createdAt: "2026-06-09T08:21:00Z" },
      { id: "u9", username: "Jahid", createdAt: "2026-06-09T08:22:00Z" },
    ],

    reservation: {
      id: "res_1",
      active: true,
      expiresAt: new Date(Date.now() + 1000 * 45).toISOString(),
    },
  },
];
