"use client"

import type React from "react"
import { useCallback, useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import type { Apartment } from "@/types/Apartment"
import Filters from "@/components/users/Filters"
import ApartmentList from "@/components/users/ApartmentList"
import Pagination from "@/components/users/Pagination"

const Filtered: React.FC = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [apartments, setApartments] = useState<Apartment[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalElements, setTotalElements] = useState(0)
  const [notFound, setNotFound] = useState(false)
  const [filters, setFilters] = useState({
    title: searchParams.get("title") || "",
    priceMin: searchParams.get("priceMin") || "",
    priceMax: searchParams.get("priceMax") || "",
    apartmentTypeName: searchParams.get("apartmentTypeName") || "",
  })

  const fetchApartments = useCallback(async () => {
    const queryParams = new URLSearchParams()
    queryParams.set("page", page.toString())
    queryParams.set("size", "4")

    // Add filter parameters
    if (filters.title) queryParams.set("title", filters.title)
    if (filters.priceMin) queryParams.set("priceMin", filters.priceMin)
    if (filters.priceMax) queryParams.set("priceMax", filters.priceMax)
    if (filters.apartmentTypeName) queryParams.set("apartmentTypeName", filters.apartmentTypeName)

    const response = await fetch(`/api/apartments/filter?${queryParams.toString()}`, {
      
    })

    if (response.ok) {
      const result = await response.json()
      setApartments(result.data)
      setTotalElements(result.totalElements)
      setTotalPages(result.totalPages)
      console.log("dữ liệu API: ", result)

      if (result.data.length === 0) {
        setNotFound(true)
      } else {
        setNotFound(false)
      }

    } else {
      console.error("Error fetching apartments")
      setNotFound(true)
    }
  }, [page, filters])

  const handleFilterSubmit = (newFilters: any) => {
    setFilters(newFilters)
    setPage(1)

    const queryParams = new URLSearchParams()
    if (newFilters.title) queryParams.set("title", newFilters.title)
    if (newFilters.priceMin) queryParams.set("priceMin", newFilters.priceMin)
    if (newFilters.priceMax) queryParams.set("priceMax", newFilters.priceMax)
    if (newFilters.apartmentTypeName) queryParams.set("apartmentTypeName", newFilters.apartmentTypeName)
    queryParams.set("page", "1")
    queryParams.set("size", "4")

    router.push(`/apartments/filtered?${queryParams.toString()}`)
  }

  useEffect(() => {
    fetchApartments()
  }, [fetchApartments])

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-6 my-20 mx-12">
      <div className="w-full max-w-sm border-border/40 shadow-sm">
        <Filters isVertical={true} onFilterSubmit={handleFilterSubmit} />
      </div>
      <main className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notFound ? (
          <div className="col-span-full text-center text-gray-500">
            <p className="text-lg font-medium">Không tìm thấy sản phẩm phù hợp.</p>
          </div>
        ) : (
          <>
            <div className="lg:col-span-9 flex justify-between items-center col-span-full">
              <p className="text-lg font-medium">{totalElements} Results Found</p>
              <div className="flex gap-2 items-end">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            </div>
            <div className="lg:col-span-9">
              <ApartmentList apartments={apartments} orientation="horizontal" />
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default Filtered

