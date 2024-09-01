// app/api/apartment/[id]/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = 'http://localhost:8080/apartments';

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const cookieStore = cookies();
  const authToken = cookieStore.get('authToken')?.value;

  if (!authToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${authToken}`,
  };
  //console.log('Request Headers:', headers);
  return fetch(url, {
    ...options,
    headers: headers,
   
  });
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const response = await fetchWithAuth(`${API_URL}/${params.id}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch apartment by ID');
    }

    const result = await response.json();
    return NextResponse.json({ data: result.data });
  } catch (error) {
    console.error('Error fetching apartment by ID:', error);
    return NextResponse.error();
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const formData = await request.formData();
    const response = await fetchWithAuth(`${API_URL}/${params.id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to update apartment');
    }

    const result = await response.json();
    return NextResponse.json({ data: result.data });
  } catch (error) {
    console.error('Error updating apartment:', error);
    return NextResponse.error();
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const response = await fetchWithAuth(`${API_URL}/${params.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete apartment');
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting apartment:', error);
    return NextResponse.error();
  }
}