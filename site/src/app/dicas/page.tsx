import type { Metadata } from "next";
import { SimplePageLayout } from "@/components/SimplePageLayout";
import { PendingNote } from "@/components/PendingNote";
import { dicas } from "@/content/wedding";

export const metadata: Metadata = { title: "Dicas | Camila & Victor" };

export default function DicasPage() {
  return (
    <SimplePageLayout title={dicas.title} intro={dicas.intro}>
      <PendingNote note={dicas.note} issueUrl={dicas.issueUrl} />
    </SimplePageLayout>
  );
}
