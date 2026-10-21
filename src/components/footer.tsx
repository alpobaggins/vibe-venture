import Link from "next/link";
import { Logo } from "@/components/logo";

const footerLinks = [
  { href: "/#benefits", label: "Плюсы" },
  { href: "/#faq", label: "Вопросы" },
  { href: "/about", label: "О Vibe Venture" },
  { href: "/#apply", label: "Подать заявку" },
];

export function Footer() {
  return (
    <footer className="bg-foreground pb-8 pt-16 text-background md:pt-24">
      <div className="shell">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo className="text-6xl" />
            <p className="mt-6 max-w-xs text-background/70">
              Поддержка ИИ-стартапов на ранней стадии: от прототипа к первым пользователям.
            </p>
          </div>

          <nav aria-label="Ссылки в подвале" className="md:col-span-4 md:col-start-9">
            <ul className="display flex flex-col gap-3 text-h4 font-semibold">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-yellow">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p aria-hidden="true" className="display mt-20 text-[clamp(3rem,15.5vw,16rem)] leading-[0.8] tracking-[-0.02em] md:mt-28">
          Vibe Venture
        </p>

        <div className="mt-8 flex flex-col gap-2 border-t border-background/25 pt-6 text-sm text-background/70 sm:flex-row sm:justify-between">
          <p>© Vibe Venture</p>
          <p>Учебный проект. Компания и все материалы на сайте вымышлены.</p>
        </div>
      </div>
    </footer>
  );
}
