import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

// Шрифты лежат в репозитории (латиница + кириллица, лицензия OFL), сторонние CDN не нужны
const oswald = localFont({
  src: "./fonts/oswald-variable.woff2",
  weight: "400 700",
  variable: "--font-oswald",
  display: "swap",
});

const inter = localFont({
  src: "./fonts/inter-variable.woff2",
  weight: "400 700",
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vibe Venture — поддержка ИИ-стартапов на ранней стадии",
    template: "%s — Vibe Venture",
  },
  description:
    "Vibe Venture помогает командам ИИ-стартапов с прототипом или MVP: микрогрант, продуктовая обратная связь, упаковка питча и первые пилотные интро.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${oswald.variable} ${inter.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-yellow focus:px-4 focus:py-3 focus:text-foreground"
        >
          Перейти к содержимому
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
