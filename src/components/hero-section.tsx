import Link from "next/link";
import { HeroGraphic } from "@/components/hero-graphic";

const support = ["Микрогрант", "Продуктовая обратная связь", "Упаковка питча", "Пилотные интро"];

export function HeroSection() {
  return (
    <section id="home" aria-labelledby="home-title">
      <div className="shell flex min-h-[calc(100svh-var(--header-h))] flex-col pb-12 pt-8 md:pb-16 md:pt-12">
        <div className="flex items-start justify-between gap-6">
          <p className="label bg-yellow px-2.5 py-2">Early-stage AI</p>
          <p className="label hidden text-foreground/60 md:block">(01) — Главная</p>
        </div>

        <div className="relative mt-10 md:mt-auto md:pt-16">
          <h1 id="home-title" className="display text-hero">
            <span className="block">Vibe</span> <span className="block">Venture</span>
          </h1>
          <HeroGraphic className="mt-8 aspect-[640/260] w-full md:absolute md:right-0 md:top-16 md:mt-0 md:aspect-auto md:h-[clamp(3.9rem,18vw,17.2rem)] md:w-[52%]" />
        </div>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-8">
          <ul className="label order-2 flex flex-col gap-2.5 text-foreground/70 md:order-1 md:col-span-5 lg:col-span-4">
            {support.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-[0.45em] h-px w-6 shrink-0 bg-foreground" />
                {item}
              </li>
            ))}
          </ul>

          <div className="order-1 flex flex-col items-start gap-8 md:order-2 md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8">
            <p className="text-lead">
              Поддерживаем основателей ИИ-стартапов на самой ранней стадии: когда уже есть понятная
              проблема и прототип или MVP, а следующий шаг ещё предстоит найти.
            </p>
            <Link href="/#apply" className="btn btn-primary">
              Подать заявку <span aria-hidden="true" className="arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
