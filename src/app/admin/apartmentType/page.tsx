"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ApartmentTypePage() {
  const router = useRouter();
  const [apartmentTypes, setApartmentTypes] = useState<{ id: string; name: string; }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApartmentTypes = async () => {
      try {
        const response = await fetch('/api/apartmentType');
        if (!response.ok) {
          setError('Không thể tải danh sách loại căn hộ');
          return;
        }
        const data = await response.json();
        setApartmentTypes(data.data);
      } catch (error) {
        console.error('Lỗi tải danh sách loại căn hộ:', error);
        setError('Có lỗi xảy ra, vui lòng thử lại');
      }
    };

    fetchApartmentTypes();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/apartmentType/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        setError('Không thể xóa loại căn hộ');
        return;
      }

      setApartmentTypes(apartmentTypes.filter(type => type.id !== id));
    } catch (error) {
      console.error('Lỗi xóa loại căn hộ:', error);
      setError('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Danh sách loại căn hộ</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <Link href="/admin/apartmentType/add">
          <button className="mb-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Thêm loại căn hộ
          </button>
        </Link>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-900">ID</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-900">Tên loại căn hộ</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-900">Hành động</th>   
            </tr>
          </thead>
          <tbody>
            {apartmentTypes.map(type => (
              <tr key={type.id} className="border-b border-gray-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{type.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{type.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex justify-end space-x-2">
                    <Link href={`/admin/apartmentType/${type.id}`}>
                      <button className="py-1 px-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                        Sửa
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(type.id)}
                      className="py-1 px-3 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}