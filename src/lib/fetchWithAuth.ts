import { cookies } from "next/headers";

export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const cookieStore = cookies();
  const authToken = cookieStore.get("authToken")?.value;

  if (!authToken) {
    throw new Error("Unauthorized");
  }

  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${authToken}`);

  return fetch(url, {
    ...options,
    headers,
  });
}

