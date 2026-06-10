import { useState } from "react";
import type { User } from "../types/user";

const ZU_USER_SESSION_KEY = "zu_user_session";

export default function useUserSession() {
  const [user] = useState<User>(() => {
    const storedUser = localStorage.getItem(ZU_USER_SESSION_KEY);

    if (storedUser) {
      return JSON.parse(storedUser) as User;
    }

    const uuid = crypto.randomUUID().slice(0, 8);

    const newUser: User = {
      username: `zu_guest_${uuid}`,
    };

    localStorage.setItem(ZU_USER_SESSION_KEY, JSON.stringify(newUser));

    return newUser;
  });

  return user;
}
