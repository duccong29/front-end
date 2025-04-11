// src/app/admin/apartments/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { CirclePlus, Eye, Loader2, MoreHorizontal, Pencil, RefreshCcw, Search, Trash, XCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { formatDistanceToNow} from 'date-fns';
import Image from 'next/image';
import { ApartmentCarousel } from '@/components/users/ApartmentCarousel';
import { useApartments } from '@/hooks/useFetchApartment';
import Pagination from '@/components/users/Pagination';
import { useDeleteApartment } from '@/hooks/useDeleteApartment';
import { useToast } from '@/hooks/use-toast';
import { Apartment } from '@/types/Apartment';
import { Badge } from '@/components/ui/badge';

const ApartmentPage: React.FC = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deleteApartmentId, setDeleteApartmentId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedListing, setSelectedListing] = useState<Apartment | null>(null);
  const { toast } = useToast(); 
  const {apartments, page, totalPages, isLoading, error, setPage, refetch  } = useApartments(1, "All");
  const {deleteApartment, isDeleting, isSuccess: deleteSuccess,error: deleteError,resetState} = useDeleteApartment({
      onSuccess: () => {
      refetch();
      setIsDeleteDialogOpen(false);
    }});
  
  const filteredApartment = apartments.filter(
    (type) =>
      type.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      type.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )  

  const handleDeleteClick = (id: string) => {
    setDeleteApartmentId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteApartmentId) return;

    await deleteApartment(deleteApartmentId);
    setIsDeleteDialogOpen(false);
    setDeleteApartmentId(null);
  };

  useEffect(() => {
    if (deleteSuccess) {
      toast({
        title: "Delete Successful",
        description: "The apartment has been deleted successfully.",
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
    
    <div className="p-6 min-h-screen bg-gradient-to-b from-sky-50 to-white">
      
      <div className="max-w-6xl mx-auto backdrop-blur-sm bg-white/80 rounded-xl shadow-lg overflow-hidden border border-sky-100">
        <div className="p-6 bg-gradient-to-r from-sky-500 to-indigo-500">
          <h2 className="text-2xl font-bold text-white">Apartment Management</h2>
          <p className="text-sky-100 mt-2">Manage and monitor apartment listings</p>
        </div>
        <div className="p-4 md:p-6">  
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by title or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full md:w-80 bg-white border-sky-300 focus:border-sky-300 focus:ring focus:ring-sky-500 focus:ring-opacity-50 rounded-lg"
              />
            </div>
            <Link href="/admin/apartments/add">
              <Button
                type="button"
                className="w-full bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-500 hover:to-indigo-600 text-white transition-all duration-300 ease-in-out rounded-lg"
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
                <TableHead className="w-[80px] py-3">Images</TableHead> 
                <TableHead className="w-[180px] py-3">Title</TableHead> 
                <TableHead className="w-[100px] py-3">Price</TableHead> 
                <TableHead className="min-w-[150px] max-w-[200px] py-3">Address</TableHead> 
                <TableHead className="w-[100px] py-3">Status</TableHead> 
                <TableHead className="w-[120px] hidden md:table-cell py-3">Username</TableHead> 
                <TableHead className="w-[120px] py-3">CreateDate</TableHead> 
                <TableHead className="w-[80px] py-3">Actions</TableHead> 
              </TableRow>
            </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex justify-center items-center">
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Loading apartment...
                      </div>
                    </TableCell>
                  </TableRow>
                  ) : filteredApartment.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                        {searchTerm ? "No matching apartment found" : "No apartment available"}
                      </TableCell>
                    </TableRow>
                ) : (
                  filteredApartment.map((apartment) => (
                    <TableRow key={apartment.id} className="hover:bg-sky-50/50 transition-colors duration-150">
                      <TableCell>
                        <div
                          className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md"
                          onClick={() => setSelectedListing(apartment)}
                        >
                          <Image
                            src={apartment.images[0].url}
                            alt={apartment.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                            className="object-cover"
                          />
                          {apartment.images.length > 1 && (
                            <div className="absolute bottom-0 right-0 bg-background/80 text-xs px-1 rounded-tl-md">
                              +{apartment.images.length - 1}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                        {apartment.title}
                      </TableCell>
                      {/* <p className=" font-bold text-teal-700">${apartment.price.toLocaleString()}</p> */}
                      <TableCell className=" font-bold text-red-500">{apartment.price.toLocaleString()}</TableCell>
                      
                      <TableCell className="hidden md:table-cell max-w-[200px] truncate"> 
                        {apartment.location?.fullAddress}
                      </TableCell>
                      <TableCell>
                          <Badge
                            variant={apartment.status === "AVAILABLE" ? "default" : "secondary"}
                            className={`
                                ${
                                  apartment.status === "AVAILABLE"
                                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                }
                              `}
                          >
                            {apartment.status || "NULL"}
                          </Badge>
                      </TableCell>
                      <TableCell>{apartment.userName || "NULL"}</TableCell>
                      <TableCell className="hidden md:table-cell">
                          {formatDistanceToNow(new Date(apartment.createdDate), {
                            addSuffix: true,
                          })}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4"/>
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
                              <Link href={`/admin/apartments/${apartment.id}`}> Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDeleteClick(apartment.id)} 
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
          <div>
       {selectedListing && <ImageGalleryModal images={selectedListing.images} onClose={() => setSelectedListing(null)} />}
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

  );
};

export default ApartmentPage;

const ImageGalleryModal = ({
  images,
  onClose,
}: {
  images: { url: string }[]
  onClose: () => void
}) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Image Gallery</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <ApartmentCarousel images={images} />
        </div>
      </DialogContent>
    </Dialog>
  )
}