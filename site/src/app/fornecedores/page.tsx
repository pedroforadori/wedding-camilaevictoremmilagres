import type { Metadata } from "next";
import { SimplePageLayout } from "@/components/SimplePageLayout";
import { PendingNote } from "@/components/PendingNote";
import { fornecedores } from "@/content/wedding";

export const metadata: Metadata = { title: "Fornecedores | Camila & Victor" };

export default function FornecedoresPage() {
  return (
    <SimplePageLayout title={fornecedores.title} intro={fornecedores.intro}>
      <PendingNote note={fornecedores.note} issueUrl={fornecedores.issueUrl} />
    </SimplePageLayout>
  );
}
