"use client";

export function RemoveOrderButton({
  id,
  action,
}: {
  id: string;
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm("Remover este pedido Pix? Essa ação não pode ser desfeita.")) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-xs text-gold-deep underline decoration-gold/40 underline-offset-4 hover:text-gold"
      >
        Remover
      </button>
    </form>
  );
}
