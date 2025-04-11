// app/api/apartment/[id]/route.ts

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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetchWithAuth(`${API_URL}/${params.id}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch apartment type: ${response.statusText}`);
    }

    const result = await response.json();
    return NextResponse.json({ data: result.data });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error fetching apartment type by ID:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const response = await fetchWithAuth(`${API_URL}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Failed to update apartment type: ${response.statusText}`);
    }

    const result = await response.json();
    revalidatePath(`/apartment-types/${params.id}`);
    return NextResponse.json({ data: result.data });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error updating apartment type:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetchWithAuth(`${API_URL}/${params.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete apartment type: ${response.statusText}`);
    }

    revalidatePath('/apartment-types');
    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error deleting apartment type:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

