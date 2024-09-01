import Link from "next/link";
import ApartmentsPage from "./apartments/page";


const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Trang chủ</h1>
      <ApartmentsPage />
    </div>
  );
};

export default HomePage;
