"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/utils/AuthContext";
import { useRouter, usePathname } from "next/navigation"; // Import usePathname
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, ChevronDown, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NotificationBell } from "./NotificationBell";

const UserHeader: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (response.ok) {
        logout();
        router.push("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    if (pathname === "/") {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 180);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setIsScrolled(true);
    }
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 w-screen z-50 transition-colors duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-12">
        <div className="flex h-16 items-center justify-between">
          <div className="flex flex-wrap items-center">
            <Link href="/" className="flex items-center group">
              <div className="relative w-10 h-10 mr-3 overflow-hidden rounded-full bg-white shadow-inner">
                <svg
                  className="absolute inset-0 w-full h-full text-green-600 transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span
                className={`${
                  isScrolled ? "text-black" : "text-white"
                } text-2xl font-extrabold tracking-tight`}
              >
                Rent Apartment
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={`px-4 py-2 transition-colors duration-200 rounded-full border-2 bg-transparent ${
                      isScrolled
                        ? "text-black  hover:underline hover:bg-white-100 border-none"
                        : "text-white hover:text-green-600 hover:bg-green-100 border-white border-opacity-50"
                    }`}
                  >
                    Property
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 bg-white rounded-md shadow-md p-2 md:w-[150px] lg:w-[200px]">
                      {["Apartment", "Villa", "House"].map((item) => (
                        <li key={item}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={`/${item.toLowerCase()}`}
                              className="block p-2 transition-colors duration-200 hover:bg-green-100 hover:text-green-600 rounded-md"
                            >
                              {item}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button
              variant="ghost"
              className={`px-4 py-2 transition-colors duration-200 rounded-full border-2 ${
                isScrolled
                  ? "text-black hover:underline hover:bg-white-100 border-none"
                  : "text-white hover:text-green-600 hover:bg-green-100 border-white border-opacity-50"
              }`}
            >
              Resources
            </Button>
              <Link href="/aboutUs" className="flex items-center group">
              <Button
              variant="ghost"
              className={`px-4 py-2 transition-colors duration-200 rounded-full border-2 ${
                isScrolled
                  ? "text-black hover:underline hover:bg-white-100 border-none"
                  : "text-white hover:text-green-600 hover:bg-green-100 border-white border-opacity-50"
              }`}
            >
              About Us
            </Button>
            </Link>
            
            
          </nav>

          <div className="flex items-center">
            <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn && <NotificationBell />}
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`relative h-10 w-10 rounded-full overflow-hidden border-2 transition-colors duration-200 ${
                        isScrolled ? "border-black" : "border-white"
                      } hover:border-opacity-75`}
                    >
                      <User
                        className={`${
                          isScrolled ? "text-black" : "text-white"
                        } h-5 w-5`}
                      />
                      <span className="sr-only">Open user menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <Link href="/user">
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onSelect={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className={`rounded-full ${
                        isScrolled ? "text-black" : "text-white"
                      } 
                   hover:bg-blue-100 hover:text-blue-700 transition-all duration-300 ease-in-out `}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button
                      variant="ghost"
                      className={`rounded-full transition-all duration-300 ease-in-out transform hover:scale-105
                        ${
                          isScrolled
                          
                            ? "bg-gradient-to-r from-blue-500 to-teal-400 hover:from-indigo-600 hover:to-cyan-500 text-white"
                            : "bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-700"
                        }`}
                    >
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
