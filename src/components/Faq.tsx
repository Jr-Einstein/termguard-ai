import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export const Faq = () => {
  const faqs = [
    {
      question: "Do you store my data?",
      answer: "No. The text you paste is only used for analysis and is not stored on our servers. Your privacy is our priority.",
    },
    {
      question: "Is this legal advice?",
      answer: "No, TermGuard provides informational analysis only and does not constitute legal advice. For legal matters, please consult a qualified attorney.",
    },
    {
      question: "What types of risks can this detect?",
      answer: "Our AI identifies risks in categories like data privacy (tracking, sharing data), financial terms (auto-renewals, fees), permissions (device access), and legal clauses (arbitration, liability waivers).",
    },
    {
      question: "Can I use this for any website or app?",
      answer: "Yes! You can analyze Terms & Conditions or Privacy Policies from any website, app, or service. Just copy the text and paste it into our analyzer.",
    },
    {
      question: "How accurate is the AI analysis?",
      answer: "We use Google Gemini, a state-of-the-art AI model, to analyze legal text. While highly accurate, we recommend using this as a helpful tool rather than the sole basis for important decisions.",
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Common questions about TermGuard
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
