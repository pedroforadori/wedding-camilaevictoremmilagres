import { LoginForm } from "./LoginForm";

export default function AdminNoivosLoginPage() {
  return (
    <section className="texture-paper px-6 py-24">
      <div className="mx-auto max-w-md text-center">
        <h1 className="font-display text-4xl italic text-ocean-deep">
          Área dos noivos
        </h1>
        <span
          aria-hidden="true"
          className="mx-auto mt-4 block h-px w-16 bg-sand-dark"
        />
        <p className="mt-8 text-ink/80">
          Digite a senha para acessar as informações privadas do casamento.
        </p>

        <LoginForm />
      </div>
    </section>
  );
}
