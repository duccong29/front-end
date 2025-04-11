import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

const API_URL = process.env.API_URL || "http://localhost:8080/users"

async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const cookieStore = cookies()
  const authToken = cookieStore.get("authToken")?.value

  if (!authToken) {
    throw new Error("Unauthorized")
  }

  const headers = new Headers(options.headers)
  headers.set("Authorization", `Bearer ${authToken}`)
//   headers.set('Content-Type', 'application/json');

  // Ensure content type is set for JSON requests
  if (options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json")
  }

  return fetch(url, {
    ...options,
    headers,
  })
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const response = await fetchWithAuth(`${API_URL}/${params.id}`, {
      // next: { revalidate: 60 },
    })
   
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`)
    }

    const result = await response.json()
    return NextResponse.json({ data: result.data })
  } catch (error) {
    console.error("Error fetching user by ID:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userData = await request.json()

    // Remove confirmPassword before sending to backend
    const { confirmPassword, ...updateData } = userData

    const response = await fetchWithAuth(`${API_URL}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
    })

    if (!response.ok) {
      throw new Error(`Failed to update user: ${response.statusText}`)
    }

    const result = await response.json()
    revalidatePath(`/admin/users`)
    revalidatePath(`/admin/users/${params.id}`)
    return NextResponse.json({ data: result.data })
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const response = await fetchWithAuth(`${API_URL}/${params.id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error(`Failed to delete user: ${response.statusText}`)
    }
    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    console.error("Error deleting user:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

