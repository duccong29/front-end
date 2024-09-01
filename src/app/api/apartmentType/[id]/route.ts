// app/api/apartment/[id]/route.ts

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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const response = await fetchWithAuth(`${API_URL}/${params.id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch apartment type by ID');
    }

    const result = await response.json();
    return NextResponse.json({ data: result.data });
  } catch (error) {
    console.error('Error fetching apartment type by ID:', error);
    return NextResponse.error();
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const response = await fetchWithAuth(`${API_URL}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to update apartment type');
    }

    const result = await response.json();
    return NextResponse.json({ data: result.data });
  } catch (error) {
    console.error('Error updating apartment type:', error);
    return NextResponse.error();
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const response = await fetchWithAuth(`${API_URL}/${params.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ message: 'Failed to delete apartment type', error: errorData }, { status: 500 });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting apartment type:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}