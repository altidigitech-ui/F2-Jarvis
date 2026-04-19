import { PersonaLayout } from "@/components/PersonaLayout";
import { Chat } from "@/components/Chat";

export const metadata = {
  title: "Romain · F2-Jarvis",
};

export default function RomainPage() {
  return (
    <PersonaLayout persona="romain" showF2Toggle={true}>
      <Chat persona="romain" />
    </PersonaLayout>
  );
}
