import { Apartment } from "@/types/Apartment";
import { useEffect, useState } from "react";

export function useApartmentDetail(id: string) {
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApartment = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/apartments/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch apartment data");
        }
        const data = await response.json();
        setApartment(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchApartment();
  }, [id]);

  return { apartment, isLoading, error };
}
