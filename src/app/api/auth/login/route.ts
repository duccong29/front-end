// // src/app/api/auth/login/route.ts
// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';

// const API_URL = 'http://localhost:8080';

// export async function POST(request: Request) {
//   try {
//     const { email, passWord } = await request.json();

//     const response = await fetch(`${API_URL}/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, passWord }),
//     });

//     if (!response.ok) {
//       throw new Error('Đăng nhập không thành công');
//     }
    
//     const result = await response.json();

//     try {
//       const cookieStore = cookies();
//       cookieStore.set('authToken', result.data.token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'strict',
//         maxAge: 3600,
//         path: '/',
//       });
//     } catch (error) {
//       return NextResponse.error();
//     }
    
//     //console.log("Token sau khi thiết lập:", cookieStore.get('authToken'));
//     const redirectUrl = new URL('/', request.url);
//     return NextResponse.redirect(redirectUrl.toString(), { status: 302 });
//   } catch (error) {
//     console.error('Lỗi server:', error);
//     return NextResponse.json({ error: 'Đã xảy ra lỗi server' }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL || "http://localhost:8080";

export async function POST(request: NextRequest) {
  try {
    const { email, passWord } = await request.json();

    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, passWord }),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.statusText}`);
    }

    const result = await response.json();

    cookies().set("authToken", result.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600,
      path: "/",
    });

    const redirectUrl = new URL("/", request.url);
    return NextResponse.redirect(redirectUrl.toString(), { status: 302 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

