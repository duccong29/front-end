"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Building2, Home, LayoutGrid } from "lucide-react";

interface ApartmentTypeSelectorProps {
  apartmentType: string;
  handleTypeChange: (type: string) => void;
}

const ApartmentTypeSelector: React.FC<ApartmentTypeSelectorProps> = ({
  apartmentType,
  handleTypeChange,
}) => {
  const TypeButton: React.FC<{ type: string; icon: React.ReactNode }> = ({
    type,
    icon,
  }) => (
    <Button
      onClick={() => handleTypeChange(type)}
      variant="outline"
      className={`rounded-full ${
        apartmentType === type
          ? `bg-${
              type === "All" ? "blue" : type === "House" ? "rose" : "green"
            }-50
             text-${
               type === "All" ? "blue" : type === "House" ? "rose" : "green"
             }-600
             cursor-default hover:bg-${
               type === "All" ? "blue" : type === "House" ? "rose" : "green"
             }-50
             hover:text-${
               type === "All" ? "blue" : type === "House" ? "rose" : "green"
             }-600`
          : `hover:bg-${
              type === "All" ? "blue" : type === "House" ? "rose" : "green"
            }-50
             hover:text-${
               type === "All" ? "blue" : type === "House" ? "rose" : "green"
             }-600`
      }`}
    >
      {icon}
      {type}
    </Button>
  );

  return (
    <div className="flex flex-grow justify-center gap-4">
      <TypeButton type="All" icon={<LayoutGrid className="w-4 h-4 mr-2" />} />
      <TypeButton type="House" icon={<Home className="w-4 h-4 mr-2" />} />
      <TypeButton
        type="Apartment"
        icon={<Building2 className="w-4 h-4 mr-2" />}
      />
    </div>
  );
};

export default ApartmentTypeSelector;
