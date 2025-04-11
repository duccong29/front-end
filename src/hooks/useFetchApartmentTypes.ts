// hooks/useFetchApartmentTypes.ts
import { ApartmentType } from "@/types/ApartmentType";
import { useCallback, useEffect, useState } from "react";

export function useFetchApartmentTypes(initialPage: number = 1, initialPageSize: number = 4) {
  const [apartmentTypes, setApartmentTypes] = useState<ApartmentType[]>([]);
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApartmentTypes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/apartmentType?page=${page}&size=${pageSize}`,
        { cache: "no-store" }
      );
     
      if (!response.ok) {
        throw new Error(`Failed to fetch apartment types: ${response.status}`);
      }

      const result = await response.json();
      console.log("result apartment types", result);
      setApartmentTypes(result.data || []);
      setTotalPages(result.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch apartment types", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => {
    fetchApartmentTypes();
  }, [fetchApartmentTypes]);

  return {
    apartmentTypes,
    page,
    pageSize,
    totalPages,
    isLoading,
    error,
    setPage,
    setPageSize,
    refetch: fetchApartmentTypes,
  };
}