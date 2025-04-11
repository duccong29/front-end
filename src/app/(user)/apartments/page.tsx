"use client";

import React from "react";
import ApartmentList from "@/components/users/ApartmentList";

import { useAvailableApartments } from "@/hooks/useFetchApartmentAvailable";
import ApartmentTypeSelector from "@/components/users/ApartmentTypeSelector";
import Pagination from "@/components/users/Pagination";
import { Skeleton } from "@/components/ui/skeleton";

const ApartmentsPage: React.FC = () => {
  const { 
    apartments,
    page,
    totalPages,
    apartmentType,
    isLoading,
    error,
    setPage,
    handleTypeChange,
  } = useAvailableApartments(1, "All");
  console.log("apartments", apartments);

  if (error) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-red-500">{error}</h2>
      </div>
    );
  }

  return (
    <section className="w-full max-w-5xl mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1 flex-shrink-0">
          <h2 className="text-2xl font-bold tracking-tight">{`Featured ${apartmentType}`}</h2>
          <p className="text-sm text-muted-foreground">Our Recommendation</p>
        </div>
        <ApartmentTypeSelector
          apartmentType={apartmentType}
          handleTypeChange={handleTypeChange}
        />
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex flex-col gap-4 p-4 border rounded-lg shadow-sm">
              <Skeleton className="w-full h-48 rounded-md" />
              <Skeleton className="w-3/4 h-6" />
              <div className="flex justify-between items-center">
                <Skeleton className="w-1/3 h-8" />
                <div className="flex gap-2">
                  <Skeleton className="w-12 h-6 rounded-full" />
                  <Skeleton className="w-12 h-6 rounded-full" />
                </div>
              </div>
              <Skeleton className="w-full h-10 rounded-md" />
            </div>
          ))}
        </div>
      ) : apartments.length === 0 ? (
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold text-gray-700">Không tìm thấy sản phẩm nào</h3>
          <p className="text-sm text-muted-foreground">Hãy thử thay đổi loại căn hộ hoặc tìm lại sau.</p>
        </div>
      ) : (
        <ApartmentList apartments={apartments} orientation="vertical" />
      )}
    </section>
  );
};

export default ApartmentsPage;
