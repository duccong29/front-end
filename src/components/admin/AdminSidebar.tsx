"use client"
import { usePathname } from "next/navigation"
import {
  Users,
  Building2,
  ChevronRight,
  Settings,
  LogOut,
  LayoutDashboard,
  Building,
  ShieldAlert,
  Bell,
  UserCheck,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Menu items with grouping
const menuItems = [
  {
    group: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    group: "Management",
    items: [
      {
        title: "Users",
        url: "/admin/users",
        icon: Users,
      },
      {
        title: "Poster Approvals",
        url: "/admin/posterapprovals",
        icon: UserCheck,
      },
      {
        title: "Apartments",
        url: "/admin/apartments",
        icon: Building,
      },
      {
        title: "Apartment Types",
        url: "/admin/apartmentType",
        icon: Building2,
      },
      {
        title: "Announcements",
        url: "/admin/announcements",
        icon: Bell,
      },
    ],
  },
  {
    group: "System",
    items: [
      {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
      },
      {
        title: "Access Control",
        url: "/admin/access",
        icon: ShieldAlert,
      },
    ],
  },
]

const AdminSidebar = () => {
  const { state, toggleSidebar } = useSidebar()
  const isExpanded = state === "expanded"
  const pathname = usePathname()

  const isActive = (url: string) => {
    // Exact match for dashboard
    if (url === "/admin" && pathname === "/admin") {
      return true
    }
    return pathname.startsWith(url) && url !== "/admin"
  }

  return (
    <TooltipProvider delayDuration={300}>
      <Sidebar className="border-r border-border/40 backdrop-blur-sm" collapsible="icon">
        <SidebarHeader className="pb-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" className="gap-3">
                <div className="flex aspect-square h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-sky-400 to-indigo-500 text-white shadow-md">
                  <ShieldAlert className="h-4 w-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold tracking-tight">Admin Portal</span>
                  <span className="text-xs text-muted-foreground">Manage your platform</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarSeparator />

        <SidebarContent className="gap-y-1">
          {menuItems.map((group, groupIndex) => (
            <SidebarGroup key={groupIndex} className="p-0">
              <SidebarGroupLabel className="p-2 text-xs font-bold text-foreground group-has-[[data-collapsible=icon]]/sidebar-wrapper:text-center">
                {group.group}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => {
                    const active = isActive(item.url)
                    return (
                      <SidebarMenuItem key={item.title}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuButton
                              asChild
                              className={cn(
                                "group relative transition-all duration-200 rounded-none",
                                active
                                  ? "bg-sky-200 hover:bg-sky-300 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-sky-500 font-bold"
                                  : "hover:bg-sky-50",
                              )}
                              tooltip={item.title}
                            >
                              <a href={item.url} className="flex items-center mx-auto ">
                                <div
                                  className={cn(
                                    "flex h-8 w-8 items-center justify-center transition-colors group-has-[[data-collapsible=icon]]/sidebar-wrapper:mx-auto",
                                    active ? "bg-sky-200 text-primary" : "bg-background/80 group-hover:bg-sky-100/70",
                                  )}
                                >
                                  <item.icon
                                    className={cn(
                                      "h-4 w-4 transition-colors ",
                                      active ? "text-primary " : "text-muted-foreground group-hover:text-foreground ",
                                    )}
                                  />
                                </div>
                                <div className="ml-2 flex flex-col">
                                  <span className={cn("text-sm font-medium", active && "text-primary font-semibold")}>
                                    {item.title}
                                  </span>
                                </div>
                              </a>
                            </SidebarMenuButton>
                          </TooltipTrigger>
                        </Tooltip>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter className="mt-auto border-t border-border/40 pt-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="gap-3" tooltip="Admin User">
                <Avatar className="h-6 w-6 border border-border/50 shadow-sm rounded-full">
                  <AvatarImage src="/placeholder.svg?height=30&width=30" />
                  <AvatarFallback className="bg-gradient-to-br from-rose-100 to-pink-200 text-rose-800 items-center justify-center">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5 text-left leading-none">
                  <span className="font-medium">Admin User</span>
                  <span className="text-xs text-muted-foreground">admin@example.com</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild className="text-muted-foreground hover:text-rose-500" tooltip="Sign out">
                <a href="/logout" className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />

        <button
          onClick={toggleSidebar}
          className={cn(
            "absolute right-0 top-4 z-50 flex h-6 w-6 translate-x-1/2 items-center justify-center rounded-full border border-border/80 bg-gray-700 shadow-md transition-all duration-200 hover:bg-gray-800",
            isExpanded ? "rotate-180" : "rotate-0",
          )}
        >
          <ChevronRight className="h-3 w-3 text-white" />
        </button>
      </Sidebar>
    </TooltipProvider>
  )
}

export default AdminSidebar
