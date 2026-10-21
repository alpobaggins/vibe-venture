import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-foreground px-4 py-12 text-background sm:px-8 lg:px-12">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <p className="text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl">
          <span className="block">Vibe</span> <span className="block">Venture</span>
        </p>
        <div className="flex flex-col gap-3 text-sm md:items-end">
          <Link href="/about" className="font-bold uppercase tracking-wide hover:text-orange">
            О Vibe Venture
          </Link>
          <Link href="/#apply" className="font-bold uppercase tracking-wide hover:text-orange">
            Подать заявку
          </Link>
          <p className="max-w-xs text-muted md:text-right">
            Учебный проект. Компания и все материалы на сайте вымышлены.
          </p>
        </div>
      </div>
    </footer>
  );
}
