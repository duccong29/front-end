"use client"
import { useRouter } from "next/navigation"
import type React from "react"
import { useEffect } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/utils/AuthContext"
import LocationSelector from "@/components/location/LocationSelector"
 import { useFetchApartmentTypes }  from "@/hooks/useFetchApartmentTypes"
import ImageUploader from "@/components/users/ImageUploader"
import { useApartmentForm } from "@/hooks/useApartmentForm"
import type { ImageFormData } from "@/types/Apartment"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, CheckCircle, Loader2, XCircle } from "lucide-react"
import Link from "next/link"


const AddApartmentPage: React.FC = () => {
  const router = useRouter()
  const { userId } = useAuth()
  const { apartmentTypes, isLoading: isTypesLoading } = useFetchApartmentTypes()
  const { toast } = useToast()

  const {
    formData,
    images,
    isLoading,
    error,
    isSuccess,
    handleChange,
    handleSelectChange,
    handleLocationChange,
    handleImagesChange,
    handleSubmit,
  } = useApartmentForm({
    userId: userId || "",
    apartmentTypes,
    onSuccess: () => {},
  })

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "Your apartment has been added successfully.",
        variant: "default",
        className: "bg-background border-green-500 dark:border-green-600",
        icon: <CheckCircle className="h-10 w-10 text-green-500 dark:text-green-400" />,
        duration: 5000,
        action: (
          <div className="flex gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-white hover:bg-gray-100 text-gray-800 border-gray-300 hover:border-gray-400"
              onClick={() => {
                router.push("/admin/apartments/add")
                window.location.reload()
              }}
            >
              Add New
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => router.push("/admin/apartments")
              }
              >
              Go to Apartments
            </Button>
          </div>
        ),
      })

      // Auto-redirect after 10 seconds
      const timeout = setTimeout(() => {
        router.push("/admin/apartments")
      }, 10000)

      return () => clearTimeout(timeout)
    }
  }, [isSuccess, router, toast])

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
        className: "bg-background border-red-500 dark:border-red-600",
        icon: <XCircle className="h-10 w-10 text-red-500 dark:text-red-400" />,
        duration: 5000,
      })
    }
  }, [error, toast])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white rounded-xl">
      <div className="container px-4 md:px-8 py-8">
      <div className="mb-4">
          <Link
            href="/admin/apartments"
            className="inline-flex items-center text-sky-600 hover:text-sky-700 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Apartment
          </Link>
        </div>
        <Card className=" backdrop-blur-sm bg-white/80 rounded-xl shadow-lg overflow-hidden border border-sky-100">
        <CardHeader className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white">
            <CardTitle className="text-2xl font-bold">Add New Apartment</CardTitle>
            <CardDescription className="text-sky-100">
              Create a new apartment for your property listings
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  aria-describedby="title-description"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your apartment..."
                  required
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (VND)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="15000000"
                    required
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">Area (m²)</Label>
                  <Input
                    id="area"
                    name="area"
                    type="number"
                    placeholder="50"
                    required
                    value={formData.area}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="apartmentTypeId">Apartment Type</Label>
                <Select
                  onValueChange={(value) => handleSelectChange("apartmentTypeId", value)}
                  value={formData.apartmentTypeId}
                  disabled={isTypesLoading}
                >
                  <SelectTrigger id="apartmentTypeId">
                    <SelectValue placeholder={isTypesLoading ? "Loading..." : "Select Apartment Type"} />
                  </SelectTrigger>
                  <SelectContent>
                    {apartmentTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <LocationSelector
                  onProvinceChange={(code) => handleLocationChange("province", code)}
                  onDistrictChange={(code) => handleLocationChange("district", code)}
                  onWardChange={(code) => handleLocationChange("ward", code)}
                  initialProvinceCode={formData.location.provinceCode}
                  initialDistrictCode={formData.location.districtCode}
                  initialWardCode={formData.location.wardCode}
                />
              </div>

              <ImageUploader
                images={images as { file: File }[]}
                onChange={(newImages) => handleImagesChange(newImages as ImageFormData[])}
              />

              <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-teal-400 hover:from-indigo-600 hover:to-cyan-500 text-white transition-all duration-300 ease-in-out"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                 "Add Apartment"
              )}
            </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AddApartmentPage

