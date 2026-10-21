import { z } from "zod";
import { applicationSchema, type ApplicationFieldErrors } from "@/lib/applicationSchema";

// Сохранение (SQLite) подключается на следующем этапе
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, message: "Некорректный JSON в теле запроса." },
      { status: 400 },
    );
  }

  const result = applicationSchema.safeParse(body);
  if (!result.success) {
    // Только сообщения, привязанные к полям; служебные детали Zod наружу не отдаём
    const errors: ApplicationFieldErrors = z.flattenError(result.error).fieldErrors;
    return Response.json(
      { success: false, message: "Проверьте данные заявки.", errors },
      { status: 400 },
    );
  }

  return Response.json({
    success: true,
    message: "Данные заявки корректны, сохранение пока не подключено",
  });
}
