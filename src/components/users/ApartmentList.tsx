import { Apartment } from "@/types/Apartment";
import ApartmentCard from "./ApartmentCard";

interface ApartmentListProps {
  apartments: Apartment[];
  orientation?: "vertical" | "horizontal";
}

const ApartmentList: React.FC<ApartmentListProps> = ({
  apartments,
  orientation = "vertical",
}) => {
  return (
    <div
      className={`grid gap-6 ${
        orientation === "vertical"
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1"
      }`}
    >
      {apartments.map((apartment) => (
        <ApartmentCard
          key={apartment.id}
          apartment={apartment}
          orientation={orientation}
        />
      ))}
    </div>
  );
};

export default ApartmentList;
