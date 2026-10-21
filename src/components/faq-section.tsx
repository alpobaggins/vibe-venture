const questions = [
  {
    question: "Кому подавать заявку?",
    answer:
      "Командам ИИ-стартапов на ранней стадии, у которых есть понятная проблема и прототип или MVP.",
  },
  {
    question: "Нужна ли зарегистрированная компания?",
    answer: "Для первичного отбора важнее проблема, продукт и команда, чем юридическое оформление.",
  },
  {
    question: "Гарантирует ли заявка финансирование?",
    answer:
      "Нет. Заявка — это первый шаг: по её итогам мы решаем, можем ли быть полезны команде.",
  },
  {
    question: "Что приложить к заявке?",
    answer:
      "Короткое описание проблемы и, если есть, ссылку на демо или репозиторий. Презентация не обязательна.",
  },
];

export function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="bg-foreground px-4 py-20 text-background sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="grid gap-12 lg:grid-cols-12">
        <h2
          id="faq-title"
          className="text-[clamp(3rem,9vw,8rem)] font-black uppercase leading-[0.9] tracking-tighter lg:col-span-5"
        >
          Вопросы
        </h2>

        <div className="lg:col-span-6 lg:col-start-7">
          {questions.map((item) => (
            <details key={item.question} className="group border-b border-muted/40 py-5">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 text-xl font-bold [&::-webkit-details-marker]:hidden">
                {item.question}
                <span aria-hidden="true" className="text-orange group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-prose text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
