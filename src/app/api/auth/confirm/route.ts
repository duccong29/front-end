// api/auth/confirm/router.ts

import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://localhost:8080";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }

  try {
    const response = await fetch(`${API_URL}/confirm?token=${token}`, {
      next: { revalidate: 0 }, 
    });

    if (!response.ok) {
      throw new Error(`Failed to confirm account: ${response.statusText}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error confirming account:", error);
    return NextResponse.json({ error: "Failed to confirm account" }, { status: 500 });
  }
}

