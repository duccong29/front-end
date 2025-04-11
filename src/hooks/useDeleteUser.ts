"use client"

import { useState } from "react"

interface UseDeleteUserProps {
  onSuccess?: () => void
}

export function useDeleteUser({ onSuccess }: UseDeleteUserProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteUser = async (userId: string) => {
    setIsDeleting(true)
    setError(null)

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to delete user")
      }

      setIsSuccess(true)
      if (onSuccess) onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while deleting the user")
      console.error("Error deleting user:", err)
    } finally {
      setIsDeleting(false)
    }
  }

  const resetState = () => {
    setIsSuccess(false)
    setError(null)
  }

  return {
    deleteUser,
    isDeleting,
    isSuccess,
    error,
    resetState,
  }
}

