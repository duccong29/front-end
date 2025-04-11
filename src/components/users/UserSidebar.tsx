"use client";
import {
  BarChart,
  Calendar,
  DollarSign,
  FileText,
  Home,
  Inbox,
  LayoutDashboard,
  Menu,
  Search,
  Settings,
  Shield,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";
import { Button } from "../ui/button";

// Menu items.
const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/user" },
  { icon: Users, label: "Profile", href: "/user/profile" },
  { icon: Shield, label: "Change Password", href: "/user/changePassword" },
  { icon: FileText, label: "Post management", href: "/user/postManagement" },
  { icon: BarChart, label: "Finance", href: "/user/finance" },
  { icon: DollarSign, label: "Settings", href: "#" },
];
const UserSidebar = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  return (
    <Sidebar
      collapsible="icon"
      className={cn(
        " bg-blue-600 text-black transition-all duration-300 ease-in-out mt-16",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarHeader className="flex h-10 items-end justify-between px-4">
        <SidebarTrigger
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-black hover:text-blue-200"
        >
          {isCollapsed ? <Menu size={24} /> : <X size={24} />}
        </SidebarTrigger>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroupLabel className="px-4">Menu</SidebarGroupLabel>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                className="flex items-center gap-4 px-4 py-3 hover:bg-blue-100"
              >
                <a href={item.href}>
                  <item.icon size={24} />
                  <span className={cn("ml-2", isCollapsed && "hidden")}>
                    {item.label}
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default UserSidebar;
