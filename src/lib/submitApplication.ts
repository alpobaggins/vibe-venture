import type { Application, ApplicationApiResponse, ApplicationFieldErrors } from "@/lib/applicationSchema";

// Результат отправки в виде, удобном форме: успех, ошибки по полям или общая ошибка
export type SubmitResult =
  | { status: "success"; message: string }
  | { status: "invalid"; errors: ApplicationFieldErrors }
  | { status: "error"; message: string };

const networkErrorMessage =
  "Не удалось связаться с сервером. Проверьте подключение к интернету и попробуйте ещё раз.";
const serverErrorMessage = "Сервер не смог обработать заявку. Попробуйте отправить её ещё раз чуть позже.";

export async function submitApplication(data: Application): Promise<SubmitResult> {
  let response: Response;
  try {
    response = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch {
    return { status: "error", message: networkErrorMessage };
  }

  let body: ApplicationApiResponse;
  try {
    body = await response.json();
  } catch {
    // Например, HTML-страница ошибки вместо JSON
    return { status: "error", message: serverErrorMessage };
  }

  if (response.ok && body.success) {
    return { status: "success", message: body.message };
  }
  if (response.status === 400 && !body.success && body.errors && Object.keys(body.errors).length > 0) {
    return { status: "invalid", errors: body.errors };
  }
  return { status: "error", message: serverErrorMessage };
}
