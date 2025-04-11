// "use client";

// import { useState } from "react";

// const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState<any[]>([]);

//   const fetchSuggestions = async (keyword: string) => {
//     if (keyword.length > 1) {
//       try {
//         const res = await fetch(
//           `http://localhost:8080/apartments/filter?keyword=${keyword}`
//         );
//         if (!res.ok) throw new Error("Failed to fetch suggestions");
//         const data = await res.json();
//         setSuggestions(data);
//       } catch (error) {
//         console.error("Error fetching suggestions:", error);
//       }
//     } else {
//       setSuggestions([]);
//     }
//   };

//   return (
//     <div className="relative w-full max-w-md mx-auto">
//       <input
//         type="text"
//         className="w-full p-3 border rounded-lg"
//         placeholder="Tìm kiếm căn hộ..."
//         value={query}
//         onChange={(e) => {
//           setQuery(e.target.value);
//           fetchSuggestions(e.target.value);
//         }}
//         onKeyDown={(e) => e.key === "Enter" && onSearch(query)}
//       />
//       {suggestions.length > 0 && (
//         <ul className="absolute z-10 w-full bg-white border rounded-lg mt-1">
//           {suggestions.map((item) => (
//             <li
//               key={item.id}
//               className="p-2 cursor-pointer hover:bg-gray-200"
//               onClick={() => {
//                 setQuery(item.title);
//                 setSuggestions([]);
//                 onSearch(item.title);
//               }}
//             >
//               {item.title}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SearchBar;
