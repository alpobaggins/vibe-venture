"use client";

import { useState, type ChangeEvent, type FocusEvent, type FormEvent, type ReactNode } from "react";

const stages = [
  { value: "idea", label: "Идея" },
  { value: "prototype", label: "Прототип" },
  { value: "mvp", label: "MVP" },
  { value: "early_users", label: "Первые пользователи" },
];

type FieldName = "founderName" | "email" | "projectName" | "stage" | "problem" | "demoUrl";
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
  founderName: "2–80 символов",
  projectName: "2–120 символов",
  problem: "10–1000 символов",
  demoUrl: "http:// или https://",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return (url.protocol === "http:" || url.protocol === "https:") && url.hostname.includes(".");
  } catch {
    return false;
  }
}

// Базовая клиентская проверка; позже её заменит общая Zod-схема для клиента и сервера
function validateField(name: FieldName, rawValue: string): string | undefined {
  const value = rawValue.trim();

  switch (name) {
    case "founderName":
      if (!value) return "Укажите имя основателя.";
      if (value.length < 2 || value.length > 80) return "Имя должно содержать от 2 до 80 символов.";
      return;
    case "email":
      if (!value) return "Укажите email для связи.";
      if (value.length > 254) return "Email не должен быть длиннее 254 символов.";
      if (!emailPattern.test(value)) return "Проверьте email — он должен выглядеть как name@example.com.";
      return;
    case "projectName":
      if (!value) return "Укажите название проекта.";
      if (value.length < 2 || value.length > 120) return "Название должно содержать от 2 до 120 символов.";
      return;
    case "stage":
      if (!value) return "Выберите стадию проекта.";
      if (!stages.some((stage) => stage.value === value)) return "Выберите стадию из списка.";
      return;
    case "problem":
      if (!value) return "Опишите проблему, которую решает проект.";
      if (value.length < 10 || value.length > 1000) return "Описание должно содержать от 10 до 1000 символов.";
      return;
    case "demoUrl":
      if (!value) return;
      if (value.length > 2048) return "Ссылка не должна быть длиннее 2048 символов.";
      if (!isHttpUrl(value)) return "Укажите полную ссылку, которая начинается с http:// или https://.";
      return;
  }
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

    const nextErrors: Errors = {};
    for (const name of fieldOrder) {
      const error = validateField(name, values[name]);
      if (error) nextErrors[name] = error;
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
          <input {...fieldProps("founderName")} type="text" autoComplete="name" maxLength={80} required />
        </Field>

        <Field name="email" label="Контактный email" hint="Напишем сюда, если увидим, чем можем помочь." error={errors.email}>
          <input {...fieldProps("email")} type="email" inputMode="email" autoComplete="email" maxLength={254} required />
        </Field>

        <Field name="projectName" label="Название проекта" hint="Рабочее название подойдёт." error={errors.projectName}>
          <input {...fieldProps("projectName")} type="text" autoComplete="organization" maxLength={120} required />
        </Field>

        <Field name="stage" label="Стадия проекта" hint="Выберите вариант, ближайший к текущему состоянию продукта." error={errors.stage}>
          <select {...fieldProps("stage")} required>
            <option value="">Не выбрано</option>
            {stages.map((stage) => (
              <option key={stage.value} value={stage.value}>
                {stage.label}
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
          <textarea {...fieldProps("problem")} rows={5} maxLength={1000} required />
          <p aria-hidden="true" className="mt-2 text-right text-sm text-foreground/60">
            {values.problem.trim().length} / 1000
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
          <input {...fieldProps("demoUrl")} type="url" inputMode="url" autoComplete="url" maxLength={2048} />
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
