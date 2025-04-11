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

export async function PUT(
  request: NextRequest,
  { params }: { params: { posterId: string } }
) {
  try {
    const { posterId } = params
    const body = await request.json()

  
    const response = await fetchWithAuth(`${API_URL}/manual-approve/${posterId}`, {
        method: 'PUT',
        body: JSON.stringify(body),
      }
    )
    if (!response.ok) {
      throw new Error(`Failed to manually approve poster: ${response.statusText}`);
    }
    const result = await response.json()
    return NextResponse.json(result)

  } catch (error) {
    console.error('Error manually approving poster:', error)
    return NextResponse.json(
      { error: 'Failed to fetchmanually approve poster' },
      { status: 500 }
    )
  }
}