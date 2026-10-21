"use client";

import { useState, type ChangeEvent, type FocusEvent, type FormEvent, type ReactNode } from "react";
import { z } from "zod";
import {
  applicationSchema,
  limits,
  stageLabels,
  stages,
  type ApplicationField,
} from "@/lib/applicationSchema";

type FieldName = ApplicationField;
// Состояние формы — сырые строки из полей; стадия до выбора пустая и поэтому не тип Stage
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;
type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const fieldOrder: FieldName[] = ["founderName", "email", "projectName", "stage", "problem", "demoUrl"];

const initialValues: Values = {
  founderName: "",
  email: "",
  projectName: "",
  stage: "",
  problem: "",
  demoUrl: "",
};

// Короткие ограничения видны рядом с подписью и входят в описание поля для скринридеров
const fieldRules: Partial<Record<FieldName, string>> = {
  founderName: `${limits.founderName.min}–${limits.founderName.max} символов`,
  projectName: `${limits.projectName.min}–${limits.projectName.max} символов`,
  problem: `${limits.problem.min}–${limits.problem.max} символов`,
  demoUrl: "http:// или https://",
};

// Проверка одного поля той же схемой, что и на сервере
function validateField(name: FieldName, value: string): string | undefined {
  const result = applicationSchema.shape[name].safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

function Field({
  name,
  label,
  hint,
  error,
  className = "",
  children,
}: {
  name: FieldName;
  label: ReactNode;
  hint: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    // Подгрид из четырёх строк (подпись, подсказка, поле, ошибка) выравнивает поля в соседних колонках
    <div className={`row-span-4 grid grid-rows-subgrid gap-y-0 ${className}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <label htmlFor={name} className="display text-xl font-semibold tracking-[0.01em] md:text-2xl">
          {label}
        </label>
        {fieldRules[name] && (
          <span id={`${name}-rule`} className="label text-foreground/60">
            {fieldRules[name]}
          </span>
        )}
      </div>
      <p id={`${name}-hint`} className="mt-1.5 text-sm text-foreground/70">
        {hint}
      </p>
      <div>{children}</div>
      <div>
        {error && (
          <p id={`${name}-error`} className="mt-3 w-fit bg-orange px-2.5 py-1.5 text-sm font-medium text-foreground">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export function ApplicationForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "invalid" | "valid">("idle");

  const errorCount = fieldOrder.filter((name) => errors[name]).length;

  function handleChange(event: ChangeEvent<FieldElement>) {
    const name = event.target.name as FieldName;
    const value = event.target.value;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (status === "valid") setStatus("idle");
    // Уже показанную ошибку пересчитываем на лету, чтобы она исчезла, как только поле исправлено
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }

  function handleBlur(event: FocusEvent<FieldElement>) {
    const name = event.target.name as FieldName;
    // Пустые поля при уходе не проверяем, чтобы не ругаться на ещё не начатое заполнение
    if (event.target.value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, event.target.value) }));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    const result = applicationSchema.safeParse(values);
    const nextErrors: Errors = {};
    if (!result.success) {
      const fieldErrors = z.flattenError(result.error).fieldErrors;
      for (const name of fieldOrder) {
        const message = fieldErrors[name]?.[0];
        if (message) nextErrors[name] = message;
      }
    }
    setErrors(nextErrors);

    const firstInvalid = fieldOrder.find((name) => nextErrors[name]);
    if (firstInvalid) {
      setStatus("invalid");
      // Фокус переносим после отрисовки, чтобы скринридер прочитал поле уже вместе с ошибкой
      requestAnimationFrame(() => (form.elements.namedItem(firstInvalid) as FieldElement | null)?.focus());
      return;
    }
    setStatus("valid");
  }

  function fieldProps(name: FieldName) {
    return {
      id: name,
      name,
      value: values[name],
      onChange: handleChange,
      onBlur: handleBlur,
      "aria-invalid": errors[name] ? true : undefined,
      "aria-describedby": [`${name}-hint`, fieldRules[name] && `${name}-rule`, errors[name] && `${name}-error`]
        .filter(Boolean)
        .join(" "),
      className: "field-input",
    };
  }

  return (
    <form noValidate onSubmit={handleSubmit} aria-label="Заявка на первичный отбор" className="border-t-2 border-foreground pt-6">
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 md:gap-y-12">
        <Field name="founderName" label="Имя основателя" hint="Как к вам обращаться." error={errors.founderName}>
          <input {...fieldProps("founderName")} type="text" autoComplete="name" maxLength={limits.founderName.max} required />
        </Field>

        <Field name="email" label="Контактный email" hint="Напишем сюда, если увидим, чем можем помочь." error={errors.email}>
          <input {...fieldProps("email")} type="email" inputMode="email" autoComplete="email" maxLength={limits.email.max} required />
        </Field>

        <Field name="projectName" label="Название проекта" hint="Рабочее название подойдёт." error={errors.projectName}>
          <input {...fieldProps("projectName")} type="text" autoComplete="organization" maxLength={limits.projectName.max} required />
        </Field>

        <Field name="stage" label="Стадия проекта" hint="Выберите вариант, ближайший к текущему состоянию продукта." error={errors.stage}>
          <select {...fieldProps("stage")} required>
            <option value="">Не выбрано</option>
            {stages.map((stage) => (
              <option key={stage} value={stage}>
                {stageLabels[stage]}
              </option>
            ))}
          </select>
        </Field>

        <Field
          name="problem"
          label="Описание проблемы"
          hint="Чью проблему решает проект и почему она важна."
          error={errors.problem}
          className="sm:col-span-2"
        >
          <textarea {...fieldProps("problem")} rows={5} maxLength={limits.problem.max} required />
          <p aria-hidden="true" className="mt-2 text-right text-sm text-foreground/60">
            {values.problem.trim().length} / {limits.problem.max}
          </p>
        </Field>

        <Field
          name="demoUrl"
          label={
            <>
              Демо или репозиторий <span className="font-normal text-foreground/60">(необязательно)</span>
            </>
          }
          hint="Ссылка на демо, прототип или репозиторий."
          error={errors.demoUrl}
          className="sm:col-span-2"
        >
          <input {...fieldProps("demoUrl")} type="url" inputMode="url" autoComplete="url" maxLength={limits.demoUrl.max} />
        </Field>
      </div>

      <div className="mt-12 flex flex-col gap-6 md:mt-14">
        <button type="submit" className="btn btn-primary min-h-16 w-full px-10 text-xl sm:w-fit">
          Подать заявку <span aria-hidden="true" className="arrow">→</span>
        </button>

        {/* Живая область существует постоянно, чтобы скринридеры гарантированно озвучивали изменения */}
        <div aria-live="polite">
          {status === "invalid" && errorCount > 0 && (
            <p className="w-fit border-l-4 border-orange py-1 pl-4 font-medium">
              Проверьте отмеченные поля. Ошибок: {errorCount}.
            </p>
          )}
          {status === "valid" && (
            <p className="bg-yellow px-5 py-4 font-medium">
              Форма заполнена корректно. Серверная отправка будет подключена позже.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
