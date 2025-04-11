"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useDebouncedCallback } from "use-debounce"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useFetchApartmentTypes } from "@/hooks/useFetchApartmentTypes"
import { Search, SlidersHorizontal, RotateCcw } from "lucide-react"
import { Separator } from "../ui/separator"

const priceOptions = ["1000000", "2000000", "3000000", "4000000", "5000000", "6000000", "7000000", "8000000", "900000+"]

interface FiltersPageProps {
  isVertical?: boolean
  onFilterSubmit: (filters: any) => void
}

const FiltersPage: React.FC<FiltersPageProps> = ({ isVertical = true, onFilterSubmit }) => {
  const { apartmentTypes } = useFetchApartmentTypes()
  const [filterRequest, setFilterRequest] = useState({
    title: "",
    priceMin: "",
    priceMax: "",
    apartmentTypeName: "",
  })
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isFilterVisible, setIsFilterVisible] = useState(true)
  const [priceRange, setPriceRange] = useState<number[]>([0, 9000000])

  // Debounce API call for suggestions
  const fetchSuggestions = useDebouncedCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([])
      return
    }

    try {
      const res = await fetch(`/api/suggestions?prefix=${encodeURIComponent(query)}`)
      if (!res.ok) throw new Error("Failed to fetch suggestions")
      const data = await res.json()
      setSuggestions(data)
    } catch (error) {
      console.error("Failed to fetch suggestions:", error)
      setSuggestions([])
    }
  }, 300)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilterRequest({ ...filterRequest, [name]: value })

    if (name === "title") {
      fetchSuggestions(value)
      setShowSuggestions(true)
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFilterRequest({ ...filterRequest, [name]: value })
  }

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values)
    setFilterRequest({
      ...filterRequest,
      priceMin: values[0].toString(),
      priceMax: values[1].toString(),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuggestions(false)
    onFilterSubmit(filterRequest)
  }

  const handleReset = () => {
    setFilterRequest({
      title: "",
      priceMin: "",
      priceMax: "",
      apartmentTypeName: "",
    })
    setPriceRange([0, 9000000])
  }

  useEffect(() => {
    const handleClickOutside = () => setShowSuggestions(false)
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const renderSuggestions = () => {
    if (!showSuggestions || suggestions.length === 0) return null

    return (
      <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
        {suggestions.map((item, index) => (
          <li
            key={index}
            className={`px-4 py-2.5 hover:bg-${isVertical ? "primary" : "blue"}-50 cursor-pointer text-gray-700 border-b border-gray-100 last:border-b-0 transition-colors duration-150 flex items-center`}
            onClick={(e) => {
              e.stopPropagation()
              setFilterRequest({ ...filterRequest, title: item })
              setShowSuggestions(false)
            }}
          >
            <Search className="h-4 w-4 mr-2 text-gray-400" />
            {item}
          </li>
        ))}
      </ul>
    )
  }

  if (isVertical) {
    return (
      <div className="filters-wrapper">
        <form
          onSubmit={handleSubmit}
          className="filters-container flex flex-col space-y-6 p-6 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-gray-800">Find Your Dream Home</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFilterVisible(!isFilterVisible)}
              className="h-8 w-8 rounded-full"
              type="button"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>

          <div className="w-full relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                id="title"
                name="title"
                value={filterRequest.title}
                onChange={handleInputChange}
                onClick={(e) => e.stopPropagation()}
                placeholder="Enter location, property name..."
                className="pl-10 bg-white border border-gray-200 text-gray-800 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent h-11"
              />
            </div>
            {renderSuggestions()}
          </div>

          {isFilterVisible && (
            <>
              <div className="w-full">
                <Label className="text-sm font-medium mb-1.5 block text-gray-700">
                  Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                </Label>
                <Slider
                  defaultValue={[0, 9000000]}
                  value={priceRange}
                  min={0}
                  max={9000000}
                  step={100000}
                  onValueChange={handlePriceRangeChange}
                  className="mt-2"
                />
                <div className="flex justify-between mt-1.5 text-xs text-gray-500">
                  <span>$0</span>
                  <span>$9M+</span>
                </div>
              </div>
              <Separator />
              <div className="w-full">
                <Label className="text-sm font-medium mb-1.5 block text-gray-700">Property Type</Label>
                <Select
                  value={filterRequest.apartmentTypeName}
                  onValueChange={(value) => handleSelectChange("apartmentTypeName", value)}
                >
                  <SelectTrigger className="bg-white border border-gray-200 shadow-sm h-11">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    {apartmentTypes.map((type) => (
                      <SelectItem key={type.id} value={type.name}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Separator />
            </>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              variant="default"
              className="flex-1 bg-gradient-to-r from-blue-500 to-teal-400 hover:from-indigo-600 hover:to-cyan-500 text-white font-medium transition-all duration-300 ease-in-out py-2.5"
            >
              <Search className="h-4 w-4 mr-2" />
              Find Properties
            </Button>

            {isFilterVisible && (
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="px-4 border-gray-300 hover:bg-gray-50"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            )}
          </div>
        </form>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
      <div className="lg:col-span-2 relative">
        <Input
          type="text"
          id="title"
          name="title"
          value={filterRequest.title}
          onChange={handleInputChange}
          onClick={(e) => e.stopPropagation()}
          placeholder="Search by title or descriptions"
        />
        {renderSuggestions()}
      </div>

      <div>
        <Select onValueChange={(value) => handleSelectChange("priceMin", value)} value={filterRequest.priceMin}>
          <SelectTrigger id="minPrice">
            <SelectValue placeholder="Min Price" />
          </SelectTrigger>
          <SelectContent>
            {priceOptions.map((price) => (
              <SelectItem key={`low-${price}`} value={price}>
                {price}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Select onValueChange={(value) => handleSelectChange("priceMax", value)} value={filterRequest.priceMax}>
          <SelectTrigger id="maxPrice">
            <SelectValue placeholder="Max Price" />
          </SelectTrigger>
          <SelectContent>
            {priceOptions.map((price) => (
              <SelectItem key={`high-${price}`} value={price}>
                {price}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Select
          onValueChange={(value) => handleSelectChange("apartmentTypeName", value)}
          value={filterRequest.apartmentTypeName}
        >
          <SelectTrigger id="type">
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            {apartmentTypes.map((type) => (
              <SelectItem key={type.id} value={type.name}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-center lg:col-span-6">
        <Button
          type="submit"
          variant="default"
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-teal-400 hover:from-indigo-600 hover:to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          <Search className="h-5 w-5 mr-2" />
          Find Your Perfect Home
        </Button>
      </div>
    </form>
  )
}

export default FiltersPage

