export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="font-body text-xs uppercase tracking-[0.3em] text-gold">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-display text-4xl text-gold">
        {title}
      </h2>
      <span
        aria-hidden="true"
        className="mt-4 h-px w-16 bg-sand-dark"
      />
    </div>
  );
}
