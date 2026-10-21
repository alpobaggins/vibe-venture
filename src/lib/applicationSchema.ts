import { z } from "zod";

// Единственный источник правил заявки: схема, атрибуты maxLength и подсказки формы берут лимиты отсюда
export const limits = {
  founderName: { min: 2, max: 80 },
  email: { max: 254 },
  projectName: { min: 2, max: 120 },
  problem: { min: 10, max: 1000 },
  demoUrl: { max: 2048 },
} as const;

export const stages = ["idea", "prototype", "mvp", "early_users"] as const;

export type Stage = (typeof stages)[number];

export const stageLabels: Record<Stage, string> = {
  idea: "Идея",
  prototype: "Прототип",
  mvp: "MVP",
  early_users: "Первые пользователи",
};

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return (url.protocol === "http:" || url.protocol === "https:") && url.hostname.includes(".");
  } catch {
    return false;
  }
}

// Обязательная строка: сообщение «заполните» выдаётся и для пустого значения, и для отсутствующего поля.
// abort: для пустой строки возвращается только оно, без лишнего сообщения о длине
function requiredText(requiredMessage: string, min: number, max: number, lengthMessage: string) {
  return z
    .string({ error: requiredMessage })
    .trim()
    .min(1, { error: requiredMessage, abort: true })
    .min(min, { error: lengthMessage })
    .max(max, { error: lengthMessage });
}

const demoUrlMessage = "Укажите полную ссылку, которая начинается с http:// или https://.";

export const applicationSchema = z.object({
  founderName: requiredText(
    "Укажите имя основателя.",
    limits.founderName.min,
    limits.founderName.max,
    `Имя должно содержать от ${limits.founderName.min} до ${limits.founderName.max} символов.`,
  ),
  email: z
    .string({ error: "Укажите email для связи." })
    .trim()
    .min(1, { error: "Укажите email для связи.", abort: true })
    .max(limits.email.max, { error: `Email не должен быть длиннее ${limits.email.max} символов.` })
    .pipe(z.email({ error: "Проверьте email — он должен выглядеть как name@example.com." })),
  projectName: requiredText(
    "Укажите название проекта.",
    limits.projectName.min,
    limits.projectName.max,
    `Название должно содержать от ${limits.projectName.min} до ${limits.projectName.max} символов.`,
  ),
  stage: z.enum(stages, {
    error: (issue) => (issue.input ? "Выберите стадию из списка." : "Выберите стадию проекта."),
  }),
  problem: requiredText(
    "Опишите проблему, которую решает проект.",
    limits.problem.min,
    limits.problem.max,
    `Описание должно содержать от ${limits.problem.min} до ${limits.problem.max} символов.`,
  ),
  demoUrl: z
    .string({ error: demoUrlMessage })
    .trim()
    .max(limits.demoUrl.max, { error: `Ссылка не должна быть длиннее ${limits.demoUrl.max} символов.` })
    .refine((value) => value === "" || isHttpUrl(value), { error: demoUrlMessage })
    .optional(),
});

// Данные, которые приходят из формы или запроса, и данные после проверки (с обрезанными пробелами)
export type ApplicationInput = z.input<typeof applicationSchema>;
export type Application = z.output<typeof applicationSchema>;
export type ApplicationField = keyof ApplicationInput;
export type ApplicationFieldErrors = Partial<Record<ApplicationField, string[]>>;

// Формат ответов POST /api/applications — общий для роута и клиента
export type ApplicationApiResponse =
  | { success: true; message: string }
  | { success: false; message: string; errors?: ApplicationFieldErrors };
