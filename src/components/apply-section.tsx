import { ApplicationForm } from "@/components/application-form";

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
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <ApplicationForm />
          </div>
        </div>
      </div>
    </section>
  );
}
