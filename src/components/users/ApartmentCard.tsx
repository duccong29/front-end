import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Apartment } from "@/types/Apartment";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/solid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

interface ApartmentCardProps {
  apartment: Apartment;
  orientation?: "vertical" | "horizontal";
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({
  apartment,
  orientation = "vertical",
}) => {
  return (
    <div
      className={`bg-gray-50 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 ${
        orientation === "horizontal" ? "flex bg-gray-200 " : ""
      }`}
    >
      <Card
        className={`relative group ${
          orientation === "horizontal" ? "w-1/3" : ""
        }`}
      >
        {apartment.images.length > 0 && (
          
          <Image
            src={apartment.images[0].url}
            alt={apartment.title}
            width={orientation === "horizontal" ? 400 : 600} // Đặt kích thước phù hợp
            height={orientation === "horizontal" ? 300 : 400} // Đặt kích thước phù hợp
            className={`${
              orientation === "horizontal" ? "w-full h-full" : "w-full h-64"
            } object-cover`}
            priority={true}  
          />
        )}
        <div
          className={`${
            orientation === "horizontal"
              ? ""
              : "absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-0"
          }`}
        ></div>
        {orientation === "vertical" && (
          <>
            {/* Giá và apartmentType nằm trong hình */}
            <div
              className={`absolute top-2 left-2 rounded-full px-3 py-1 ${
                apartment.apartmentTypeName === "Apartment"
                  ? "bg-green-50 text-green-600"
                  : apartment.apartmentTypeName === "House"
                  ? "bg-red-50 text-red-600"
                  : "bg-gray-50 text-gray-600"
              }`}
            >
              <p className="text-sm font-medium">
                {apartment.apartmentTypeName}
              </p>
            </div>
            <div className="absolute bottom-0 left-0 text-white p-2 m-2 rounded-md">
              <p className="text-xl font-bold">
                {apartment.price.toLocaleString()} / tháng
              </p>
            </div>
          </>
        )}
      </Card>
      <div className={`${orientation === "horizontal" ? "w-2/3 p-3" : ""}`}>
        <CardHeader className="p-3">
          {orientation === "horizontal" && (
            <div className="flex justify-between items-center mb-2">
              {/* Giá và apartmentType được đưa lên trên title */}
              <span
                className={`px-2 py-1 rounded-full ${
                  apartment.apartmentTypeName === "Apartment"
                    ? "bg-green-50 text-green-600"
                    : apartment.apartmentTypeName === "House"
                    ? "bg-red-50 text-red-600"
                    : "bg-gray-50 text-gray-600"
                }`}
              >
                {apartment.apartmentTypeName}
              </span>
              <span className="text-lg font-bold text-gray-800">
                {apartment.price.toLocaleString()} / tháng
              </span>
            </div>
          )}
          <CardTitle>
            <Link href={`/apartments/${apartment.id}`} prefetch={true}>
              <span className="whitespace-nowrap overflow-hidden text-ellipsis block text-xl font-semibold">
                {apartment.title}
              </span>
            </Link>
            <CardDescription className="mt-2 flex items-center text-gray-600">
              {apartment.location.fullAddress}
            </CardDescription>
          </CardTitle>
        </CardHeader>
        <CardContent className="pl-3">
          <div className="flex justify-between text-sm text-gray-600">
            <span className="flex items-center">
              <ArrowsPointingOutIcon className="h-4 w-4 text-gray-500 mr-2" />
              {apartment.area} m²
            </span>
            <span className="flex items-center text-right">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-gray-800 font-medium">
                  {apartment.userName}
                </span>
                <span className="text-gray-500 text-xs">
                  {formatDistanceToNow(new Date(apartment.createdDate), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </span>
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default ApartmentCard;
