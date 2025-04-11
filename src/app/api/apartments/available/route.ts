 // app/api/apartment/route.ts

import { NextRequest, NextResponse } from "next/server";


const API_URL = process.env.API_URL || "http://localhost:8080/apartments/available";


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
      throw new Error(`Failed to fetch apartments available: ${response.statusText}`);
    }

    const result = await response.json();
    return NextResponse.json({
      data: result.data.data,
      totalPages: result.data.totalPages,
      totalElements: result.data.totalElements,
    });
  } catch (error) {
    console.error("Error fetching apartments available:", error);
    return NextResponse.json(
      { error: "Failed to fetch apartments available" },
      { status: 500 }
    );
  }
}

