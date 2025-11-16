import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Analyzer } from "@/components/Analyzer";
import { HowItWorks } from "@/components/HowItWorks";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Analyzer />
        <HowItWorks />
        <Faq />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
