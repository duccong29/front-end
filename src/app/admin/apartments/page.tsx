// src/app/admin/apartments/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Apartment } from '@/types/Apartment';

const ApartmentListPage = () => {
  const router = useRouter();
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchApartments();
  }, []);

  const fetchApartments = async () => {
    try {
      const response = await fetch('/api/apartments');
      if (!response.ok) {
        throw new Error('Failed to fetch apartments');
      }
      const data = await response.json();
      setApartments(data.data);
    } catch (error) {
      console.error('Error fetching apartments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/apartments/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete apartment');
      }
      fetchApartments();
    } catch (error) {
      console.error('Error deleting apartment:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Quản Lý Căn Hộ</h1>
      <button 
        onClick={() => router.push('/admin/apartments/add')}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Thêm Căn Hộ
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Tên Căn Hộ</th>
              <th className="py-2 px-4 border-b">Giá</th>
              <th className="py-2 px-4 border-b">Vị trí</th>
              <th className="py-2 px-4 border-b">Trạng thái</th>
              <th className="py-2 px-4 border-b">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {apartments.map((apartment) => (
              <tr key={apartment.id}>
                <td className="py-2 px-4 border-b">{apartment.title}</td>
                <td className="py-2 px-4 border-b">${apartment.price}</td>
                <td className="py-2 px-4 border-b">{apartment.address}</td>
                <td className="py-2 px-4 border-b">{apartment.status}</td>
                <td className="py-2 px-4 border-b flex space-x-2">
                  <button 
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => router.push(`/admin/apartments/${apartment.id}`)}
                  >
                    Sửa
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(apartment.id)}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApartmentListPage;
