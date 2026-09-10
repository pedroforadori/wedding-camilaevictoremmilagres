import type { Metadata } from "next";
import { SimplePageLayout } from "@/components/SimplePageLayout";
import { PendingNote } from "@/components/PendingNote";
import { padrinhos } from "@/content/wedding";

export const metadata: Metadata = { title: "Padrinhos | Camila & Victor" };

export default function PadrinhosPage() {
  return (
    <SimplePageLayout title={padrinhos.title} intro={padrinhos.intro}>
      <PendingNote note={padrinhos.note} issueUrl={padrinhos.issueUrl} />
    </SimplePageLayout>
  );
}
