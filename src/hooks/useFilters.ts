// import { useState, useCallback } from 'react';

// export interface FilterState {
//   keyword: string;
//   minPrice: string;
//   maxPrice: string;
//   district: string;
//   apartmentType: string;
// }

// export function useFilters(initialState: FilterState) {
//   const [filters, setFilters] = useState<FilterState>(initialState);

//   const handleChange = useCallback((field: keyof FilterState, value: string) => {
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       [field]: value,
//     }));
//   }, []);

//   return { filters, handleChange };
// }

