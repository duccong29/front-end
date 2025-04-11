"use client"

import { useState } from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { CalendarIcon, Edit, Eye, Filter, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Sample announcement data
const sampleAnnouncements = [
  {
    id: 1,
    title: "System Maintenance",
    content: "The system will be down for maintenance on Saturday from 2 AM to 4 AM EST.",
    status: "active",
    priority: "high",
    audience: "all",
    startDate: new Date(2023, 9, 15),
    endDate: new Date(2023, 9, 20),
    createdBy: "Admin User",
    createdAt: new Date(2023, 9, 10),
  },
  {
    id: 2,
    title: "New Feature: Virtual Tours",
    content: "We've added virtual tours for all apartment listings. Check it out!",
    status: "active",
    priority: "medium",
    audience: "tenants",
    startDate: new Date(2023, 9, 12),
    endDate: new Date(2023, 10, 12),
    createdBy: "Admin User",
    createdAt: new Date(2023, 9, 8),
  },
  {
    id: 3,
    title: "Holiday Office Hours",
    content: "Our office will be closed during the upcoming holidays. For emergencies, please call our 24/7 hotline.",
    status: "scheduled",
    priority: "medium",
    audience: "all",
    startDate: new Date(2023, 11, 20),
    endDate: new Date(2024, 0, 5),
    createdBy: "Admin User",
    createdAt: new Date(2023, 9, 5),
  },
  {
    id: 4,
    title: "Rent Payment Reminder",
    content: "This is a friendly reminder that rent payments are due on the 1st of each month.",
    status: "draft",
    priority: "low",
    audience: "tenants",
    startDate: null,
    endDate: null,
    createdBy: "Admin User",
    createdAt: new Date(2023, 9, 1),
  },
  {
    id: 5,
    title: "Building Inspection Notice",
    content: "Annual building inspections will be conducted next week. Please ensure access to your unit.",
    status: "expired",
    priority: "high",
    audience: "tenants",
    startDate: new Date(2023, 8, 1),
    endDate: new Date(2023, 8, 15),
    createdBy: "Admin User",
    createdAt: new Date(2023, 7, 25),
  },
]

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    active: "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400",
    scheduled: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-400",
    draft: "border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400",
    expired: "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400",
  }

  return (
    <span
      className={`inline-flex items-center rounded-none border px-2 py-0.5 text-xs font-semibold ${statusStyles[status as keyof typeof statusStyles]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

// Priority badge component
const PriorityBadge = ({ priority }: { priority: string }) => {
  const priorityStyles = {
    high: "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-400",
    medium: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-400",
    low: "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400",
  }

  return (
    <span
      className={`inline-flex items-center rounded-none border px-2 py-0.5 text-xs font-semibold ${priorityStyles[priority as keyof typeof priorityStyles]}`}
    >
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  )
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState(sampleAnnouncements)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [audienceFilter, setAudienceFilter] = useState("all")
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  // New announcement form state
  const [newTitle, setNewTitle] = useState("")
  const [newContent, setNewContent] = useState("")
  const [newPriority, setNewPriority] = useState("medium")
  const [newAudience, setNewAudience] = useState("all")
  const [newStartDate, setNewStartDate] = useState<Date | undefined>(undefined)
  const [newEndDate, setNewEndDate] = useState<Date | undefined>(undefined)
  const [newStatus, setNewStatus] = useState("draft")

  // Filter announcements based on search query and filters
  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || announcement.status === statusFilter
    const matchesAudience = audienceFilter === "all" || announcement.audience === audienceFilter

    return matchesSearch && matchesStatus && matchesAudience
  })

  // Handle creating a new announcement
  const handleCreateAnnouncement = () => {
    const newAnnouncement = {
      id: announcements.length + 1,
      title: newTitle,
      content: newContent,
      status: newStatus,
      priority: newPriority,
      audience: newAudience,
      startDate: newStartDate || null,
      endDate: newEndDate || null,
      createdBy: "Admin User",
      createdAt: new Date(),
    }

    setAnnouncements([newAnnouncement, ...announcements])

    // Reset form
    setNewTitle("")
    setNewContent("")
    setNewPriority("medium")
    setNewAudience("all")
    setNewStartDate(undefined)
    setNewEndDate(undefined)
    setNewStatus("draft")
  }

  // Handle deleting an announcement
  const handleDeleteAnnouncement = () => {
    if (selectedAnnouncement) {
      setAnnouncements(announcements.filter((a) => a.id !== selectedAnnouncement.id))
      setIsDeleteOpen(false)
      setSelectedAnnouncement(null)
    }
  }

  return (
    <SidebarProvider>
      {/* <AdminSidebar /> */}
      <SidebarInset className="bg-background">
        <div className="flex-1 space-y-6 p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Announcements</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Announcement
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Announcement</DialogTitle>
                  <DialogDescription>
                    Create a new announcement to display to users. Fill out the form below and click save when you are
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter announcement title"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      placeholder="Enter announcement content"
                      className="min-h-[100px]"
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select value={newPriority} onValueChange={setNewPriority}>
                        <SelectTrigger id="priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="audience">Target Audience</Label>
                      <Select value={newAudience} onValueChange={setNewAudience}>
                        <SelectTrigger id="audience">
                          <SelectValue placeholder="Select audience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Users</SelectItem>
                          <SelectItem value="tenants">Tenants Only</SelectItem>
                          <SelectItem value="staff">Staff Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "justify-start text-left font-normal",
                              !newStartDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newStartDate ? format(newStartDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={newStartDate} onSelect={setNewStartDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="grid gap-2">
                      <Label>End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "justify-start text-left font-normal",
                              !newEndDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newEndDate ? format(newEndDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={newEndDate} onSelect={setNewEndDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="publish"
                      checked={newStatus === "active"}
                      onCheckedChange={(checked) => setNewStatus(checked ? "active" : "draft")}
                    />
                    <Label htmlFor="publish">Publish immediately</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setNewTitle("")
                      setNewContent("")
                      setNewPriority("medium")
                      setNewAudience("all")
                      setNewStartDate(undefined)
                      setNewEndDate(undefined)
                      setNewStatus("draft")
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateAnnouncement}>Save Announcement</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                <TabsTrigger value="draft">Drafts</TabsTrigger>
                <TabsTrigger value="expired">Expired</TabsTrigger>
              </TabsList>

              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search announcements..."
                    className="pl-8 w-[200px] md:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <div className="p-2">
                      <div className="mb-2">
                        <Label className="text-xs">Status</Label>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Filter by status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="expired">Expired</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-xs">Audience</Label>
                        <Select value={audienceFilter} onValueChange={setAudienceFilter}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Filter by audience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Audiences</SelectItem>
                            <SelectItem value="tenants">Tenants Only</SelectItem>
                            <SelectItem value="staff">Staff Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardContent className="p-0">
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs uppercase bg-muted/50">
                        <tr>
                          <th scope="col" className="px-4 py-3">
                            Title
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Status
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Priority
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Audience
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Date Range
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Created
                          </th>
                          <th scope="col" className="px-4 py-3 text-right">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAnnouncements.length > 0 ? (
                          filteredAnnouncements.map((announcement) => (
                            <tr key={announcement.id} className="border-b">
                              <td className="px-4 py-3 font-medium">{announcement.title}</td>
                              <td className="px-4 py-3">
                                <StatusBadge status={announcement.status} />
                              </td>
                              <td className="px-4 py-3">
                                <PriorityBadge priority={announcement.priority} />
                              </td>
                              <td className="px-4 py-3 capitalize">{announcement.audience}</td>
                              <td className="px-4 py-3">
                                {announcement.startDate && announcement.endDate ? (
                                  <span className="text-xs text-muted-foreground">
                                    {format(announcement.startDate, "MMM d, yyyy")} -{" "}
                                    {format(announcement.endDate, "MMM d, yyyy")}
                                  </span>
                                ) : (
                                  <span className="text-xs text-muted-foreground">Not scheduled</span>
                                )}
                              </td>
                              <td className="px-4 py-3">
                                <span className="text-xs text-muted-foreground">
                                  {format(announcement.createdAt, "MMM d, yyyy")}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setSelectedAnnouncement(announcement)
                                        setIsPreviewOpen(true)
                                      }}
                                    >
                                      <Eye className="mr-2 h-4 w-4" />
                                      Preview
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setSelectedAnnouncement(announcement)
                                        setIsEditOpen(true)
                                      }}
                                    >
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      className="text-red-600 focus:text-red-600"
                                      onClick={() => {
                                        setSelectedAnnouncement(announcement)
                                        setIsDeleteOpen(true)
                                      }}
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={7} className="px-4 py-6 text-center text-muted-foreground">
                              No announcements found matching your filters.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {filteredAnnouncements.length} of {announcements.length} announcements
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              <Card>
                <CardContent className="p-0">
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs uppercase bg-muted/50">
                        <tr>
                          <th scope="col" className="px-4 py-3">
                            Title
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Priority
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Audience
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Date Range
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Created
                          </th>
                          <th scope="col" className="px-4 py-3 text-right">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAnnouncements.filter((a) => a.status === "active").length > 0 ? (
                          filteredAnnouncements
                            .filter((a) => a.status === "active")
                            .map((announcement) => (
                              <tr key={announcement.id} className="border-b">
                                <td className="px-4 py-3 font-medium">{announcement.title}</td>
                                <td className="px-4 py-3">
                                  <PriorityBadge priority={announcement.priority} />
                                </td>
                                <td className="px-4 py-3 capitalize">{announcement.audience}</td>
                                <td className="px-4 py-3">
                                  {announcement.startDate && announcement.endDate ? (
                                    <span className="text-xs text-muted-foreground">
                                      {format(announcement.startDate, "MMM d, yyyy")} -{" "}
                                      {format(announcement.endDate, "MMM d, yyyy")}
                                    </span>
                                  ) : (
                                    <span className="text-xs text-muted-foreground">Not scheduled</span>
                                  )}
                                </td>
                                <td className="px-4 py-3">
                                  <span className="text-xs text-muted-foreground">
                                    {format(announcement.createdAt, "MMM d, yyyy")}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem
                                        onClick={() => {
                                          setSelectedAnnouncement(announcement)
                                          setIsPreviewOpen(true)
                                        }}
                                      >
                                        <Eye className="mr-2 h-4 w-4" />
                                        Preview
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() => {
                                          setSelectedAnnouncement(announcement)
                                          setIsEditOpen(true)
                                        }}
                                      >
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem
                                        className="text-red-600 focus:text-red-600"
                                        onClick={() => {
                                          setSelectedAnnouncement(announcement)
                                          setIsDeleteOpen(true)
                                        }}
                                      >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </td>
                              </tr>
                            ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">
                              No active announcements found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Similar content for other tabs (scheduled, draft, expired) would go here */}
            <TabsContent value="scheduled" className="space-y-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-medium">Scheduled Announcements</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    View and manage announcements scheduled for future publication.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="draft" className="space-y-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-medium">Draft Announcements</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    View and manage announcement drafts that have not been published yet.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="expired" className="space-y-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-medium">Expired Announcements</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    View and manage announcements that have passed their end date.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Announcement Preview</DialogTitle>
          </DialogHeader>
          {selectedAnnouncement && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StatusBadge status={selectedAnnouncement.status} />
                  <PriorityBadge priority={selectedAnnouncement.priority} />
                </div>
                <div className="text-xs text-muted-foreground">
                  Created on {format(selectedAnnouncement.createdAt, "MMM d, yyyy")}
                </div>
              </div>

              <div className="border-b pb-2">
                <h2 className="text-xl font-bold">{selectedAnnouncement.title}</h2>
                <p className="text-sm text-muted-foreground">
                  Target: <span className="capitalize">{selectedAnnouncement.audience}</span>
                </p>
              </div>

              <div className="py-2">
                <p className="whitespace-pre-line">{selectedAnnouncement.content}</p>
              </div>

              {selectedAnnouncement.startDate && selectedAnnouncement.endDate && (
                <div className="text-sm text-muted-foreground border-t pt-2">
                  Display period: {format(selectedAnnouncement.startDate, "MMM d, yyyy")} -{" "}
                  {format(selectedAnnouncement.endDate, "MMM d, yyyy")}
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsPreviewOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Announcement</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this announcement? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedAnnouncement && (
            <div className="py-4">
              <h3 className="font-medium">{selectedAnnouncement.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{selectedAnnouncement.content}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAnnouncement}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog would go here - similar to the create form but pre-populated */}
    </SidebarProvider>
  )
}

