import { FileText, Sparkles, CheckCircle } from "lucide-react";
import { Card } from "./ui/card";

export const HowItWorks = () => {
  const steps = [
    {
      icon: FileText,
      title: "Paste the Terms",
      description: "Copy and paste any Terms & Conditions or Privacy Policy text into our analyzer.",
    },
    {
      icon: Sparkles,
      title: "AI Analysis",
      description: "Our AI powered by Google Gemini reads and understands the legal text in seconds.",
    },
    {
      icon: CheckCircle,
      title: "Get Clear Results",
      description: "See a simple summary, risk score, and specific concerns highlighted for you.",
    },
  ];

  return (
    <section id="how-it-works" className="bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
            How It Works
          </h2>
          <p className="text-muted-foreground">
            Three simple steps to understand any legal document
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="relative p-6 text-center transition-all hover:shadow-lg">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="mb-2 text-sm font-semibold text-primary">Step {index + 1}</div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
