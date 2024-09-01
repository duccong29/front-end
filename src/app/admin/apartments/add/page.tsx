// app/admin/apartments/add/page.tsx

"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AddApartmentPage() {
  const router = useRouter();
  const [apartmentData, setApartmentData] = useState({
    title: "",
    description: "",
    price: "",
    address: "",
    area: "",
    status: "",
    apartmentTypeId: "",
    images: [] as File[],
  });
  
  const [apartmentTypes, setApartmentTypes] = useState([]);

  useEffect(() => {
    fetch('/api/apartmentType')
      .then(response => response.json())
      .then(data => setApartmentTypes(data.data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setApartmentData((prevData) => ({
      ...prevData,
      [name]: files ? Array.from(files) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(apartmentData).forEach(([key, value]) => {
      if (key === "images") {
        (value as File[]).forEach((image) => formData.append("images", image));
      } else {
        formData.append(key, value as string);
      }
    });

    try {
      const response = await fetch("/api/apartments", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Apartment created:", data);
        router.push("/admin/apartments");
      } else {
        console.error("Failed to create apartment");
        // Handle error
      }
    } catch (error) {
      console.error("Error creating apartment:", error);
      // Handle error
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
    <h1 className="text-2xl font-bold mb-4">Thêm Căn Hộ</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={apartmentData.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <input
          type="text"
          name="description"
          value={apartmentData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          name="price"
          value={apartmentData.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          value={apartmentData.address}
          onChange={handleChange}
          placeholder="Address"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="area" className="block text-sm font-medium text-gray-700">Area</label>
        <input
          type="text"
          name="area"
          value={apartmentData.area}
          onChange={handleChange}
          placeholder="Area"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
        <input
          type="text"
          name="status"
          value={apartmentData.status}
          onChange={handleChange}
          placeholder="Status"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="apartmentTypeId" className="block text-sm font-medium text-gray-700">Apartment Type</label>
        <select
          name="apartmentTypeId"
          value={apartmentData.apartmentTypeId}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">Select Apartment Type</option>
          {apartmentTypes.map((type: { id: string, name: string }) => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images</label>
        <input
          type="file"
          name="images"
          onChange={handleChange}
          multiple
          required
          className="mt-1 block w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 cursor-pointer focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Apartment
        </button>
      </div>
    </form>
  </div>
  );
}