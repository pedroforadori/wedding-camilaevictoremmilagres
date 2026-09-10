import type { Metadata } from "next";
import { SimplePageLayout } from "@/components/SimplePageLayout";
import { PendingNote } from "@/components/PendingNote";
import { cerimonia } from "@/content/wedding";

export const metadata: Metadata = { title: "Cerimônia | Camila & Victor" };

export default function CerimoniaPage() {
  return (
    <SimplePageLayout title={cerimonia.title} intro={cerimonia.intro}>
      <PendingNote note={cerimonia.note} issueUrl={cerimonia.issueUrl} />
    </SimplePageLayout>
  );
}
