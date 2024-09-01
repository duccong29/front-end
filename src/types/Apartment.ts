// type/Apartment.ts
export interface Image {
    url: string;
  
  }

export interface Apartment {
    id: string;
    title: string;
    description: string;
    price: number;
    address: string;
    area: number;
    status: string;
    apartmentType: string;
    images: Image[];
}

// export interface ApartmentRequest {
//   id: string;
//   title: string;
//   description: string;
//   price: number;
//   address: string;
//   area: number;
//   status: string;
//   apartmentTypeName: string;
//   images: File[];  // Cập nhật từ Image[] sang File[]
// }