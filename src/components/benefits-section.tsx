const benefits = [
  {
    title: "Микрогрант",
    text: "Небольшая сумма, чтобы быстрее проверить ключевую гипотезу.",
  },
  {
    title: "Продуктовая обратная связь",
    text: "Разбор продукта и пользовательского сценария от практиков.",
  },
  {
    title: "Упаковка питча",
    text: "Помощь с историей, структурой и формулировками для разговора с инвесторами.",
  },
  {
    title: "Пилотные интро",
    text: "Знакомства с компаниями, которым может быть интересен пилот.",
  },
];

export function BenefitsSection() {
  return (
    <section id="benefits" aria-labelledby="benefits-title" className="px-4 py-20 sm:px-8 lg:px-12 lg:py-32">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <h2
          id="benefits-title"
          className="text-[clamp(3rem,9vw,8rem)] font-black uppercase leading-[0.9] tracking-tighter"
        >
          Плюсы
        </h2>
        <p className="max-w-sm text-lg">
          Что команда может получить по итогам первичного отбора.
        </p>
      </div>

      <ol className="mt-12 border-t border-foreground lg:mt-20">
        {benefits.map((benefit, index) => (
          <li
            key={benefit.title}
            className="grid gap-2 border-b border-foreground py-6 md:grid-cols-12 md:items-baseline md:gap-6"
          >
            <span className="text-sm font-bold md:col-span-1">0{index + 1}</span>
            <h3 className="text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl md:col-span-7">
              {benefit.title}
            </h3>
            <p className="md:col-span-4">{benefit.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
