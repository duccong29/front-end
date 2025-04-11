// src/components/PaginationControls.tsx

"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex gap-2">
      <Button
        size="icon"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        variant="outline"
        className="rounded-full"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <Button
        size="icon"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        variant="outline"
        className="rounded-full"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default Pagination;
