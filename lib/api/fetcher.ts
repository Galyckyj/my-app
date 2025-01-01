export interface FetcherOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"; // HTTP методи
  body?: Record<string, unknown>; // Дані для тіла запиту
  headers?: Record<string, string>; // Додаткові заголовки
  authToken?: string; // Токен авторизації
}

export async function fetcher<T = unknown>(
  url: string,
  options: FetcherOptions = {}
): Promise<T> {
  const { method = "GET", body, headers = {}, authToken } = options;

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  // Додати токен авторизації, якщо він є
  if (authToken) {
    defaultHeaders["Authorization"] = `Bearer ${authToken}`;
  }

  try {
    const response = await fetch(url, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Щось пішло не так");
    }

    // Якщо відповідь без тіла (наприклад, 204 No Content)
    if (response.status === 204) {
      return {} as T;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("Помилка запиту:", error);
    throw error;
  }
}
