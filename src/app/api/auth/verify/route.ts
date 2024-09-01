// src/app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';

const API_URL = 'http://localhost:8080';

export async function POST(request: Request) {
  try {
    const { email, userName, passWord } = await request.json();

    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, userName, passWord }),
    });

    if (!response.ok) {
      throw new Error('Đăng ký không thành công');
    }

    // Redirect to login page after successful signup
    const redirectUrl = new URL('/login', request.url);
    return NextResponse.redirect(redirectUrl.toString(), { status: 302 });
  } catch (error) {
    console.error('Lỗi server:', error);
    return NextResponse.json({ error: 'Đã xảy ra lỗi server' }, { status: 500 });
  }
}