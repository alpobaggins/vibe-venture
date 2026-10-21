import Link from "next/link";

const questions = [
  {
    question: "На какой стадии можно подать заявку?",
    answer:
      "На самой ранней: от хорошо исследованной проблемы и прототипа до MVP с первыми пользователями. Главное — понимать, чью проблему решает продукт.",
  },
  {
    question: "Обязательно ли иметь MVP?",
    answer:
      "Нет. Достаточно прототипа, который показывает суть решения. Важнее, насколько глубоко команда понимает пользователя и его задачу.",
  },
  {
    question: "Какую поддержку можно получить?",
    answer:
      "Микрогрант, продуктовую обратную связь, помощь с питчем и интро для пилотов. Набор зависит от стадии и задач команды и обсуждается после первичного отбора.",
  },
  {
    question: "Что происходит после отправки заявки?",
    answer:
      "Заявка попадает в первичный отбор: мы изучаем проблему, продукт и стадию проекта. Если увидим, чем можем помочь, свяжемся по указанному email. Отправка заявки не гарантирует финансирование.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y bg-foreground text-background">
      <div className="shell">
        <p className="label text-background/60">(04) — Вопросы</p>

        <h2 id="faq-title" className="display mt-10 text-h1 lg:mt-14">
          Вопросы
        </h2>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col items-start gap-6 lg:col-span-3">
            <p className="text-background/70">
              Коротко о том, как устроена работа с Vibe Venture. Подробности о подходе и отборе —
              на отдельной странице.
            </p>
            <Link href="/about" className="link display text-lg font-semibold tracking-[0.02em] hover:text-yellow">
              О Vibe Venture <span aria-hidden="true" className="arrow">→</span>
            </Link>
          </div>

          <div className="border-t border-background/25 lg:col-span-8 lg:col-start-5">
            {questions.map((item, index) => (
              <details key={item.question} className="group border-b border-background/25">
                <summary className="flex cursor-pointer list-none items-start gap-4 py-6 transition-colors hover:text-orange group-open:text-yellow md:gap-8 md:py-8">
                  <span className="label w-6 shrink-0 pt-[0.45em] text-background/50">0{index + 1}</span>
                  <span className="display flex-1 text-h4 font-semibold">{item.question}</span>
                  <span aria-hidden="true" className="relative mt-1 size-6 shrink-0 transition-transform group-open:rotate-45 md:size-7">
                    <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-current" />
                    <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-current" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-8 pl-10 text-lead text-background/75 md:pl-14">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
