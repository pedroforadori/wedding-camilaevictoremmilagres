export function PendingNote({
  note,
  issueUrl,
}: {
  note: string;
  issueUrl?: string;
}) {
  return (
    <div className="mx-auto mt-10 max-w-md rounded-xl border border-dashed border-sand-dark bg-sand/30 px-6 py-5 text-center">
      <span className="rounded-full bg-sand px-3 py-1 text-xs uppercase tracking-wide text-ocean-deep">
        Em breve
      </span>
      <p className="mt-3 text-sm text-ink/70">{note}</p>
      {issueUrl && (
        <a
          href={issueUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block text-xs text-ink/50 underline decoration-ocean/40 underline-offset-4 hover:text-ocean-deep"
        >
          acompanhar
        </a>
      )}
    </div>
  );
}
