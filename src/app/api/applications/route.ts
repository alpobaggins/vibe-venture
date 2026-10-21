import { z } from "zod";
import {
  applicationSchema,
  type ApplicationApiResponse,
  type ApplicationFieldErrors,
} from "@/lib/applicationSchema";
import { saveApplication } from "@/lib/db";

// HTTP-слой: разбор JSON, проверка общей Zod-схемой, сохранение через модуль базы и ответ
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, message: "Некорректный JSON в теле запроса." } satisfies ApplicationApiResponse,
      { status: 400 },
    );
  }

  const result = applicationSchema.safeParse(body);
  if (!result.success) {
    // Только сообщения, привязанные к полям; служебные детали Zod наружу не отдаём
    const errors: ApplicationFieldErrors = z.flattenError(result.error).fieldErrors;
    return Response.json(
      { success: false, message: "Проверьте данные заявки.", errors } satisfies ApplicationApiResponse,
      { status: 400 },
    );
  }

  try {
    await saveApplication(result.data);
  } catch (error) {
    // Подробности ошибки остаются в логе сервера, пользователю — только безопасное сообщение
    console.error("Не удалось сохранить заявку:", error);
    return Response.json(
      {
        success: false,
        message: "Не удалось сохранить заявку. Попробуйте отправить её ещё раз чуть позже.",
      } satisfies ApplicationApiResponse,
      { status: 500 },
    );
  }

  return Response.json(
    { success: true, message: "Заявка успешно отправлена" } satisfies ApplicationApiResponse,
    { status: 201 },
  );
}
