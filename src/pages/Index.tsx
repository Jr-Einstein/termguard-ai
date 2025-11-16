import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Analyzer } from "@/components/Analyzer";
import { HowItWorks } from "@/components/HowItWorks";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
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
