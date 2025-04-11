import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = 'http://localhost:8080/poster';

async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    const cookieStore = cookies();
    const authToken = cookieStore.get('authToken')?.value;
  
    if (!authToken) {
      throw new Error('Unauthorized');
    }
  
    const headers = new Headers(options.headers);
    headers.set('Authorization', `Bearer ${authToken}`);

    if (options.body && !(options.body instanceof FormData)) {
        headers.set("Content-Type", "application/json")
      }
    
    return fetch(url, {
      ...options,
      headers,
    });
  }

  export async function POST(request: NextRequest, { params }: { params: { posterId: string } }) {
    try {
      const { posterId } = params
      const { adminNote, approved } = await request.json()
  
      // Ensure approved is explicitly a boolean value
      const payload = {
        adminNote,
        approved: approved === true, // This ensures it's a boolean true, not truthy
      }
  
      const response = await fetchWithAuth(`${API_URL}/approve/${posterId}`, {
        method: "POST",
        body: JSON.stringify(payload),
      })
  
      if (!response.ok) {
        throw new Error(`Failed to update poster approval status: ${response.statusText}`)
      }
  
      const result = await response.json()
      return NextResponse.json(result)
    } catch (error) {
      console.error("Error updating poster approval status:", error)
      return NextResponse.json({ error: "Failed to update poster approval status" }, { status: 500 })
    }
  }