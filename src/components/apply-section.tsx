const plannedFields = [
  "Имя основателя",
  "Контактный email",
  "Название проекта",
  "Стадия",
  "Описание проблемы",
  "Демо или репозиторий",
];

export function ApplySection() {
  return (
    <section id="apply" aria-labelledby="apply-title">
      {/* Жёлтая лента — визуальный переход от информационной части к действию */}
      <div aria-hidden="true" className="overflow-hidden border-y-2 border-foreground bg-yellow py-3">
        <p className="display whitespace-nowrap text-2xl font-semibold tracking-[0.04em] md:text-3xl">
          {"Заявка — ".repeat(24)}
        </p>
      </div>

      <div className="shell section-y">
        <p className="label text-foreground/60">(05) — Заявка</p>

        <h2 id="apply-title" className="display mt-10 text-h1 lg:mt-14">
          <span className="block">
            Есть идея<span className="text-orange">?</span>
          </span>{" "}
          <span className="block">Поговорим</span>
        </h2>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-6 lg:col-span-4">
            <p className="text-lead">
              Vibe Venture рассматривает заявки ранних ИИ-команд. Отправка заявки означает участие
              в первичном отборе, а не гарантию финансирования.
            </p>
            <p className="text-foreground/70">
              Шесть полей, одно из них необязательное — ссылка на демо или репозиторий.
            </p>
          </div>

          {/* Место под форму заявки — реализуется на этапе 6 */}
          <div className="border-2 border-foreground lg:col-span-7 lg:col-start-6">
            <div className="label flex justify-between gap-4 bg-foreground px-5 py-3.5 text-background">
              <span>6 полей</span>
            </div>
            <ul aria-label="Поля будущей формы" className="grid gap-x-8 gap-y-7 p-6 sm:grid-cols-2 md:p-10">
              {plannedFields.map((field) => (
                <li key={field} className={field === "Описание проблемы" ? "sm:col-span-2" : undefined}>
                  <span className="label text-foreground/60">{field}</span>
                  <span
                    aria-hidden="true"
                    className={`mt-3 block border-b-2 border-dashed border-foreground/30 ${field === "Описание проблемы" ? "h-20" : "h-8"}`}
                  />
                </li>
              ))}
            </ul>
            <p className="border-t border-foreground/20 px-6 py-4 text-sm text-foreground/60 md:px-10">
              Форма заявки появится здесь на следующем этапе разработки.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
