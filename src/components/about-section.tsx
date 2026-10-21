import Link from "next/link";

const principles = [
  "Проблема важнее презентации",
  "Прототип важнее плана",
  "Скорость обучения важнее размера команды",
];

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y bg-foreground text-background">
      <div className="shell">
        <p className="label text-background/60">(02) — О нас</p>

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-8">
          <h2 id="about-title" className="display text-h2 lg:col-span-8">
            <span className="block">Мы верим</span> <span className="block">
              в <span className="text-yellow">ранние</span>
            </span>{" "}
            <span className="block">идеи</span>
          </h2>

          <div className="flex flex-col items-start gap-6 lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="text-lead">
              Vibe Venture — небольшая венчурная фирма, которая подключается к ИИ-командам раньше
              большинства инвесторов: когда продукт только собран, а вопросов больше, чем ответов.
            </p>
            <p className="text-background/70">
              Мы смотрим на проблему, продукт и команду и помогаем сделать следующий осмысленный шаг.
            </p>
            <Link href="/about" className="link display mt-2 text-xl font-semibold tracking-[0.02em] hover:text-yellow">
              Подробнее о Vibe Venture <span aria-hidden="true" className="arrow">→</span>
            </Link>
          </div>
        </div>

        <ul className="mt-20 grid border-t border-background/25 md:mt-28 md:grid-cols-3">
          {principles.map((principle, index) => (
            <li
              key={principle}
              className="flex gap-4 border-b border-background/25 py-6 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0"
            >
              <span className="label pt-1.5 text-background/50">0{index + 1}</span>
              <span className="display text-h4 font-semibold">{principle}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
