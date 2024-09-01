// app/apartment/[id]page.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Apartment } from '@/types/Apartment';

const ApartmentDetailPage: React.FC = () => {

  const { id } = useParams();
  const [apartment, setApartment] = useState<Apartment | null>(null);

  useEffect(() => {
    if (id) {
      const fetchApartment = async () => {
        try {
          const response = await fetch(`/api/apartments/${id}`, { cache: 'no-store' });
          if (!response.ok) {
            throw new Error('Failed to fetch apartment details');
          }
          const re = await response.json();
          setApartment(re.data);
        } catch (error) {
          console.error('Error fetching apartment details:', error);
        }
      };

      fetchApartment();
    }
  }, [id]);

  if (!apartment) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-4">{apartment.title}</h1>
      <p className="text-gray-700 mb-4">{apartment.description}</p>
      <div className="mb-4">
        <span className="font-bold">Price:</span> ${apartment.price}
      </div>
      <div className="mb-4">
        <span className="font-bold">Location:</span> {apartment.address}
      </div>
      <div className="mb-4">
        <span className="font-bold">Area:</span> {apartment.area} sq ft
      </div>
      <div className="mb-4">
        <span className="font-bold">Status:</span> {apartment.status}
      </div>
      <div className="mb-4">
        <span className="font-bold">Type:</span> {apartment.apartmentType}
      </div>
      <div className="flex flex-wrap mt-2">
          {apartment.images.map((image, index) => (
            <img key={index} src={image.url} alt={`Image ${index}`} className="w-24 h-24 object-cover mr-2 mb-2 rounded" />
          ))}
        </div>
    </div>
  </div>

  );
};

export default ApartmentDetailPage;
