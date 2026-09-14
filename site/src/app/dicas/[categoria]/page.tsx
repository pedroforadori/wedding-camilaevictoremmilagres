import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DicaCard } from "@/components/DicaCard";
import { dicas } from "@/content/wedding";

export function generateStaticParams() {
  return dicas.sections.map((section) => ({ categoria: section.key }));
}

export async function generateMetadata({
  params,
}: PageProps<"/dicas/[categoria]">): Promise<Metadata> {
  const { categoria } = await params;
  const section = dicas.sections.find((s) => s.key === categoria);
  return {
    title: section
      ? `${section.title} | Dicas | Camila & Victor`
      : "Dicas | Camila & Victor",
  };
}

export default async function DicaCategoriaPage({
  params,
}: PageProps<"/dicas/[categoria]">) {
  const { categoria } = await params;
  const section = dicas.sections.find((s) => s.key === categoria);
  if (!section) notFound();

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/#dicas"
          className="text-sm text-ocean-deep underline underline-offset-4"
        >
          ← Voltar para Dicas
        </Link>
        <div className="mt-6">
          <DicaCard section={section} />
        </div>
      </div>
    </section>
  );
}
