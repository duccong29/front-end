import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = 'http://localhost:8080/users';

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

export async function GET(request: NextRequest) {
    try {
       
        const response = await fetchWithAuth(API_URL);

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const result = await response.json();
        return NextResponse.json({ data: result.data }); 
    } catch (error) {
        console.error('Error fetching Users Apii:', error);
        return NextResponse.error();
    }
}

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json()

    // Remove confirmPassword before sending to backend
    const { confirmPassword, ...createData } = userData

    const response = await fetchWithAuth(API_URL, {
      method: "POST",
      body: JSON.stringify(createData),
    })

    if (!response.ok) {
      throw new Error(`Failed to create user: ${response.statusText}`)
    }

    const result = await response.json()
 
    return NextResponse.json({ data: result.data }, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}