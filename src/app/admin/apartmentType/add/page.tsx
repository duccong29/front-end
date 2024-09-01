"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function AddApartmentTypePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: ''});
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    
    try {
      const response = await fetch('/api/apartmentType', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Lỗi thêm loại căn hộ');
      } else {
        router.push('/admin/apartmentType');
      }
    } catch (error) {
      console.error('Lỗi thêm loại căn hộ:', error);
      setError('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Thêm loại căn hộ</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên loại căn hộ</label>
            <input
              type="text"
              name="name"
              placeholder="Tên loại căn hộ"
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Thêm loại căn hộ
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}