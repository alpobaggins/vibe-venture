import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "О Vibe Venture",
  description: "Кто мы, какие ИИ-команды ищем, как помогаем и как проходит первичный отбор заявок.",
};

const lookingFor = [
  "Понимают, чью проблему решают и почему она важна сейчас",
  "Уже собрали прототип или MVP и показывают его пользователям",
  "Строят продукт вокруг ИИ, а не добавляют ИИ ради презентации",
  "Готовы открыто обсуждать слабые места продукта",
];

const help = [
  {
    title: "Микрогрант",
    text: "Небольшие средства на то, что ускоряет проверку гипотезы: вычисления, API, эксперименты с пользователями.",
  },
  {
    title: "Продуктовая обратная связь",
    text: "Разбираем сценарий пользователя и метрики, ищем, где продукт теряет ценность.",
  },
  {
    title: "Упаковка питча",
    text: "Помогаем выстроить историю: проблема, решение, первые доказательства, следующий шаг.",
  },
  {
    title: "Пилотные интро",
    text: "Знакомим с компаниями, которым может быть интересно проверить продукт на своей задаче.",
  },
];

const steps = [
  { title: "Заявка", text: "Команда заполняет короткую форму: проблема, стадия, ссылка на демо." },
  { title: "Изучение", text: "Смотрим на проблему, продукт и команду. Презентация не обязательна." },
  { title: "Разговор", text: "Если видим, чем можем помочь, связываемся по email и договариваемся о встрече." },
  { title: "Формат", text: "Вместе выбираем формат поддержки, который подходит стадии проекта." },
];

export default function AboutPage() {
  return (
    <>
      <section aria-labelledby="about-page-title" className="pb-16 pt-8 md:pb-24 md:pt-12">
        <div className="shell">
          <Link href="/" className="back-link link label flex w-fit text-sm">
            <span aria-hidden="true" className="arrow">←</span> На главную
          </Link>

          <h1 id="about-page-title" className="display mt-16 text-hero md:mt-24 md:text-right">
            <span className="block">О Vibe</span> <span className="block">Venture</span>
          </h1>
        </div>
      </section>

      <section aria-labelledby="who-title" className="border-t-2 border-foreground">
        <div className="shell grid gap-8 py-14 md:grid-cols-12 md:py-20">
          <div className="md:col-span-4">
            <p className="label text-foreground/60">01</p>
            <h2 id="who-title" className="display mt-4 text-h3">
              Кто мы
            </h2>
          </div>
          <div className="flex flex-col gap-6 md:col-span-7 md:col-start-6">
            <p className="display text-h4 font-semibold">
              Vibe Venture — небольшая венчурная фирма, которая работает с ИИ-стартапами на самой
              ранней стадии.
            </p>
            <p className="text-lead text-foreground/80">
              Мы подключаемся, когда у команды уже есть понятная проблема и первая версия продукта, но
              ещё нет ясности, как превратить её в бизнес. Мы не заменяем фонды следующих раундов: наша
              задача — помочь сделать следующий осмысленный шаг.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="teams-title" className="border-t border-foreground">
        <div className="shell grid gap-8 py-14 md:grid-cols-12 md:py-20">
          <div className="md:col-span-4">
            <p className="label text-foreground/60">02</p>
            <h2 id="teams-title" className="display mt-4 text-h3">
              Какие команды ищем
            </h2>
          </div>
          <ul className="md:col-span-7 md:col-start-6">
            {lookingFor.map((item) => (
              <li key={item} className="flex gap-5 border-b border-foreground/20 py-5 first:pt-0">
                <span aria-hidden="true" className="mt-2 size-3 shrink-0 bg-orange" />
                <span className="text-lead">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="help-title" className="section-y bg-foreground text-background">
        <div className="shell">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="label text-background/60">03</p>
              <h2 id="help-title" className="display mt-4 text-h3">
                Как помогаем
              </h2>
            </div>
            <p className="text-lead text-background/75 md:col-span-5 md:col-start-6 md:self-end">
              Набор поддержки зависит от стадии и задач команды и обсуждается после первичного отбора.
            </p>
          </div>

          <ul className="mt-14 grid border-t border-background/25 sm:grid-cols-2 md:mt-20">
            {help.map((item, index) => (
              <li
                key={item.title}
                className="flex flex-col gap-4 border-b border-background/25 py-8 sm:px-8 sm:odd:border-r sm:odd:pl-0 md:py-12"
              >
                <span className="display text-h3 text-yellow">0{index + 1}</span>
                <h3 className="display text-h4 font-semibold">{item.title}</h3>
                <p className="max-w-md text-background/75">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="selection-title" className="section-y">
        <div className="shell">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="label text-foreground/60">04</p>
              <h2 id="selection-title" className="display mt-4 text-h3">
                Как проходит первичный отбор
              </h2>
            </div>
          </div>

          <ol className="mt-14 grid gap-10 md:mt-20 md:grid-cols-4 md:gap-8">
            {steps.map((step, index) => (
              <li key={step.title} className="border-t-2 border-foreground pt-6">
                <span className="label text-foreground/60">Шаг {index + 1}</span>
                <h3 className="display mt-4 text-h4 font-semibold">{step.title}</h3>
                <p className="mt-3 text-foreground/80">{step.text}</p>
              </li>
            ))}
          </ol>

          <p className="mt-14 w-fit max-w-full bg-yellow px-5 py-4 font-medium md:mt-20">
            Заявка — это участие в первичном отборе, а не гарантия финансирования.
          </p>
        </div>
      </section>

      <section aria-labelledby="about-cta-title" className="border-t-2 border-foreground">
        <div className="shell flex flex-col gap-10 py-16 md:py-24 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="about-cta-title" className="display text-h2">
            <span className="block">Готовы</span> <span className="block">рассказать</span>{" "}
            <span className="block">о проекте?</span>
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/" className="btn btn-outline back-link">
              <span aria-hidden="true" className="arrow">←</span> Вернуться на главную
            </Link>
            <Link href="/#apply" className="btn btn-primary">
              Подать заявку <span aria-hidden="true" className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
