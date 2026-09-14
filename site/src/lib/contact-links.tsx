const contactLinkClass =
  "text-ocean-deep underline decoration-ocean/40 underline-offset-2 hover:text-ocean";

export function renderPhone(phone: string) {
  const segments = phone.split("/").map((part) => part.trim());
  return segments.map((part, index) => {
    const digits = part.replace(/\D/g, "");
    const isWhatsapp = /whatsapp/i.test(part) || digits.length === 11;
    const href = isWhatsapp
      ? `https://wa.me/55${digits}`
      : `tel:+55${digits}`;
    return (
      <span key={index}>
        <a
          href={href}
          target={isWhatsapp ? "_blank" : undefined}
          rel={isWhatsapp ? "noreferrer" : undefined}
          className={contactLinkClass}
        >
          {part}
        </a>
        {index < segments.length - 1 ? " / " : ""}
      </span>
    );
  });
}

export function InstagramLink({ handle }: { handle: string }) {
  return (
    <a
      href={`https://instagram.com/${handle.replace(/^@/, "")}`}
      target="_blank"
      rel="noreferrer"
      className={contactLinkClass}
    >
      {handle}
    </a>
  );
}

const instagramHandlePattern = /@[a-zA-Z0-9_.]+/;
const phonePattern = /\(\d{2}\)\s?\d{4,5}-\d{4}/;
const inlineContactPattern = new RegExp(
  `(${instagramHandlePattern.source}|${phonePattern.source})`,
  "g",
);
const isInstagramHandle = new RegExp(`^${instagramHandlePattern.source}$`);
const isPhone = new RegExp(`^${phonePattern.source}$`);

export function renderTextWithContactLinks(text: string) {
  return text.split(inlineContactPattern).map((part, index) => {
    if (isInstagramHandle.test(part)) {
      return <InstagramLink key={index} handle={part} />;
    }
    if (isPhone.test(part)) {
      return <span key={index}>{renderPhone(part)}</span>;
    }
    return part;
  });
}

export { contactLinkClass };
