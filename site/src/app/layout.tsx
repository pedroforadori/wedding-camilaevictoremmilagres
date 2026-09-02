import type { Metadata } from "next";
import { Cormorant_Garamond, Parisienne, Jost } from "next/font/google";
import "./globals.css";

const displaySerif = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const script = Parisienne({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const body = Jost({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Camila & Victor | São Miguel dos Milagres",
  description:
    "Site do casamento de Camila e Victor, em São Miguel dos Milagres, Alagoas. Três dias de celebração à beira-mar.",
  metadataBase: new URL("https://www.camilaevictoremmilagres.com.br"),
  openGraph: {
    title: "Camila & Victor",
    description:
      "Site do casamento de Camila e Victor, em São Miguel dos Milagres, Alagoas.",
    siteName: "Camila & Victor",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${displaySerif.variable} ${script.variable} ${body.variable}`}
    >
      <body className="min-h-full flex flex-col bg-foam text-ink font-body antialiased">
        {children}
      </body>
    </html>
  );
}
