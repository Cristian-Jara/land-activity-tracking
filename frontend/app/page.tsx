import { RequireAuth } from "@/components/common";
import { redirect } from "next/navigation";

export default function Home() {
  return <RequireAuth>{redirect("/activities")}</RequireAuth>;
}
