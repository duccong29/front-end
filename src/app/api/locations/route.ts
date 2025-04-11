import { NextResponse } from 'next/server';

// Địa chỉ backend Spring Boot
const API_URL = 'http://localhost:8080/locations';

// Xử lý yêu cầu GET để lấy danh sách tỉnh/thành, quận/huyện, phường/xã
export async function GET(request: Request) {
    try {
        // Lấy query parameters từ URL
        const { searchParams } = new URL(request.url);
        const provinceCode = searchParams.get('provinceCode');
        const districtCode = searchParams.get('districtCode');

        let url;
        if (provinceCode) {
            // Lấy danh sách quận/huyện
            url = `${API_URL}/districts?provinceCode=${provinceCode}`;
        } else if (districtCode) {
            // Lấy danh sách phường/xã
            url = `${API_URL}/wards?districtCode=${districtCode}`;
        } else {
            // Lấy danh sách tỉnh/thành
            url = `${API_URL}/provinces`;
        }

        // Gọi API backend
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Backend returned ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        return NextResponse.json({data: result.data});
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch data' },
            { status: 500 }
        );
    }
}