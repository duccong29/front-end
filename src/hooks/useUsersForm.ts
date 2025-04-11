"use client"

import type React from "react"
import { useToast } from "@/hooks/use-toast"
import { useCallback, useEffect, useState } from "react"

// Base interface for common fields
interface BaseUserFormData {
  userName: string
  firstName: string
  lastName: string
  dob: string
}

// Interface for creating a new user
interface CreateUserFormData extends BaseUserFormData {
  email: string
  passWord: string
  confirmPassword: string
}

// Interface for updating a user
interface UpdateUserFormData extends BaseUserFormData {
  passWord: string
  confirmPassword: string
}

interface UseUsersFormProps {
  userId?: string
  onSuccess?: () => void
}

export function useUsersForm({ userId, onSuccess }: UseUsersFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState<CreateUserFormData | UpdateUserFormData>({
    email: "",
    passWord: "",
    confirmPassword: "",
    userName: "",
    firstName: "",
    lastName: "",
    dob: "",
  } as CreateUserFormData)

  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(userId ? true : false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Fetch user data if editing
  const fetchUser = useCallback(async () => {
    if (!userId) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/users/${userId}`)
      if (!response.ok) {
        setError("User not found")
        setIsLoading(false)
        return
      }

      const data = await response.json()
      const user = data.data

      // For edit mode, we don't include email
      setFormData({
        passWord: "",
        confirmPassword: "",
        userName: user.userName || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        dob: user.dob ? new Date(user.dob).toISOString().split("T")[0] : "",
      } as UpdateUserFormData)
    } catch (error) {
      console.error("Error loading user:", error)
      setError("An error occurred, please try again")
    } finally {
      setIsLoading(false)
    }
  }, [userId])

  // Load data on initial render if editing
  useEffect(() => {
    if (userId) {
      fetchUser()
    }
  }, [userId, fetchUser])

  // Validate form data
  const validateForm = (): boolean => {
    // Check if passwords match
    if (formData.passWord !== formData.confirmPassword) {
      setError("Passwords do not match")
      return false
    }

    // If creating a new user, email is required
    if (!userId && "email" in formData && !formData.email) {
      setError("Email is required")
      return false
    }

    // If creating a new user or updating with a new password, password is required
    if (!userId && !formData.passWord) {
      setError("Password is required")
      return false
    }

    return true
  }

  // Submit form data
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    // Validate form
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const url = userId ? `/api/users/${userId}` : "/api/users"
      const method = userId ? "PUT" : "POST"

      // Prepare data for submission - remove confirmPassword
      let dataToSubmit: any = { ...formData }
      delete dataToSubmit.confirmPassword

      // If editing and password is empty, don't send it
      if (userId && !dataToSubmit.passWord) {
        const { passWord, ...dataWithoutPassword } = dataToSubmit
        dataToSubmit = dataWithoutPassword
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        if (onSuccess) onSuccess()
      } else {
        setError(result.error || `Error ${userId ? "updating" : "creating"} user`)
        console.error(`Failed to ${userId ? "update" : "create"} user`, result)
      }
    } catch (error) {
      console.error(`Error ${userId ? "updating" : "creating"} user:`, error)
      setError("An error occurred, please try again")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    formData,
    isLoading,
    error,
    isSuccess,
    handleChange,
    handleSubmit,
  }
}

