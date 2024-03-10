"use client";

import { useRef } from "react";
import { makeStore, AppStore } from "./store";
import { Provider } from "react-redux";

interface Props {
  children: React.ReactNode;
}

export default function RootProvider({ children }: Props) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
