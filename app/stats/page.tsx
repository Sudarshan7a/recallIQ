import { redirect } from "next/navigation";

export default function StatsPageRedirect() {
  redirect("/dashboard/stats");
}
