export function ApplySection() {
  return (
    <section id="apply" aria-labelledby="apply-title" className="px-4 py-20 sm:px-8 lg:px-12 lg:py-32">
      <h2
        id="apply-title"
        className="text-[clamp(3rem,11vw,10rem)] font-black uppercase leading-[0.85] tracking-tighter"
      >
        <span className="block">Подать</span> <span className="block">заявку</span>
      </h2>

      <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-12">
        <p className="text-lg lg:col-span-4">
          Расскажите о проекте: кто вы, на какой стадии продукт и какую проблему он решает. Заявки
          проходят первичный отбор.
        </p>

        {/* Место под форму заявки — реализуется на этапе 6 */}
        <div className="flex min-h-64 items-center justify-center border-2 border-dashed border-foreground p-8 lg:col-span-7 lg:col-start-6">
          <p className="text-center text-sm font-bold uppercase tracking-wide">
            Здесь появится форма заявки
          </p>
        </div>
      </div>
    </section>
  );
}
