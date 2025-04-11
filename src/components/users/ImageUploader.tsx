"use client"

import type React from "react"
import { useCallback } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Upload, X } from "lucide-react"
import Image from "next/image"
import { ImageFormData } from "@/types/Apartment"



interface ImageUploaderProps {
  images: ImageFormData[]
  onChange: (images: ImageFormData[]) => void
}

export default function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const filesArray = Array.from(event.target.files)

        if (filesArray.length > 0) {
          const newImages = filesArray.map((file) => ({
            file,
          }))

          onChange([...images, ...newImages])
        }

        // Reset the input value to allow uploading the same file again
        event.target.value = ""
      }
    },
    [images, onChange],
  )

  const handleDeleteImage = useCallback(
    (index: number) => {
      onChange(images.filter((_, i) => i !== index))
    },
    [images, onChange],
  )

  return (
    <div className="space-y-4">
      <Label htmlFor="images">Upload Images ({images.length})</Label>

      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="images"
          className="flex flex-col items-center justify-center w-full h-34 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
          </div>
          <Input
            id="images"
            type="file"
            className="hidden"
            onChange={handleImageUpload}
            multiple
            accept="image/*"
            aria-label="Upload apartment images"
          />
        </label>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                <Image
                  src={URL.createObjectURL(image.file) || "/placeholder.svg"}
                  alt={`Apartment image ${index + 1}`}
                   fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                  onLoad={() => {
                    // Clean up object URL after image loads to prevent memory leaks
                    const objectUrl = URL.createObjectURL(image.file)
                    return () => URL.revokeObjectURL(objectUrl)
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => handleDeleteImage(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none"
                aria-label={`Delete image ${index + 1}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

