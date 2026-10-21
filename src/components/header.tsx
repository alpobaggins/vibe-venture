import Link from "next/link";
import { Logo } from "@/components/logo";

// Ссылки ведут на "/#..." — так они работают и с главной, и со страницы /about
const navLinks = [
  { href: "/#home", label: "Главная" },
  { href: "/#about", label: "О нас" },
  { href: "/#benefits", label: "Плюсы" },
  { href: "/#faq", label: "Вопросы" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-foreground bg-background">
      <div className="shell relative flex h-[var(--header-h)] flex-col justify-center gap-3 md:flex-row md:items-center md:justify-between md:gap-10">
        <Link href="/" aria-label="Vibe Venture — на главную" className="flex items-baseline gap-3 self-start md:self-auto">
          <Logo className="text-[2rem]" />
          <span className="label hidden lg:inline">Vibe Venture</span>
        </Link>

        <nav aria-label="Основная навигация" className="-mx-1 overflow-x-auto px-1 md:mx-0 md:px-0">
          <ul className="display flex items-center justify-between gap-5 text-[0.95rem] font-medium tracking-[0.02em] sm:text-base md:gap-8 lg:gap-14 lg:text-lg">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="nav-link whitespace-nowrap py-2">
                  {link.label}
                </Link>
              </li>
            ))}
            {/* На мобильных «Подать заявку» поднимается в строку логотипа, чтобы ссылки помещались без прокрутки */}
            <li className="absolute right-[var(--gutter)] top-3 md:static">
              <Link
                href="/#apply"
                className="block whitespace-nowrap bg-orange px-3 py-1.5 transition-colors hover:bg-foreground hover:text-background"
              >
                Подать заявку
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
