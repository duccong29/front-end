// import { NextRequest, NextResponse } from "next/server";
// import { cookies } from "next/headers";

// const API_URL = process.env.API_URL || "http://localhost:8080/notifications";

// async function fetchWithAuth(url: string, options: RequestInit = {}) {
//   const cookieStore = cookies();
//   const authToken = cookieStore.get("authToken")?.value;

//   if (!authToken) {
//     throw new Error("Unauthorized");
//   }

//   const headers = new Headers(options.headers);
//   headers.set("Authorization", `Bearer ${authToken}`);

//   return fetch(url, {
//     ...options,
//     headers,
//   });
// }

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const response = await fetchWithAuth(`${API_URL}/${params.id}`, {
//       next: { revalidate: 0 },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch notifications");
//     }

//     const result = await response.json();
//     return NextResponse.json(result);
//   } catch (error) {
//     console.error("Error fetching notifications:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch notifications" },
//       {
//         status:
//           error instanceof Error && error.message === "Unauthorized"
//             ? 401
//             : 500,
//       }
//     );
//   }
// }

// export async function PATCH(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const response = await fetchWithAuth(`${API_URL}/${params.id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ readStatus: true }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to mark notification as read");
//     }

//     const result = await response.json();
//     return NextResponse.json(result);
//   } catch (error) {
//     console.error("Error marking notification as read:", error);
//     return NextResponse.json(
//       { error: "Failed to mark notification as read" },
//       {
//         status:
//           error instanceof Error && error.message === "Unauthorized"
//             ? 401
//             : 500,
//       }
//     );
//   }
// }

import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { NextRequest, NextResponse } from "next/server";


const API_URL = process.env.API_URL || "http://localhost:8080/notifications";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetchWithAuth(`${API_URL}/${params.id}`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch notifications: ${response.statusText}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      {
        status: error instanceof Error && error.message === "Unauthorized" ? 401 : 500,
      }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetchWithAuth(`${API_URL}/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ readStatus: true }),
    });

    if (!response.ok) {
      throw new Error(`Failed to mark notification as read: ${response.statusText}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return NextResponse.json(
      { error: "Failed to mark notification as read" },
      {
        status: error instanceof Error && error.message === "Unauthorized" ? 401 : 500,
      }
    );
  }
}

