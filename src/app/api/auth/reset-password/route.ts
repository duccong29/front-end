// import { NextResponse } from 'next/server'

// const API_URL = 'http://localhost:8080';
// export async function POST(request: Request) {
//   try {
//     const { token, newPassword } = await request.json()

//     const response = await fetch(`${API_URL}/users/reset-password`, { 
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ token, newPassword }),
//     })

//     if (!response.ok) {
//       return NextResponse.json({ message: 'Có lỗi xảy ra.' }, { status: 400 })
//     }

//     const result = await response.json()

//     return NextResponse.json(result, { status: 200 })
//   } catch (error) {
//     return NextResponse.json({ message: 'Đã xảy ra lỗi' }, { status: 500 })
//   }
// }


import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://localhost:8080";

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword } = await request.json();

    const response = await fetch(`${API_URL}/users/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, newPassword }),
    });

    if (!response.ok) {
      throw new Error(`Failed to reset password: ${response.statusText}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json({ error: "Failed to reset password" }, { status: 500 });
  }
}

