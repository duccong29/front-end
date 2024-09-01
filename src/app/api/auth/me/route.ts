// src/app/api/auth/me/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    const cookieStore = cookies();
    const authToken = cookieStore.get('authToken')?.value;
    //console.log("authToken trong me:", authToken);
    if (!authToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const response = await fetch('http://localhost:8080/users/myInfo', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ error: errorData.message || 'Failed to fetch user info' }, { status: response.status });
        }

        const result = await response.json();
        // console.log("result trong me:", JSON.stringify(result, null, 2));
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching user info trong me:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}