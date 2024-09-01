// app/apartment/page.tsx
"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Apartment } from '@/types/Apartment';
const ApartmentsPage: React.FC = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await fetch('/api/apartments', { cache: 'no-store' });
        const result = await response.json();
        // console.log(result.data);
        setApartments(result.data);
      } catch (error) {
        console.error('Error fetching apartments:', error);
      }
    };

    fetchApartments();
  }, []);

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Apartments</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {apartments.map((apartment) => (
        <div key={apartment.id} className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">
            <Link href={`/apartments/${apartment.id}`}>
              <b className="text-blue-500 hover:underline">{apartment.title}</b>
            </Link>
          </h2>
          <p className="text-gray-600 mb-2">{apartment.description}</p>
          <p className="text-gray-800 font-bold">${apartment.price} per month</p>
          <p className="text-gray-600">{apartment.address}</p>
          <p className="text-gray-600">Area: {apartment.area} sq ft</p>
          <p className="text-green-500">{apartment.status}</p>
          <p className="text-gray-600">Type: {apartment.apartmentType}</p>
          <div className="flex flex-wrap mt-2">
              {apartment.images.map((image, index) => (
                <img key={index} src={image.url} alt={`Image ${index}`} className="w-24 h-24 object-cover mr-2 mb-2 rounded" />
              ))}
            </div>
        </div>
      ))}
    </div>
  </div>

  );
};

export default ApartmentsPage;
