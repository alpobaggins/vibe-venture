import Link from "next/link";

// Ссылки ведут на "/#..." — так они работают и с главной, и со страницы /about
const navLinks = [
  { href: "/#home", label: "Главная" },
  { href: "/#about", label: "О нас" },
  { href: "/#benefits", label: "Плюсы" },
  { href: "/#faq", label: "Вопросы" },
  { href: "/#apply", label: "Форма" },
];

export function Header() {
  return (
    <header className="border-b border-foreground">
      <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-3 px-4 py-4 sm:px-8 lg:px-12">
        <Link href="/" className="text-xl font-black uppercase tracking-tight">
          Vibe Venture
        </Link>
        <nav aria-label="Основная навигация">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold uppercase tracking-wide sm:gap-x-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-orange">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
