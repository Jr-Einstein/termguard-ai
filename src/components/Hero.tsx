import { Shield, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

export const Hero = () => {
  const scrollToAnalyzer = () => {
    const element = document.getElementById("analyzer");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background py-20 md:py-32">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            AI-Powered Analysis
          </div>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Understand Terms & Conditions{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              in seconds
            </span>
          </h1>
          
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            Stop reading endless legal text. Our AI analyzes Terms & Conditions and privacy
            policies to highlight risks, summarize key points, and help you make informed decisions.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={scrollToAnalyzer}
              className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-all"
            >
              <Shield className="mr-2 h-5 w-5" />
              Try it now
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToAnalyzer}
              className="w-full sm:w-auto"
            >
              See how it works
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
