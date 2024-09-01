// app/admin/apartments/[id]/page.tsx

"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";


export default function EditApartmentPage() {
  const router = useRouter();
  const { id } = useParams();
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
  const [error, setError] = useState<string | null>(null);
  const mapApartmentTypeNameToId = (typeName: string, types: { id: string, name: string }[]) => {
    const type = types.find(t => t.name === typeName);
    return type ? type.id : "";
  };
  useEffect(() => {
    const fetchApartmentTypes = async () => {
      try {
        const response = await fetch("/api/apartmentType");
        if (response.ok) {
          const data = await response.json();
          setApartmentTypes(data.data);
        }
      } catch (error) {
        console.error("Error fetching apartment types:", error);
      }
    };
  
    fetchApartmentTypes();
  }, []);
  
  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const response = await fetch(`/api/apartments/${id}`);
        if (!response.ok) {
          setError("Không tìm thấy căn hộ");
          return;
        }
        const data = await response.json();
        const apartment = data.data;
  
        // Ánh xạ apartmentTypeName về apartmentTypeId
        if (apartmentTypes.length > 0 && apartment.apartmentTypeName) {
          apartment.apartmentTypeId = mapApartmentTypeNameToId(apartment.apartmentTypeName, apartmentTypes);
        }
  
        setApartmentData(apartment);
        console.log("Fetched apartment data:", apartment);
      } catch (error) {
        console.error("Lỗi tải căn hộ:", error);
        setError("Có lỗi xảy ra, vui lòng thử lại");
      }
    };
  
    fetchApartment();
  }, [id, apartmentTypes]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setApartmentData((prevData) => ({
      ...prevData,
      [name]: files ? Array.from(files) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    Object.entries(apartmentData).forEach(([key, value]) => {
      if (key === "images") {
        (value as File[]).forEach((image) => formData.append("images", image));
      } else {
        formData.append(key, value as string);
      }
    });

    try {
      const response = await fetch(`/api/apartments/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        router.push("/admin/apartments");
      } else {
        const data = await response.json();
        setError(data.error || "Lỗi chỉnh sửa căn hộ");
      }
    } catch (error) {
      console.error("Lỗi chỉnh sửa căn hộ:", error);
      setError("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Chỉnh Sửa Căn Hộ</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
        {/* <div>
          <Image
          src={URL.createObjectURL()}
          width={500}
          height={500}
          alt="Picture of the author"
          />
        </div> */}
        
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
          PUT Apartment
        </button>
      </div>
    </form>
  </div>
  );
}

