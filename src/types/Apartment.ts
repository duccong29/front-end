
export interface Apartment {
  id: string;
  title: string;
  description: string;
  price: number;
  area: number;
  status: string;
  apartmentTypeName: string;
  createdDate: Date;
  userName: string;
  images: Image[];
  location: Location;
}

export interface Image {
  id: string;
  url: string;
}

export interface Location {
  provinceName: string;
  districtName: string;
  wardName: string;
  street: string;
  fullAddress: string;
}

export interface ApartmentFormData {
  title: string;
  description: string;
  price: string; 
  area: string; 
  status: string;
  apartmentTypeId: string;
  userId: string;
  location: LocationFormData;
  images: ImageFormData[];
}

export interface LocationFormData {
  provinceCode: string;
  districtCode: string;
  wardCode: string;
  provinceName?: string; 
  districtName?: string; 
  wardName?: string; 
}

export interface ImageFormData {
  file: File
}