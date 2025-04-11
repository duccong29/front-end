"use client"
import { Users, Building2, ChevronRight, Settings, LogOut, LayoutDashboard, Building, ShieldAlert, Bell } from "lucide-react"

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
import { Button } from "../ui/button"

// Menu items with grouping
const menuItems = [
  {
    group: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/poster",
        icon: LayoutDashboard,
        description: "Overview of site activity",
      },
    ],
  },
  {
    group: "Management",
    items: [
     
      {
        title: "Apartments",
        url: "/poster/apartments",
        icon: Building,
        description: "Manage apartment listings",
      },
     
      {
        title: "Announcements",
        url: "/poster/announcements",
        icon: Bell,
        description: "Manage system announcements",
      },
    ],
  },
  {
    group: "System",
    items: [
      {
        title: "Settings",
        url: "/poster/settings",
        icon: Settings,
        description: "System configuration",
      },
      {
        title: "Access Control",
        url: "/poster/access",
        icon: ShieldAlert,
        description: "Manage permissions",
      },
    ],
  },
]

const PosterSidebar = () => {
  const { state, toggleSidebar } = useSidebar()
  const isExpanded = state === "expanded"

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
                  <span className="font-semibold tracking-tight">Poster Portal</span>
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
              <SidebarGroupLabel className="px-2 text-xs font-bold text-foreground">
                {group.group}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton
                            asChild
                            className="group transition-all duration-200 hover:bg-accent/50 rounded-none h-10"
                            tooltip={item.title}
                          >
                            <a href={item.url} className="flex items-center">
                              <div className="flex h-8 w-8 items-center justify-center bg-background/80 group-hover:bg-background/90 transition-colors">
                                <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                              </div>
                              <div className="ml-2 flex flex-col">
                                <span className="text-sm font-medium">{item.title}</span>
                                <span className="text-xs text-muted-foreground line-clamp-1">{item.description}</span>
                              </div>
                            </a>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                      </Tooltip>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter className="mt-auto border-t border-border/40 pt-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="gap-3" tooltip="Poster User">
                <Avatar className="h-6 w-6 border border-border/50 shadow-sm rounded-full">
                  <AvatarImage src="/placeholder.svg?height=30&width=30" />
                  <AvatarFallback className="bg-gradient-to-br from-rose-100 to-pink-200 text-rose-800 items-center justify-center">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5 text-left leading-none">
                  <span className="font-medium">Poster User</span>
                  <span className="text-xs text-muted-foreground">poster@example.com</span>
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

export default PosterSidebar

