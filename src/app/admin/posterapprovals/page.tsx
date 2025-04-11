"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { Loader2, Search, MoreHorizontal, Eye, CheckCircle2, XCircle, RefreshCcw } from "lucide-react"
import { useFetchApprovalPosters } from "@/hooks/useFetchApprovalPosters"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

export default function PosterApprovalsPage() {
  const { toast } = useToast()
  const { posterApprovals, isLoading, error, refetch } = useFetchApprovalPosters()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentTab, setCurrentTab] = useState("all")
  const [actionLoading, setActionLoading] = useState(false)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [adminNote, setAdminNote] = useState("")
  const [currentAction, setCurrentAction] = useState<{
    type: "approve" | "reject" | "revoke" | "manual-approve"
    posterId: string
  } | null>(null)

  const filteredPosters = posterApprovals.filter((poster) => {
    const matchesTab = currentTab === "all" || poster.status === currentTab.toUpperCase()
    const matchesSearch =
      poster.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      poster.userId.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTab && matchesSearch
  })

  const handleActionClick = (type: "approve" | "reject" | "revoke" | "manual-approve", posterId: string) => {
    setCurrentAction({ type, posterId })
    setAdminNote("")
    setIsDialogOpen(true)
  }

  const handleActionSubmit = async () => {
    if (!currentAction) return

    setActionLoading(true)
    try {
      let response

      switch (currentAction.type) {
        case "approve":
        case "reject":
          response = await fetch(`/api/poster/approve/${currentAction.posterId}`, {
            method: "POST",
            body: JSON.stringify({
              adminNote,
              approved: currentAction.type === "approve" ? true : false,
            }),
          })
          break

        case "revoke":
          response = await fetch(`/api/poster/revoke/${currentAction.posterId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ adminNote }),
          })
          break

        case "manual-approve":
          response = await fetch(`/api/poster/manual-approve/${currentAction.posterId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ adminNote }),
          })
          break
      }

      if (!response?.ok) {
        const errorData = await response?.json().catch(() => null)
        throw new Error(errorData?.error || `Failed to ${currentAction.type} poster`)
      }

      toast({
        title: "Success",
        description: `Poster has been ${
          currentAction.type === "approve"
            ? "approved"
            : currentAction.type === "reject"
              ? "rejected"
              : currentAction.type === "revoke"
                ? "revoked"
                : "manually approved"
        } successfully.`,
        variant: "default",
        className: "bg-background border-green-500 dark:border-green-600",
        icon: <RefreshCcw className="h-10 w-10 text-green-500 dark:text-green-400" />,
                duration: 5000,
      })

      // Refresh the data
      refetch()
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
        className: "bg-background border-red-500 dark:border-red-600",
        icon: <XCircle className="h-10 w-10 text-red-500 dark:text-red-400" />,
        duration: 5000,
      })
    } finally {
      setActionLoading(false)
      setIsDialogOpen(false)
      setCurrentAction(null)
    }
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <div className="max-w-6xl mx-auto backdrop-blur-sm bg-white/80 rounded-xl shadow-lg overflow-hidden border border-sky-100">
        <div className="p-6 bg-gradient-to-r from-sky-500 to-indigo-500">
          <h1 className="text-2xl font-bold text-white">Poster Approvals</h1>
          <p className="text-sky-100 mt-2">Manage and monitor poster approval requests</p>
        </div>

        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <Tabs defaultValue="all" onValueChange={setCurrentTab} className="w-full md:w-auto">
              <TabsList className="grid grid-cols-5 bg-sky-50 p-1">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-white data-[state=active]:text-sky-700 data-[state=active]:shadow-sm"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="data-[state=active]:bg-white data-[state=active]:text-sky-700 data-[state=active]:shadow-sm"
                >
                  Pending
                </TabsTrigger>
                <TabsTrigger
                  value="approved"
                  className="data-[state=active]:bg-white data-[state=active]:text-sky-700 data-[state=active]:shadow-sm"
                >
                  Approved
                </TabsTrigger>
                <TabsTrigger
                  value="rejected"
                  className="data-[state=active]:bg-white data-[state=active]:text-sky-700 data-[state=active]:shadow-sm"
                >
                  Rejected
                </TabsTrigger>
                <TabsTrigger
                  value="revoked"
                  className="data-[state=active]:bg-white data-[state=active]:text-sky-700 data-[state=active]:shadow-sm"
                >
                  Revoked
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search posters..."
                className="pl-10 pr-4 py-2 w-full md:w-80 bg-white border-sky-300 focus:border-sky-300 focus:ring focus:ring-sky-500 focus:ring-opacity-50 rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-sky-50 overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-sky-50">
                  <TableRow>
                    <TableHead className="w-[120px] py-3">ID</TableHead>
                    <TableHead className="py-3">User ID</TableHead>
                    <TableHead className="w-[100px] py-3">Status</TableHead>
                    <TableHead className="w-[120px] py-3">Created At</TableHead>
                    <TableHead className="w-[120px] py-3">Approval Date</TableHead>
                    <TableHead className="py-3">Admin Note</TableHead>
                    <TableHead className="w-[100px] py-3">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        <div className="flex items-center justify-center gap-2 text-gray-500">
                          <Loader2 className="h-6 w-6 animate-spin" />
                          Loading posters...
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : filteredPosters.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                        No posters found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPosters.map((poster) => (
                      <TableRow key={poster.id} className="hover:bg-sky-50/50 transition-colors duration-150">
                        <TableCell className="font-medium">{poster.id}</TableCell>
                        <TableCell>{poster.userId}</TableCell>
                        <TableCell>
                          <Badge
                            className={`
                              ${
                                poster.status === "APPROVED"
                                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                                  : poster.status === "REJECTED"
                                    ? "bg-red-100 text-red-800 hover:bg-red-200"
                                    : poster.status === "REVOKED"
                                      ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                              }
                            `}
                          >
                            {poster.status.charAt(0) + poster.status.slice(1).toLowerCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>{format(new Date(poster.createdAt), "MMM dd, yyyy")}</TableCell>
                        <TableCell>
                          {poster.approvalDate ? format(new Date(poster.approvalDate), "MMM dd, yyyy") : "-"}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">{poster.adminNote || "-"}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[160px]">
                              <DropdownMenuItem className="cursor-pointer">
                                <Eye className="mr-2 h-4 w-4 text-gray-500" />
                                <span>View Details</span>
                              </DropdownMenuItem>
                              {poster.status === "PENDING" && (
                                <>
                                  <DropdownMenuItem
                                    className="cursor-pointer text-green-600 focus:text-green-700 focus:bg-green-50"
                                    onClick={() => handleActionClick("approve", poster.id)}
                                  >
                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50"
                                    onClick={() => handleActionClick("reject", poster.id)}
                                  >
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Reject
                                  </DropdownMenuItem>
                                </>
                              )}
                              {poster.status === "APPROVED" && (
                                <DropdownMenuItem
                                  className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50"
                                  onClick={() => handleActionClick("revoke", poster.id)}
                                >
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Revoke
                                </DropdownMenuItem>
                              )}
                              {poster.status === "REJECTED" && (
                                <DropdownMenuItem
                                  className="cursor-pointer text-green-600 focus:text-green-700 focus:bg-green-50"
                                  onClick={() => handleActionClick("manual-approve", poster.id)}
                                >
                                  <CheckCircle2 className="mr-2 h-4 w-4" />
                                  Approve
                                </DropdownMenuItem>
                              )}
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
        </div>
      </div>

      {/* Admin Note Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {currentAction?.type === "approve"
                ? "Approve Poster"
                : currentAction?.type === "reject"
                  ? "Reject Poster"
                  : currentAction?.type === "revoke"
                    ? "Revoke Approval"
                    : "Manually Approve Poster"}
            </DialogTitle>
            <DialogDescription>
              {currentAction?.type === "approve"
                ? "Add a note for approving this poster."
                : currentAction?.type === "reject"
                  ? "Please provide a reason for rejecting this poster."
                  : currentAction?.type === "revoke"
                    ? "Please provide a reason for revoking the approval."
                    : "Add a note for manually approving this poster."}
            </DialogDescription>
          </DialogHeader>

          <Textarea
            placeholder="Enter admin note..."
            value={adminNote}
            onChange={(e) => setAdminNote(e.target.value)}
            className="min-h-[100px] border-sky-300 focus:border-sky-300 focus:ring focus:ring-sky-500 focus:ring-opacity-50"
          />

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="border-sky-300 text-sky-700 hover:bg-sky-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleActionSubmit}
              disabled={actionLoading}
              className={`${
                currentAction?.type === "reject" || currentAction?.type === "revoke"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-500 hover:to-indigo-600"
              } text-white transition-all duration-300 ease-in-out`}
            >
              {actionLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
