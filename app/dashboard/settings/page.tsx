import SettingsClient from "./settings-client";

export const metadata = {
  title: "Settings — RecallIQ",
  description: "Manage account configuration states.",
};

export default function SettingsPage() {
  return <SettingsClient />;
}
