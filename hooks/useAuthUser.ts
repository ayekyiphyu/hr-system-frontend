"use client";

import { useEffect, useState } from "react";

export interface AuthUser {
  name: string;
  role: string;
  avatar?: string;
  isAdmin?: boolean;
  isUser?: boolean;
  isOrganization?: boolean;
  isJobseeker?: boolean;
}

export function useAuthUser(): AuthUser | null {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("authUser");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
  }, []);

  return user;
}
