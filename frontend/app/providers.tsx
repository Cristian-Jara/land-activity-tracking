"use client";

import { NextUIProvider } from "@nextui-org/react";
import RootProvider from "@/redux/provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RootProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </RootProvider>
  );
}
