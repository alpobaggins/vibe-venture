const benefits = [
  {
    title: "Микрогрант",
    text: "Небольшие средства на проверку ключевой гипотезы: вычисления, доступ к моделям и API, первые эксперименты с пользователями.",
  },
  {
    title: "Продуктовая обратная связь",
    text: "Разбор продукта глазами пользователя: где теряется ценность, что упростить и какую метрику проверить следующей.",
  },
  {
    title: "Упаковка питча",
    text: "Помогаем сформулировать проблему, решение и первые доказательства так, чтобы разговор с инвестором или партнёром шёл о сути.",
  },
  {
    title: "Пилотные интро",
    text: "Знакомим с компаниями, которым может быть интересен пилот, — чтобы проверить продукт на реальной задаче, а не на демо-данных.",
  },
];

export function BenefitsSection() {
  return (
    <section id="benefits" aria-labelledby="benefits-title" className="section-y">
      <div className="shell">
        <p className="label text-foreground/60">(03) — Плюсы</p>

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12">
          <h2 id="benefits-title" className="display text-h2 lg:col-span-8">
            <span className="block">Что получает</span> <span className="block">команда</span>
          </h2>
          <p className="text-lead lg:col-span-4 lg:self-end">
            Четыре направления поддержки. Конкретный набор зависит от стадии проекта и обсуждается
            после первичного отбора.
          </p>
        </div>

        <ol className="mt-16 border-t-2 border-foreground md:mt-24">
          {benefits.map((benefit, index) => (
            <li
              key={benefit.title}
              className="group grid gap-x-8 gap-y-4 border-b border-foreground py-8 md:grid-cols-12 md:py-12"
            >
              <span
                aria-hidden="true"
                className="display text-h1 text-muted transition-colors group-hover:text-orange md:col-span-3"
              >
                0{index + 1}
              </span>
              <div className="flex flex-col gap-3 md:col-span-5">
                <h3 className="display text-h3">{benefit.title}</h3>
              </div>
              <p className="max-w-md text-lg text-foreground/80 md:col-span-4 md:self-end">{benefit.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
