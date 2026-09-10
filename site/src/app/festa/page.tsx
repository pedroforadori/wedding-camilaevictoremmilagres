import type { Metadata } from "next";
import { SimplePageLayout } from "@/components/SimplePageLayout";
import { PendingNote } from "@/components/PendingNote";
import { festa } from "@/content/wedding";

export const metadata: Metadata = { title: "Festa | Camila & Victor" };

export default function FestaPage() {
  return (
    <SimplePageLayout title={festa.title} intro={festa.intro}>
      <PendingNote note={festa.note} issueUrl={festa.issueUrl} />
    </SimplePageLayout>
  );
}
