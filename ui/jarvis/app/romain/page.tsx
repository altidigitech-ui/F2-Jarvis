import { PersonaLayout } from "@/components/PersonaLayout";

export const metadata = {
  title: "Romain · F2-Jarvis",
};

export default function RomainPage() {
  return <PersonaLayout persona="romain" showF2Toggle={true} />;
}
