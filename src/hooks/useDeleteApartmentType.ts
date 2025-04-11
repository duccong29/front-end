"use client"

import { useState, useCallback } from "react";

export interface UseDeleteApartmentTypeProps {
  onSuccess?: () => void;
}

export function useDeleteApartmentType({ onSuccess }: UseDeleteApartmentTypeProps = {}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const deleteApartmentType = useCallback(async (id: string) => {
    setIsDeleting(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await fetch(`/api/apartmentType/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete apartment type");
      }

      setIsSuccess(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  }, [onSuccess]);

  const resetState = () => {
    setError(null);
    setIsSuccess(false);
  }

  return { deleteApartmentType, resetState, isDeleting, error, isSuccess,  };
}