"use client";
import ApartmentsPage from "./(user)/apartments/page";
import UserHeader from "@/components/users/UserHeader";
import UserFooter from "@/components/users/UserFooter";
import UserBanner from "@/components/users/UserBanner";
import UserCarousel from "@/components/users/UserCarousel";
import FeaturedResidence from "@/components/users/FeaturedResidence";


const HomePage: React.FC = () => {
  return <MainContent />;
};

export default HomePage;

function MainContent() {
  return (
    <div>
      <UserHeader />
      <UserBanner />
      <ApartmentsPage />
      <UserCarousel />
      <FeaturedResidence />
      <UserFooter />
    </div>
  );
}
