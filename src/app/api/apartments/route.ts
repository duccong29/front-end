 // app/api/apartment/route.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_URL = process.env.API_URL || "http://localhost:8080/apartments";

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
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || "1";
  const size = searchParams.get("size") || "4";
  const apartmentType = searchParams.get("apartmentType") || "all";

  const url = new URL(API_URL);
  url.searchParams.set("page", page);
  url.searchParams.set("size", size);
  url.searchParams.set("apartmentType", apartmentType);

  try {
    const response = await fetch(url, {
      // next: { revalidate: 10 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch apartments: ${response.statusText}`);
    }

    const result = await response.json();
    return NextResponse.json({
      data: result.data.data,
      totalPages: result.data.totalPages,
      totalElements: result.data.totalElements,
    });
  } catch (error) {
    console.error("Error fetching apartments:", error);
    return NextResponse.json(
      { error: "Failed to fetch apartments" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const response = await fetchWithAuth(API_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to create apartment: ${response.statusText}`);
    }

    const result = await response.json();
    revalidatePath('/apartments');
    return NextResponse.json({ data: result.data }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error creating apartment:", error);
    return NextResponse.json(
      { error: "Failed to create apartment" },
      { status: 500 }
    );
  }
}

