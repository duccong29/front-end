
// import { useState } from "react";
// import { useToast } from "./use-toast";

// export function useDeleteApartment(onSuccess?: () => void) {
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const { toast } = useToast();
//   const deleteApartment = async (id: string) => {
//     setIsDeleting(true);
//     setError(null);

//     try {
//       const response = await fetch(`/api/apartments/${id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete apartment");
//       }

//       // Nếu xóa thành công, gọi hàm callback để refresh danh sách
//       if (onSuccess) onSuccess();
//     } catch (err) {
//         const errorMessage = err instanceof Error ? err.message : "An error occurred";
//         setError(errorMessage);
//         toast({
//           title: "Error",
//           description: errorMessage,
//           variant: "destructive", // Shadcn dùng `destructive` cho lỗi
//         });
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   return { deleteApartment, isDeleting, error };
// }


"use client"

import { useCallback, useState } from "react";

export interface UseDeleteApartmentProps {
  onSuccess?: () => void;
}

export function useDeleteApartment({ onSuccess }: UseDeleteApartmentProps = {}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const deleteApartment = useCallback(async (id: string) => {
    setIsDeleting(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await fetch(`/api/apartments/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete apartment");
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
    setError(null)
    setIsSuccess(false)
  }

  return { deleteApartment, resetState, isDeleting, error, isSuccess };
}

