// app/api/suggestions/route.ts
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const prefix = searchParams.get('prefix')
  
  if (!prefix) {
    return NextResponse.json(
      { error: 'Prefix parameter is required' },
      { status: 400 }
    )
  }

  try {
    const backendUrl = `http://localhost:8080/apartments/suggest?prefix=${encodeURIComponent(prefix)}`
    const response = await fetch(backendUrl, {
      next: { revalidate: 3600 } // Optional: Cache the response for 1 hour
    })

    if (!response.ok) {
      throw new Error(`Backend responded with status ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Suggestion fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch suggestions' },
      { status: 500 }
    )
  }
}