// // app/api/apartment/[id]/route.ts

// import { NextResponse } from "next/server";

// const API_URL = "http://localhost:8080/comments";

// export async function GET(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const response = await fetch(`${API_URL}/${params.id}`, {
//       cache: "no-store",
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch comment by ID");
//     }

//     const result = await response.json();
//     return NextResponse.json(result);
//   } catch (error) {
//     console.error("Error fetching comment by ID:", error);
//     return NextResponse.error();
//   }
// }


import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.COMMENTS_API_URL || "http://localhost:8080/comments";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`${API_URL}/${params.id}`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch comment: ${response.statusText}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching comment by ID:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

