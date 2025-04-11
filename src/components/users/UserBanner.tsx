"use client"
import Filters from "./Filters"
import type React from "react"

import { useRouter } from "next/navigation"
const UserBanner: React.FC = () => {
  const router = useRouter()

  const handleFilterChange = (filters: any) => {
    const query = new URLSearchParams({
      ...filters,
      page: "1",
      size: "4",
    }).toString()
    router.push(`/apartments/filtered?${query}`)
  }
  
  return (
    <div className="w-full">
      <div className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 opacity-70 bg-[url('/images/baner.jpg')] bg-center bg-no-repeat bg-cover"></div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-center mb-6 animate-fade-in-up tracking-tight">
            Discover Your Dream Home
          </h1>
          <p className="text-xl sm:text-2xl text-center max-w-3xl mb-12 animate-fade-in-up animation-delay-200 font-light">
            Explore our curated selection of exquisite properties tailored to your lifestyle
          </p>
          <div className="w-full max-w-5xl bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-2xl p-4 animate-fade-in-up animation-delay-300 absolute bottom-0 mb-8">
            <Filters isVertical={false} onFilterSubmit={handleFilterChange} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserBanner

