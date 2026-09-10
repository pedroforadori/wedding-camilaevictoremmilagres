import type { Metadata } from "next";
import { SimplePageLayout } from "@/components/SimplePageLayout";
import { PendingNote } from "@/components/PendingNote";
import { presentes } from "@/content/wedding";

export const metadata: Metadata = {
  title: "Lista de casamento virtual | Camila & Victor",
};

export default function PresentesPage() {
  return (
    <SimplePageLayout title={presentes.title} intro={presentes.intro}>
      <PendingNote note={presentes.note} issueUrl={presentes.issueUrl} />
    </SimplePageLayout>
  );
}
