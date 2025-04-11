"use client"

import type React from "react"

import { useToast } from "@/hooks/use-toast"
import type { ApartmentFormData, Image as ApartmentImage, ImageFormData } from "@/types/Apartment"
import { useCallback, useEffect, useState } from "react"

interface UseApartmentFormProps {
  apartmentId?: string
  userId: string
  apartmentTypes: { id: string; name: string }[]
  onSuccess?: () => void
}

export function useApartmentForm({ apartmentId, userId, apartmentTypes, onSuccess }: UseApartmentFormProps) {
  const { toast } = useToast()
  const [images, setImages] = useState<ImageFormData[]>([])
  const [existingImages, setExistingImages] = useState<ApartmentImage[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(apartmentId ? true : false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState<ApartmentFormData>({
    title: "",
    description: "",
    price: "",
    area: "",
    status: "",
    apartmentTypeId: "",
    userId: userId || "",
    location: {
      provinceCode: "",
      districtCode: "",
      wardCode: "",
    },
    images: [],
  })

  // Handle location changes
  const handleLocationChange = useCallback((type: "province" | "district" | "ward", code: string) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [`${type}Code`]: code,
      },
    }))
  }, [])

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle image uploads
  const handleImagesChange = (newImages: ImageFormData[]) => {
    setImages(newImages)
  }

  // Handle deleting existing images
  const handleDeleteExistingImage = (index: number) => {
    setExistingImages((prevImages) => {
      const updatedImages = [...prevImages]
      updatedImages.splice(index, 1)
      return updatedImages
    })
  }

  // Convert image URL to File object
  const convertImageUrlToFile = async (imageUrl: string, filename: string): Promise<File | null> => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      return new File([blob], filename, { type: blob.type })
    } catch (error) {
      console.error("Error converting image URL to file:", error)
      return null
    }
  }

  // Add this function inside the useApartmentForm hook, before the useEffect
  const mapApartmentTypeNameToId = (typeName: string, types: { id: string; name: string }[]) => {
    const type = types.find((t) => t.name === typeName)
    return type ? type.id : ""
  }

  // Replace the fetchApartment function inside useEffect with this version
  const fetchApartment = async () => {
    if (!apartmentId) return
    setIsLoading(true);
    try {
      const response = await fetch(`/api/apartments/${apartmentId}`)
      if (!response.ok) {
        setError("Apartment not found")
        setIsLoading(false)
        return
      }

      const data = await response.json()
      const apartment = data.data

      // Map apartment type name to ID if needed
      let apartmentTypeId = apartment.apartmentTypeId || ""
      if (!apartmentTypeId && apartment.apartmentTypeName && apartmentTypes.length > 0) {
        apartmentTypeId = mapApartmentTypeNameToId(apartment.apartmentTypeName, apartmentTypes)
      }

      setFormData({
        title: apartment.title || "",
        description: apartment.description || "",
        price: apartment.price?.toString() || "",
        area: apartment.area?.toString() || "",
        status: apartment.status || "",
        apartmentTypeId: apartmentTypeId,
        userId: apartment.userId || userId || "",
        location: {
          provinceCode: apartment.location?.provinceCode || "",
          districtCode: apartment.location?.districtCode || "",
          wardCode: apartment.location?.wardCode || "",
          provinceName: apartment.location?.provinceName || "",
          districtName: apartment.location?.districtName || "",
          wardName: apartment.location?.wardName || "",
        },
        images: [],
      })

      if (apartment.images && Array.isArray(apartment.images)) {
        setExistingImages(apartment.images)
      }
    } catch (error) {
      console.error("Error loading apartment:", error)
      setError("An error occurred, please try again")
    } finally {
      setIsLoading(false)
    }
  }

  // Update the useEffect dependency array to include apartmentTypes
  useEffect(() => {
    if (apartmentId && apartmentTypes.length > 0) {
      fetchApartment()
    }
  }, [apartmentId, userId, apartmentTypes])

  // Submit form data
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    const formDataObj = new FormData()

    // Add basic apartment data
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "location" && key !== "images" && value) {
        formDataObj.append(key, value as string)
      }
    })

    // Add location data
    if (formData.location.provinceCode) formDataObj.append("location.provinceCode", formData.location.provinceCode)
    if (formData.location.districtCode) formDataObj.append("location.districtCode", formData.location.districtCode)
    if (formData.location.wardCode) formDataObj.append("location.wardCode", formData.location.wardCode)

    // Add new images
    images.forEach((image) => {
      if (image.file) formDataObj.append("images", image.file)
    })

    try {
      // Process existing images
      const existingImageFiles = await Promise.all(
        existingImages.map(async (image, index) => {
          const file = await convertImageUrlToFile(image.url, `existing-${index}.jpg`)
          return file
        }),
      )

      existingImageFiles.forEach((file) => {
        if (file) formDataObj.append("images", file)
      })

      const url = apartmentId ? `/api/apartments/${apartmentId}` : "/api/apartments"

      const method = apartmentId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        body: formDataObj,
      })

      const result = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        if (onSuccess) onSuccess()
      } else {
        setError(result.error || `Error ${apartmentId ? "updating" : "creating"} apartment`)
        console.error(`Failed to ${apartmentId ? "update" : "create"} apartment`, result)
      }
    } catch (error) {
      console.error(`Error ${apartmentId ? "updating" : "creating"} apartment:`, error)
      setError("An error occurred, please try again")
    }finally {
      setIsLoading(false)
    }
  }

  return {
    formData,
    images,
    existingImages,
    isLoading,
    error,
    isSuccess,
    handleChange,
    handleSelectChange,
    handleLocationChange,
    handleImagesChange,
    handleDeleteExistingImage,
    handleSubmit,
  }
}
