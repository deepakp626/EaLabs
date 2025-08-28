import Image from "next/image";
import HeroSection from "@/components/home/HeroSection";
import ServiceCards from "@/components/home/ServiceCards";
import CheckUpPackages from "@/components/home/CheckUpPackages";
import TestsByHealth from "@/components/home/TestsByHealth";
import BookLabTests from "@/components/home/BookLabTests";
import CallToAction from "@/components/CallToAction";
import WhyChooseUs from "@/components/WhyChooseUs";
import Partners from "@/components/home/Partners";
import CertificationSection from "@/components/home/CertificationInfo";
import CheckUpForManAndWoman from "@/components/home/CheckUpForManAndWoman";

// app/page.js
export const metadata = {
    title: 'Endocrine Laboratory & Allergy Laboratory in Ahmedabad | Endocrine Lab Ahmedabad | Endocrine Laboratory in Ahmedabad', // Set your desired title here
    description: 'Endocrine Laboratory & Allergy Laboratory in Ahmedabad offering expert testing. Trusted Endocrine Lab Ahmedabad & Allergy Laboratory Ahmedabad.',
};

export default function Home() {
  return (
    // give space in all section 
    <div className="space-y-6">
      
      <HeroSection />

      {/* <ServiceCards /> */}

      <CertificationSection />

      <CheckUpPackages />

      <CheckUpForManAndWoman />

      <TestsByHealth />

      <BookLabTests />

      <CallToAction />

      <WhyChooseUs />

      <Partners />

    </div>
  );
}
