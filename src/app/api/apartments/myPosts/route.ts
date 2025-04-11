 // app/api/apartment/route.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_URL = process.env.API_URL || "http://localhost:8080/apartments/my-posts";

async function fetchWithAuth(url: string, options: RequestInit = {}) {
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

export async function GET(request: NextRequest) {
  
  try {
    const response = await fetchWithAuth(API_URL, {
      // next: { revalidate: 10 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user's posts: ${response.statusText}`);
    }

    const result = await response.json();
    return NextResponse.json({
      data: result.data,
    });
  } catch (error) {
    console.error("Error fetching user's apartments: ", error);
    return NextResponse.json(
      { error: "Failed to fetch your posts" },
      { status: 500 }
    );
  }
}

