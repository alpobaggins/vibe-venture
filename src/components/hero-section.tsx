import Link from "next/link";

export function HeroSection() {
  return (
    <section id="home" aria-labelledby="home-title" className="px-4 pb-16 pt-12 sm:px-8 lg:px-12 lg:pb-24">
      <h1
        id="home-title"
        className="text-[clamp(3.5rem,15vw,13rem)] font-black uppercase leading-[0.85] tracking-tighter"
      >
        <span className="block">Vibe</span> <span className="block">Venture</span>
      </h1>

      <div className="mt-12 flex flex-col gap-6 lg:ml-[58%] lg:mt-16">
        <p className="max-w-md text-lg sm:text-xl">
          Небольшая венчурная фирма для ИИ-стартапов на ранней стадии. Ищем команды с понятной
          проблемой и прототипом или MVP.
        </p>
        <Link
          href="/#apply"
          className="w-fit bg-orange px-6 py-3 text-sm font-bold uppercase tracking-wide text-foreground hover:bg-foreground hover:text-background"
        >
          Подать заявку
        </Link>
      </div>
    </section>
  );
}
