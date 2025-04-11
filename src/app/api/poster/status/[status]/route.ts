// import { NextRequest, NextResponse } from "next/server";
// import { cookies } from "next/headers";

// const API_URL = 'http://localhost:8080/poster';

// async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
//     const cookieStore = cookies();
//     const authToken = cookieStore.get('authToken')?.value;
  
//     if (!authToken) {
//       throw new Error('Unauthorized');
//     }
  
//     const headers = new Headers(options.headers);
//     headers.set('Authorization', `Bearer ${authToken}`);

//     if (options.body && !(options.body instanceof FormData)) {
//         headers.set("Content-Type", "application/json")
//       }
    
//     return fetch(url, {
//       ...options,
//       headers,
//     });
//   }

//   export async function GET(request: NextRequest, { params }: { params: { status: string } }) {
//     try {
//       const status = params.status
  
//       // Validate status parameter
//       if (!["PENDING", "APPROVED", "REJECTED"].includes(status)) {
//         return NextResponse.json({ error: "Invalid status parameter" }, { status: 400 })
//       }
  
//       // Make a request to your database or API to get posters by status
//       // This is a placeholder - replace with your actual data fetching logic
//       const response = await fetchWithAuth(`${API_URL}/status/${status}`)
  
//       if (!response.ok) {
//         throw new Error(`Failed to fetch ${status} posters`)
//       }
  
//       const data = await response.json()
  
//       return NextResponse.json({ data: data.data || [] })
//     } catch (error) {
//       console.error(`Error fetching posters with status ${params.status}:`, error)
//       return NextResponse.json({ error: "Failed to fetch posters" }, { status: 500 })
//     }
//   }