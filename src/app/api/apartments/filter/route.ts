// app/api/apartment/filter/route.ts
import { type NextRequest, NextResponse } from "next/server"

const API_URL = process.env.API_URL || "http://localhost:8080/apartments/filter"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get("page") || "1"
    const size = searchParams.get("size") || "4"
    const title = searchParams.get("title") || ""
    const priceMin = searchParams.get("priceMin") || ""
    const priceMax = searchParams.get("priceMax") || ""
    const apartmentTypeName = searchParams.get("apartmentTypeName") || ""

    const url = new URL(API_URL)
    url.searchParams.set("page", page)
    url.searchParams.set("size", size)

    // Add filter parameters to the URL
    if (title) url.searchParams.set("title", title)
    if (priceMin) url.searchParams.set("priceMin", priceMin)
    if (priceMax) url.searchParams.set("priceMax", priceMax)
    if (apartmentTypeName) url.searchParams.set("apartmentTypeName", apartmentTypeName)

    const response = await fetch(url, {
      next: { revalidate: 1 }, // Cache for 60 seconds
    })

    if (!response.ok) {
      throw new Error(`Failed to filter apartments: ${response.statusText}`)
    }

    const result = await response.json()

    return NextResponse.json({
      data: result.data.data,
      totalPages: result.data.totalPages,
      totalElements: result.data.totalElements,
    })
  } catch (error) {
    console.error("Error filtering apartments:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

