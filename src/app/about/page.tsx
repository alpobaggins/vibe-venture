import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "О Vibe Venture",
  description: "Подход Vibe Venture, кого мы ищем и как устроен первичный отбор заявок.",
};

// Черновые тексты; подробное описание фирмы заменит их позже
const sections = [
  {
    title: "Подход",
    text: "Vibe Venture — небольшая фирма, которая работает с ИИ-стартапами на самой ранней стадии. Мы помогаем командам быстрее пройти путь от прототипа к первым пользователям.",
  },
  {
    title: "Кого мы ищем",
    text: "Основателей, которые понимают проблему своего пользователя и уже собрали прототип или MVP.",
  },
  {
    title: "Как устроен отбор",
    text: "Команда заполняет заявку на сайте. Мы изучаем проблему, продукт и стадию проекта и решаем, чем можем быть полезны.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section aria-labelledby="about-page-title" className="px-4 pb-16 pt-12 sm:px-8 lg:px-12 lg:pb-24">
        <h1
          id="about-page-title"
          className="text-[clamp(3rem,11vw,10rem)] font-black uppercase leading-[0.85] tracking-tighter"
        >
          <span className="block">О Vibe</span> <span className="block">Venture</span>
        </h1>
      </section>

      <section aria-label="Описание фирмы" className="bg-foreground px-4 py-20 text-background sm:px-8 lg:px-12 lg:py-28">
        <div className="flex flex-col gap-14 lg:ml-[33%]">
          {sections.map((section) => (
            <article key={section.title} className="grid gap-4 md:grid-cols-3 md:gap-8">
              <h2 className="text-2xl font-black uppercase tracking-tight">{section.title}</h2>
              <p className="text-lg text-muted md:col-span-2">{section.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-label="Навигация" className="px-4 py-16 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="inline-block bg-orange px-8 py-4 text-lg font-bold uppercase tracking-wide text-foreground hover:bg-foreground hover:text-background"
        >
          ← Вернуться на главную
        </Link>
      </section>
    </>
  );
}
