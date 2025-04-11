import { Apartment } from "@/types/Apartment";
import { useCallback, useEffect, useState } from "react";

export function useAvailableApartments(initialPage: number, initialType: string) {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [apartmentType, setApartmentType] = useState(initialType);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApartments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/apartments/available?page=${page}&size=4&apartmentType=${apartmentType}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch apartments available");
      }
      const result = await response.json();
      setApartments(result.data);
      setTotalPages(result.totalPages);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [page, apartmentType]);

  useEffect(() => {
    fetchApartments();
  }, [fetchApartments]);

  const handleTypeChange = (type: string) => {
    setApartmentType(type);
    setPage(1);
  };

  return {
    apartments,
    page,
    totalPages,
    apartmentType,
    isLoading,
    error,
    setPage,
    handleTypeChange,
    refetch: fetchApartments, 
  };
}