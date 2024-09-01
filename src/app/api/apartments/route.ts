// app/api/apartment/route.ts

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

export async function GET(request: Request) {
  try {
    const response = await fetch('http://localhost:8080/apartments', {
             cache: 'no-store'
           });

    if (!response.ok) {
      throw new Error('Failed to fetch apartments');
    }

    const result = await response.json();
    return NextResponse.json({ data: result.data });
  } catch (error) {
    console.error('Error fetching apartments:', error);
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    const formDataToSend = await request.formData();
    //console.log('Received Form Data:', Object.fromEntries(formData)); 
    const response = await fetchWithAuth(API_URL, {
      method: 'POST',
      body: formDataToSend,
    });

    if (!response.ok) {

      throw new Error('Failed to create apartment');
    }

    const result = await response.json();
    return NextResponse.json({ data: result.data });
  } catch (error) {
    console.error('Error creating apartment:', error);
    return NextResponse.error();
  }
}