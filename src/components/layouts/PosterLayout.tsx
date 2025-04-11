import type React from "react"
import {
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Plus, ListFilter, BarChart3, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import PosterSidebar from "../poster/PosterSidebar"

export default function PosterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 dark:from-gray-950 dark:to-gray-900">
    <SidebarProvider>
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <PosterSidebar />
      <div className="flex flex-1 flex-col">
        {/* <AdminHeader /> */}
        <main className="flex-1 bg-gray-100 dark:bg-gray-900 scrollbar-hide">
          <div className="container max-w-full">{children}</div>
        </main>
        
      </div>
    </div>
  </SidebarProvider>
  </div>
  )
}

