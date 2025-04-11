"use client"

import type React from "react"
import { useCallback, useEffect, useState } from "react"

interface UseApartmentTypeFormProps {
  typeId?: string
  onSuccess?: () => void
}

export function useApartmentTypeForm({ typeId, onSuccess }: UseApartmentTypeFormProps) {
  const [name, setName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(typeId ? true : false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  // Fetch apartment type data if editing
  const fetchApartmentType = useCallback(async () => {
    if (!typeId) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/apartmentType/${typeId}`)
      if (!response.ok) {
        setError("Apartment type not found")
        setIsLoading(false)
        return
      }

      const data = await response.json()
      setName(data.data.name || "")
    } catch (error) {
      console.error("Error loading apartment type:", error)
      setError("An error occurred, please try again")
    } finally {
      setIsLoading(false)
    }
  }, [typeId])

  // Load data on initial render if editing
  useEffect(() => {
    if (typeId) {
      fetchApartmentType()
    }
  }, [typeId, fetchApartmentType])

  // Submit form data
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const url = typeId ? `/api/apartmentType/${typeId}` : "/api/apartmentType"
      const method = typeId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        if (onSuccess) onSuccess()
      } else {
        setError(result.error || `Error ${typeId ? "updating" : "creating"} apartment type`)
        console.error(`Failed to ${typeId ? "update" : "create"} apartment type`, result)
      }
    } catch (error) {
      console.error(`Error ${typeId ? "updating" : "creating"} apartment type:`, error)
      setError("An error occurred, please try again")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    name,
    isLoading,
    error,
    isSuccess,
    handleChange,
    handleSubmit,
  }
}

