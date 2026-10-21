import Link from "next/link";

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="bg-foreground px-4 py-20 text-background sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="grid gap-10 lg:grid-cols-12">
        <h2
          id="about-title"
          className="text-[clamp(3rem,9vw,8rem)] font-black uppercase leading-[0.9] tracking-tighter lg:col-span-7"
        >
          О нас
        </h2>

        <div className="flex flex-col gap-6 lg:col-span-4 lg:col-start-9 lg:self-end">
          <p className="text-lg">
            Мы работаем с основателями, которые уже проверяют идею на практике. Смотрим на проблему,
            продукт и команду, а не на объём презентации.
          </p>
          <Link
            href="/about"
            className="w-fit border-b-2 border-orange pb-1 font-bold uppercase tracking-wide hover:text-orange"
          >
            Подробнее о Vibe Venture →
          </Link>
        </div>
      </div>
    </section>
  );
}
