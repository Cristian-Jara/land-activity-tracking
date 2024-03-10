"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { useVerify } from "@/hooks";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  useVerify();
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);
  const pathName = usePathname();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push(`/auth/login?next=${pathName}`);
    }
  }, [isAuthenticated, pathName, router, isLoading]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return children;
}