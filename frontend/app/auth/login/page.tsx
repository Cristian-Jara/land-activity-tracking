"use strict";
import React from "react";
import type { Metadata } from "next";
import { LoginForm } from "@/components/forms";

export const metadata: Metadata = {
  title: "Land Activity Tracker - Login",
  description: "Login to track your land activities with ease",
};

export default function Login() {
  return <LoginForm />;
}
