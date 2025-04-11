"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { DollarSign, Maximize } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CommentSection } from "@/components/users/CommentSection";
import { useApartmentDetail } from "@/hooks/useApartmentDetail";
import { ApartmentCarousel } from "@/components/users/ApartmentCarousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";


const ApartmentDetailPage: React.FC = () => {
  const { id } = useParams();
  const { apartment, isLoading, error } = useApartmentDetail(id as string);

  // Render Skeleton Loader while fetching data
  if (isLoading || !apartment) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <main className="container mx-auto px-4 py-10 mt-10">
          {/* Breadcrumb Skeleton */}
          <div className="mb-4">
            <Skeleton className="h-4 w-1/2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column Skeleton */}
            <div className="md:col-span-2 space-y-4">
              <Skeleton className="h-64 w-full" /> {/* Image */}
              <Skeleton className="h-8 w-3/4" /> {/* Title */}
              <Skeleton className="h-4 w-full" /> {/* Address */}
              <Skeleton className="h-4 w-1/2" /> {/* Price */}
              <Skeleton className="h-4 w-1/3" /> {/* Area */}
            </div>

            {/* Right Column Skeleton */}
            <div>
              <Skeleton className="h-10 w-full" /> {/* Booking Header */}
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto px-4 py-10 mt-10">
        <Breadcrumb className="text-sm text-gray-500 mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/apartments">Apartments</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{apartment.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <ApartmentCarousel images={apartment.images} />
            <div className="my-4">
              <h1 className="text-3xl font-bold text-red-600 flex items-center space-x-2">
                <span>{apartment.title}</span>
              </h1>
            </div>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Apartment Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{apartment.title}</p>
                <div className="text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPinIcon className="w-5 h-5 mr-2 text-gray-500" />
                    <span>{apartment.address}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-gray-500" />
                    <span>{apartment.price} triệu/tháng</span>
                  </div>
                  <div className="flex items-center">
                    <Maximize className="w-5 h-5 mr-2 text-gray-500" />
                    <span>{apartment.area} m²</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video relative rounded-lg overflow-hidden mb-4">
                  {/* Add map component here */}
                </div>
                <p className="text-gray-600">
                  Located in the heart of downtown, close to public
                  transportation, shopping centers, and restaurants.
                </p>
              </CardContent>
            </Card>
            <div className="mb-8">
              <CommentSection />
            </div>
          </div>
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Book This Apartment</CardTitle>
                <CardDescription>
                  Select a date to schedule a viewing or contact us directly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="calendar">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="calendar">Calendar</TabsTrigger>
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                  </TabsList>
                  <TabsContent value="calendar">
                    <Calendar mode="single" className="rounded-md border" />
                    <Button className="w-full mt-4">Schedule Viewing</Button>
                  </TabsContent>
                  <TabsContent value="contact">
                    <form className="space-y-4">
                      <Input placeholder="Your Name" />
                      <Input type="email" placeholder="Your Email" />
                      <Input type="tel" placeholder="Your Phone" />
                      <Textarea placeholder="Your Message" />
                      <Button type="submit" className="w-full">
                        Send Message
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApartmentDetailPage;
