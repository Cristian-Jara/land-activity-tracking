"use strict";
"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { useVerifyMutation } from "@/redux/features/authApiSlice";
import { setAuth, finishLoading } from "@/redux/features/authSlice";

export default function useVerify() {
  const dispatch = useAppDispatch();
  const [verify] = useVerifyMutation();

  useEffect(() => {
    verify(undefined)
      .unwrap()
      .then(() => {
        dispatch(setAuth());
      })
      .finally(() => {
        dispatch(finishLoading());
      });
  }, []);
}
