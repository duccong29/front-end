"use client"

import { useEffect, useState } from "react"
import { useMyPosts } from "@/hooks/useMyPosts"
import type { Apartment } from "@/types/Apartment"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { RefreshCw, Home, MapPin, Calendar, User, Pencil, Trash2, Plus, RefreshCcw, XCircle, CirclePlus, AlertCircle, Search, } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { useDeleteApartment } from "@/hooks/useDeleteApartment"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog"
import { ArrowsPointingOutIcon } from "@heroicons/react/24/solid"
import { Input } from "@/components/ui/input"

export default function PostsPage() {
  const { toast } = useToast()
  const { myPosts, isLoading, error, refetch } = useMyPosts()
  const [isRefetching, setIsRefetching] = useState(false)
  const [deleteApartmentId, setDeleteApartmentId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const {
    deleteApartment,
    isDeleting,
    isSuccess: deleteSuccess,
    error: deleteError,
    resetState,
  } = useDeleteApartment({
    onSuccess: () => {
      refetch()
      setIsDeleteDialogOpen(false)
    },
  })

  const filteredApartments = myPosts.filter((apartment) =>
    apartment.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleRefresh = async () => {
    setIsRefetching(true)
    await refetch()
    setIsRefetching(false)
  }

  const handleDeleteClick = (id: string) => {
    setDeleteApartmentId(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!deleteApartmentId) return

    await deleteApartment(deleteApartmentId)
    setIsDeleteDialogOpen(false)
    setDeleteApartmentId(null)
  }

  useEffect(() => {
    if (deleteSuccess) {
      toast({
        title: "Delete Successful",
        description: "The apartment has been deleted successfully.",
        variant: "default",
        className: "bg-background border-green-500 dark:border-green-600",
        icon: <RefreshCcw className="h-10 w-10 text-green-500 dark:text-green-400" />,
        duration: 5000,
      })
      resetState()
    }
  }, [deleteSuccess, toast, resetState])

  useEffect(() => {
    if (deleteError) {
      toast({
        title: "Delete Failed",
        description: deleteError,
        variant: "destructive",
        className: "bg-background border-red-500 dark:border-red-600",
        icon: <XCircle className="h-10 w-10 text-red-500 dark:text-red-400" />,
        duration: 5000,
      })
      resetState()
    }
  }, [deleteError, toast, resetState])

  return (
    <TooltipProvider>
      <div className="p-10 min-h-screen bg-gradient-to-b from-sky-50 to-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Room</h1>
            <p className="text-muted-foreground mt-1">Manage and view all your rental</p>
          </div>

          <div className="flex gap-3 mt-4 sm:mt-0">
            <Link href={`/poster/apartments/add`}>
              <Button
                type="button"
                className="w-full bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-500 hover:to-indigo-600 text-white transition-all duration-300 ease-in-out rounded-lg"
              >
                <CirclePlus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </Link>
            <Button onClick={handleRefresh} variant="outline" disabled={isLoading || isRefetching}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefetching ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium text-red-800">Error loading your apartment</h3>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}
        {!isLoading && myPosts.length > 0 && (
         
            <div className="relative w-full md:w-auto mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full md:w-80 bg-white border-sky-300 focus:border-sky-300 focus:ring focus:ring-sky-500 focus:ring-opacity-50 rounded-lg"
          />
        </div>
        )}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[...Array(4)].map((_, index) => (
              <Card key={index} className="overflow-hidden border border-gray-200">
                <div className="relative h-52 bg-gray-100">
                  <Skeleton className="h-full w-full" />
                </div>
                <div className="p-5">
                  <Skeleton className="h-7 w-3/4 mb-3" />
                  <Skeleton className="h-5 w-1/2 mb-4" />
                  <div className="flex justify-between mb-4">
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-8 w-1/3" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </Card>
            ))}
          </div>
        ) : myPosts.length === 0 ? (
          <div className="text-center py-16 border rounded-lg bg-gray-50">
            <Home className="h-16 w-16 mx-auto text-gray-400" />
            <h3 className="mt-6 text-xl font-medium">No room found</h3>
            <p className="mt-2 text-muted-foreground max-w-md mx-auto">
              You have not created any room listings yet. Click the Add New Listing button to get started.
            </p>
            <Link href="/poster/apartments/add">
              <Button className="mt-6 bg-teal-600 hover:bg-teal-700">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Apartment
              </Button>
            </Link>
          </div>
        ) : filteredApartments.length === 0 ? (
          <div className="text-center py-16 border rounded-lg bg-gray-50">
            <Search className="h-16 w-16 mx-auto text-gray-400" />
            <h3 className="mt-6 text-xl font-medium">No results found</h3>
            <p className="mt-2 text-muted-foreground max-w-md mx-auto">
              No listings match your search term {searchTerm}. Try a different search or clear the search field.
            </p>
            <Button className="mt-6 bg-sky-600 hover:bg-sky-700" onClick={() => setSearchTerm("")}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
            {filteredApartments.map((apartment: Apartment) => (
              <Card
                key={apartment.id}
                className="group relative overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-md hover:border-teal-200"
              >
                <div className="relative h-52 bg-gray-100">
                  {apartment.images && apartment.images.length > 0 ? (
                    <Image
                      src={apartment.images[0].url || "/placeholder.svg"}
                      alt={apartment.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-100">
                      <Home className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                  <Badge className={`absolute top-3 right-3 ${apartment.status}`}>{apartment.status}</Badge>
                </div>

                <CardContent className="p-5">
                  <h3 className="text-xl font-semibold line-clamp-1 mb-1">{apartment.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 mr-1 text-teal-600" />
                    {apartment.location ? `${apartment.location.fullAddress}` : "Location not specified"}
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <p className="text-2xl font-bold text-teal-700">${apartment.price.toLocaleString()}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center text-sm bg-gray-100 px-2 py-1 rounded">
                        <ArrowsPointingOutIcon className="h-4 w-4 mr-1 text-teal-600" />
                        {apartment.area} m²
                      </div>
                      <div className="flex items-center text-sm bg-gray-100 px-2 py-1 rounded">
                        <Home className="h-4 w-4 mr-1 text-teal-600" />
                        {apartment.apartmentTypeName}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {apartment.userName || "NULL"}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDistanceToNow(new Date(apartment.createdDate), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                </CardContent>

                {/* Hover action buttons */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-3 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 translate-y-full transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={`/poster/apartments/${apartment.id}`} className="cursor-pointer">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="h-10 w-10 rounded-full bg-white hover:bg-teal-50"
                          asChild
                        >
                          <a>
                            <Pencil className="h-4 w-4 text-teal-700" />
                          </a>
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit apartment</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-10 w-10 rounded-full bg-white hover:bg-red-50"
                        onClick={() => handleDeleteClick(apartment.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete apartment</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
              </Card>
            ))}
          </div>
        )}
      </div>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the apartment type and remove it from our
              servers.
            </DialogDescription>
          </DialogHeader>
          {deleteError && <p className="text-red-500">{deleteError}</p>}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  )
}

