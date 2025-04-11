import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.APARTMENT_TYPES_API_URL || 'http://localhost:8080/apartment-types';

async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const cookieStore = cookies();
  const authToken = cookieStore.get('authToken')?.value;

  if (!authToken) {
    throw new Error('Unauthorized');
  }

  const headers = new Headers(options.headers);
  headers.set('Authorization', `Bearer ${authToken}`);
  headers.set('Content-Type', 'application/json');

  return fetch(url, {
    ...options,
    headers,
  });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || "1";
  const size = searchParams.get("size") || "4";

  const url = new URL(API_URL);
  url.searchParams.set("page", page);
  url.searchParams.set("size", size);
  try {
    const response = await fetch(url, {
      // next: { revalidate: 3600 }, 
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch apartment types: ${response.statusText}`);
    }

    const result = await response.json();
    return NextResponse.json({ 
      data: result.data.data,
      totalPages: result.data.totalPages,
      totalElements: result.data.totalElements,
     });
  } catch (error) {
    console.error('Error fetching apartment types:', error);
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await fetchWithAuth(API_URL, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Failed to create apartment type: ${response.statusText}`);
    }

    const result = await response.json();
    revalidatePath('/apartment-types');
    return NextResponse.json({ data: result.data }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error creating apartment type:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

