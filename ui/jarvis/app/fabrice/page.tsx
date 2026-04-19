import { PersonaLayout } from "@/components/PersonaLayout";
import { Chat } from "@/components/Chat";

export const metadata = {
  title: "Fabrice · F2-Jarvis",
};

export default function FabricePage() {
  return (
    <PersonaLayout persona="fabrice">
      <Chat persona="fabrice" />
    </PersonaLayout>
  );
}
