import { AdminSubpageHeader } from "../AdminSubpageHeader";

export default function AdminNoivosPresentesPage() {
  return (
    <section className="texture-paper px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <AdminSubpageHeader title="Presentes" />
        <p className="mt-10 text-sm text-ink/50">
          A lista de presentes ainda não foi configurada, então não há
          presentes recebidos para mostrar aqui.
        </p>
      </div>
    </section>
  );
}
