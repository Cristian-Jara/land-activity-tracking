import { RequireAuth } from "@/components/common";

export default function Home() {
  return (
    <RequireAuth>
      <div>Home</div>
    </RequireAuth>
  );
}
