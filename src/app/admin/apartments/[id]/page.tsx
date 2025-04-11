"use client"
import { useRouter, useParams } from "next/navigation"
import type React from "react"
import { useEffect } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Loader2, RefreshCcw, X, XCircle } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { useAuth } from "@/utils/AuthContext"
import LocationSelector from "@/components/location/LocationSelector"
import { useFetchApartmentTypes } from "@/hooks/useFetchApartmentTypes"
import { useApartmentForm } from "@/hooks/useApartmentForm"
import type { ImageFormData } from "@/types/Apartment"
import ImageUploader from "@/components/users/ImageUploader"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

const EditApartmentPage: React.FC = () => {
  const router = useRouter()
  const { id } = useParams()
  const { userId } = useAuth()
  const { apartmentTypes, isLoading: isTypesLoading } = useFetchApartmentTypes()
  const { toast } = useToast()

  const {
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
  } = useApartmentForm({
    apartmentId: id as string,
    userId: userId || "",
    apartmentTypes,
    onSuccess: () => {},
  })

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Update Successful",
        description: "Your apartment has been updated successfully.",
        variant: "default",
        className: "bg-background border-green-500 dark:border-green-600",
        icon: <RefreshCcw className="h-10 w-10 text-green-500 dark:text-green-400" />,
        duration: 10000,
        action: (
          <div className="flex gap-2 mt-2">
            <Button 
            variant="outline" 
            size="sm" 
            className="bg-white hover:bg-gray-100 text-gray-800 border-gray-300 hover:border-gray-400"
            onClick={() => router.push("/admin/apartments")
            }>
              Go to Apartments
            </Button>
          </div>
        ),
      })

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

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
  //         <p className="mt-4 text-gray-600">Loading apartment data...</p>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="container px-8 py-8">
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
            <CardTitle className="text-2xl font-bold">Edit Apartment</CardTitle>
            <CardDescription className="text-sky-100">
            Edit apartment for your property listings
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  placeholder="Title"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  placeholder="Describe your apartment..."
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (VND)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    placeholder="1500"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">Area (m²)</Label>
                  <Input
                    id="area"
                    name="area"
                    type="number"
                    value={formData.area}
                    placeholder="750"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="apartmentTypeId">Apartment Type</Label>
                <Select
                  value={formData.apartmentTypeId}
                  onValueChange={(value) => handleSelectChange("apartmentTypeId", value)}
                  required
                  disabled={isTypesLoading}
                >
                  <SelectTrigger id="apartmentTypeId">
                    <SelectValue placeholder="Select Apartment Type" />
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
                <Label htmlFor="location">Location</Label>
                <LocationSelector
                  onProvinceChange={(code) => handleLocationChange("province", code)}
                  onDistrictChange={(code) => handleLocationChange("district", code)}
                  onWardChange={(code) => handleLocationChange("ward", code)}
                  initialProvinceCode={formData.location.provinceCode}
                  initialDistrictCode={formData.location.districtCode}
                  initialWardCode={formData.location.wardCode}
                />
              </div>

              <div className="space-y-4">
                <ImageUploader
                  images={images as { file: File }[]}
                  onChange={(newImages) => handleImagesChange(newImages as ImageFormData[])}
                />

                {existingImages.length > 0 && (
                  <>
                    <h3 className="font-medium text-sm mt-4">Current Images</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                      {existingImages.map((image, index) => (
                        <div key={`existing-${index}`} className="relative group">
                          <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                          <Image
                            src={image.url || "/placeholder.svg"}
                            alt={`Existing image ${index + 1}`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleDeleteExistingImage(index)}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label={`Delete image ${index + 1}`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
                <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-teal-400 hover:from-indigo-600 hover:to-cyan-500 text-white transition-all duration-300 ease-in-out"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Update...
                  </>
                ) : (
                    "Update Apartment"
                )}
              </Button>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
export default EditApartmentPage

