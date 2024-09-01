import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = 'http://localhost:8080/apartment-types';

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const cookieStore = cookies();
  const authToken = cookieStore.get('authToken')?.value;

  if (!authToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  });
}

export async function GET(request: Request) {
  try {
    const response = await fetchWithAuth(API_URL);

    if (!response.ok) {
      throw new Error('Failed to fetch apartment types');
    }

    const result = await response.json();
    return NextResponse.json({ data: result.data });
  } catch (error) {
    console.error('Error fetching apartment types:', error);
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await fetchWithAuth(API_URL, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to create apartment type');
    }

    const result = await response.json();
    return NextResponse.json({ data: result.data }, { status: 201 });
  } catch (error) {
    console.error('Error creating apartment type:', error);
    return NextResponse.error();
  }
}