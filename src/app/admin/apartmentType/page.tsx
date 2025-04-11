"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from "@/components/ui/badge"
import { CirclePlus, Eye, Loader2, MoreHorizontal, Pencil, RefreshCcw, Search, Trash, XCircle } from "lucide-react"

import { formatDistanceToNow } from "date-fns"
import { useDeleteApartmentType } from "@/hooks/useDeleteApartmentType"
import { useToast } from "@/hooks/use-toast"
import { useFetchApartmentTypes } from "@/hooks/useFetchApartmentTypes"
import Pagination from "@/components/users/Pagination"

const ApartmentTypePage: React.FC = () => {
  const { toast } = useToast(); 
  const [searchTerm, setSearchTerm] = useState("")
  const { apartmentTypes, page, totalPages, setPage,isLoading, error, refetch } = useFetchApartmentTypes()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deleteApartmentTypeId, setDeleteApartmentTypeId] = useState<string | null>(null);

  const {deleteApartmentType, isDeleting, isSuccess: deleteSuccess,error: deleteError, resetState} = useDeleteApartmentType({
      onSuccess: () => {
        refetch();
        setIsDeleteDialogOpen(false);
    }});

  // Filter apartment types based on search term
  const filteredApartmentTypes = apartmentTypes.filter(
    (type) =>
      type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      type.userName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteClick = (id: string) => {
    setDeleteApartmentTypeId(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!deleteApartmentTypeId) return;

    await deleteApartmentType(deleteApartmentTypeId);
    setIsDeleteDialogOpen(false);
    setDeleteApartmentTypeId(null);
  }

   useEffect(() => {
      if (deleteSuccess) {
        toast({
          title: "Delete Successful",
          description: "The apartment type has been deleted successfully.",
          variant: "default",
          className: "bg-background border-green-500 dark:border-green-600",
          icon: <RefreshCcw className="h-10 w-10 text-green-500 dark:text-green-400" />,
          duration: 5000,
        });
        resetState();
      }
    }, [deleteSuccess, toast, resetState]);
  
    useEffect(() => {
      if (deleteError) {
        toast({
          title: "Delete Failed",
          description: deleteError,
          variant: "destructive",
          className: "bg-background border-red-500 dark:border-red-600",
          icon: <XCircle className="h-10 w-10 text-red-500 dark:text-red-400" />,
          duration: 5000,
        });
        resetState();
      }
    }, [deleteError, toast, resetState]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto backdrop-blur-sm bg-white/90 rounded-xl shadow-xl overflow-hidden border border-sky-100">
        <div className="p-6 bg-gradient-to-r from-sky-500 to-indigo-500">
          <h2 className="text-2xl font-bold text-white">Apartment Type Management</h2>
          <p className="text-sky-100 mt-2">Manage and monitor apartment type listings</p>
        </div>

        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by name or username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full md:w-80 bg-white border-sky-300 focus:border-sky-300 focus:ring focus:ring-sky-500 focus:ring-opacity-50 rounded-lg"
              />
            </div>
            <Link href="/admin/apartmentType/add">
              <Button
                type="button"
                className="w-full md:w-auto bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-500 hover:to-indigo-600 text-white transition-all duration-300 ease-in-out rounded-lg shadow-md hover:shadow-lg"
              >
                <CirclePlus />
                Add 
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-sky-50 overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-sky-50">
                  <TableRow>
                    <TableHead className="w-[30%] py-3">Name</TableHead>
                    <TableHead className="w-[20%] hidden md:table-cell py-3">Username</TableHead>
                    <TableHead className="w-[15%] py-3">Status</TableHead>
                    <TableHead className="w-[20%] py-3">Created</TableHead>
                    <TableHead className="w-[15%] text-right py-3">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="flex justify-center items-center">
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Loading apartment types...
                      </div>
                    </TableCell>
                  </TableRow>
                  ) :filteredApartmentTypes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        {searchTerm ? "No matching apartment types found" : "No apartment types available"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredApartmentTypes.map((apartmentType) => (
                      <TableRow key={apartmentType.id} className="hover:bg-sky-50/50 transition-colors duration-150">
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <span className="truncate">{apartmentType.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-gray-600">{apartmentType.userName}</TableCell>
                        <TableCell>
                          <Badge
                            variant={apartmentType.status === "AVAILABLE" ? "default" : "secondary"}
                            className={`
                                ${
                                  apartmentType.status === "AVAILABLE"
                                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                }
                              `}
                          >
                            {apartmentType.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {formatDistanceToNow(new Date(apartmentType.createdDate), {
                            addSuffix: true,
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[160px]">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem className="cursor-pointer">
                                <Eye className="mr-2 h-4 w-4 text-gray-500" />
                                <span>View details</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <Pencil className="mr-2 h-4 w-4 text-blue-500" />
                                <Link href={`/admin/apartmentType/${apartmentType.id}`}>Edit</Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDeleteClick(apartmentType.id)}
                                className="text-red-600 cursor-pointer focus:text-red-700 focus:bg-red-50"
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="flex items-center justify-end space-x-2 mt-2">
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription> 
              This action cannot be undone. This will permanently delete the apartment type and remove it from our servers.
            </DialogDescription>
          </DialogHeader>
          {deleteError && <p className="text-red-500">{deleteError}</p>}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ApartmentTypePage

