// // src/app/api/auth/signup/route.ts
// import { NextResponse } from 'next/server';

// const API_URL = 'http://localhost:8080';

// export async function POST(request: Request) {
//   try {
//     const { email, passWord } = await request.json();

//     const response = await fetch(`${API_URL}/users`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, passWord }),
//     });

//     if (!response.ok) {
//       throw new Error('Đăng ký không thành công');
//     }
//     const result = await response.json();
//     return NextResponse.json(result);
    
//   } catch (error) {
//     console.error('Lỗi server:', error);
//     return NextResponse.json({ error: 'Đã xảy ra lỗi server' }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://localhost:8080";

export async function POST(request: NextRequest) {
  try {
    const { email, passWord } = await request.json();

    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, passWord }),
    });

    if (!response.ok) {
      throw new Error(`Signup failed: ${response.statusText}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

