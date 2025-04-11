"use client"

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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { CirclePlus, Eye, Loader2, MoreHorizontal, Pencil, RefreshCcw, Search, Trash, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useFetchUsers } from "@/hooks/useFetchUsers"
import { useDeleteUser } from "@/hooks/useDeleteUser"

const UserPage = () => {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const { users, isLoading, error, refetch } = useFetchUsers()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null)

  const {
    deleteUser,
    isDeleting,
    isSuccess: deleteSuccess,
    error: deleteError,
    resetState,
  } = useDeleteUser({
    onSuccess: () => {
      refetch()
      setIsDeleteDialogOpen(false)
    },
  })

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.userName && user.userName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.firstName && user.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.lastName && user.lastName.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleDeleteClick = (id: string) => {
    setDeleteUserId(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!deleteUserId) return
    await deleteUser(deleteUserId)
  }

  useEffect(() => {
    if (deleteSuccess) {
      toast({
        title: "Delete Successful",
        description: "The user has been deleted successfully.",
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
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto backdrop-blur-sm bg-white/90 rounded-xl shadow-xl overflow-hidden border border-sky-100">
        <div className="p-6 bg-gradient-to-r from-sky-500 to-indigo-500">
          <h2 className="text-2xl font-bold text-white">User Management</h2>
          <p className="text-sky-100 mt-2">Manage and monitor user accounts</p>
        </div>

        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full md:w-80 bg-white border-sky-300 focus:border-sky-300 focus:ring focus:ring-sky-500 focus:ring-opacity-50 rounded-lg"
              />
            </div>
            <Link href="/admin/users/add">
              <Button
                type="button"
                className="w-full md:w-auto bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-500 hover:to-indigo-600 text-white transition-all duration-300 ease-in-out rounded-lg shadow-md hover:shadow-lg"
              >
                <CirclePlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-sky-50 overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-sky-50">
                  <TableRow>
                    <TableHead className="w-[25%] py-3">Email</TableHead>
                    <TableHead className="w-[15%] py-3">Username</TableHead>
                    <TableHead className="w-[20%] hidden md:table-cell py-3">Name</TableHead>
                    <TableHead className="w-[15%] hidden md:table-cell py-3">DOB</TableHead>
                    {/* <TableHead className="w-[10%] py-3">Status</TableHead> */}
                    <TableHead className="w-[10%] py-3">Role</TableHead>
                    <TableHead className="w-[15%] text-right py-3">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <div className="flex justify-center items-center">
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Loading users...
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        {searchTerm ? "No matching users found" : "No users available"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-sky-50/50 transition-colors duration-150">
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <span className="truncate">{user.email}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-600">{user.userName || "-"}</TableCell>
                        <TableCell className="hidden md:table-cell text-gray-600">
                          {user.firstName && user.lastName
                            ? `${user.firstName} ${user.lastName}`
                            : user.firstName || user.lastName || "-"}
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-gray-600">
                          {user.dob ? new Date(user.dob).toLocaleDateString() : "-"}
                        </TableCell>
                        {/* <TableCell>
                          <Badge
                            variant={user.status === "ACTIVE" ? "default" : "secondary"}
                            className={`
                              ${
                                user.status === "ACTIVE"
                                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                              }
                            `}
                          >
                            {user.status}
                          </Badge>
                        </TableCell> */}
                        <TableCell>
                          <div className="flex flex-wrap gap-2">
                            {user.roles?.length > 0 ? (
                              user.roles.map((role) => (
                                <Badge
                                  key={role.name}
                                  variant={role.name === "ADMIN" ? "destructive" : "outline"}
                                  className={`
                                    capitalize
                                    ${
                                      role.name === "ADMIN"
                                        ? "bg-red-100 text-red-800 hover:bg-red-200"
                                        : role.name === "USER"
                                        ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                        : "bg-green-100 text-green-800 hover:bg-green-200"
                                    }
                                    hover:scale-105 transition-transform
                                  `}
                                >
                                  {role.name}
                                </Badge>
                              ))
                            ) : (
                              <Badge variant="outline" className="bg-gray-100 text-gray-500 hover:bg-gray-200">
                                no roles
                              </Badge>
                            )}
                          </div>
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
                                <Link href={`/admin/users/${user.id}`}>Edit</Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDeleteClick(user.id)}
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

          {filteredUsers.length > 0 && (
            <div className="mt-4 text-sm text-gray-500 text-right">
              Showing {filteredUsers.length} of {users.length} users
            </div>
          )}
        </div>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the user account and remove it from our
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
    </div>
  )
}

export default UserPage

