import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Loader2, Shield, AlertTriangle, CheckCircle, FileText } from "lucide-react";
import type { AnalyzeResponse, Risk } from "@/types/api";
import { toast } from "sonner";

const SAMPLE_TEXT = `Terms of Service

By using our service, you agree to the following terms:

1. Data Collection: We collect your email, location data, browsing history, and device information. This data may be shared with third-party advertisers and partners.

2. Payment Terms: Subscription automatically renews monthly. Cancellation must be made 30 days in advance. No refunds are provided under any circumstances.

3. Content Rights: By uploading content, you grant us a perpetual, irrevocable, worldwide license to use, modify, and distribute your content for any purpose.

4. Liability: We are not responsible for any damages, data loss, or security breaches. You use the service at your own risk.

5. Arbitration: Any disputes must be resolved through binding arbitration. You waive your right to a jury trial or class action lawsuit.

6. Changes: We may modify these terms at any time without notice. Continued use means you accept the changes.`;

const API_BASE_URL = import.meta.env.VITE_SUPABASE_URL 
  ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`
  : "http://localhost:54321/functions/v1";

const categoryLabels: Record<string, string> = {
  data_privacy: "Data Privacy",
  financial: "Financial",
  permissions: "Permissions",
  legal: "Legal",
  other: "Other"
};

const categoryIcons: Record<string, any> = {
  data_privacy: Shield,
  financial: FileText,
  permissions: AlertTriangle,
  legal: FileText,
  other: AlertTriangle
};

export const Analyzer = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text to analyze");
      return;
    }

    if (text.trim().length < 50) {
      toast.error("Please enter at least 50 characters");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${API_BASE_URL}/analyze-terms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Too many requests. Please try again in a moment.");
        }
        if (response.status === 402) {
          throw new Error("Service temporarily unavailable. Please contact support.");
        }
        throw new Error("Analysis failed. Please try again.");
      }

      const data = await response.json();
      setResult(data);
      toast.success("Analysis complete!");
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleUseSample = () => {
    setText(SAMPLE_TEXT);
    setResult(null);
    setError(null);
  };

  const getRiskBadgeVariant = (level: string) => {
    switch (level) {
      case "low":
        return "default";
      case "medium":
        return "secondary";
      case "high":
        return "destructive";
      default:
        return "default";
    }
  };

  const getRiskScoreColor = (score: string) => {
    switch (score) {
      case "low":
        return "text-success";
      case "medium":
        return "text-warning";
      case "high":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getRiskScoreIcon = (score: string) => {
    switch (score) {
      case "low":
        return CheckCircle;
      case "medium":
        return AlertTriangle;
      case "high":
        return AlertTriangle;
      default:
        return Shield;
    }
  };

  const groupedRisks = result?.risks.reduce((acc, risk) => {
    if (!acc[risk.category]) {
      acc[risk.category] = [];
    }
    acc[risk.category].push(risk);
    return acc;
  }, {} as Record<string, Risk[]>);

  return (
    <section id="analyzer" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
              Analyze Terms & Conditions
            </h2>
            <p className="text-muted-foreground">
              Paste any Terms of Service or Privacy Policy to get an instant AI analysis
            </p>
          </div>

          <Card className="p-6 shadow-lg">
            <div className="space-y-4">
              <div>
                <label htmlFor="terms-text" className="mb-2 block text-sm font-medium text-foreground">
                  Terms & Conditions Text
                </label>
                <Textarea
                  id="terms-text"
                  placeholder="Paste the Terms & Conditions or Privacy Policy text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[200px] resize-y"
                  disabled={loading}
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  🔒 Your text is only used for analysis and is not stored
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="flex-1"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing with AI...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Analyze
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleUseSample}
                  variant="outline"
                  disabled={loading}
                  size="lg"
                >
                  Use sample text
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {result && (
                <div className="mt-8 space-y-6">
                  {/* Overall Risk Score */}
                  <Card className="border-2 p-6">
                    <div className="flex items-start gap-4">
                      {(() => {
                        const Icon = getRiskScoreIcon(result.risk_score);
                        return <Icon className={`h-8 w-8 ${getRiskScoreColor(result.risk_score)}`} />;
                      })()}
                      <div className="flex-1">
                        <h3 className="mb-2 text-lg font-semibold text-foreground">Overall Risk Assessment</h3>
                        <div className="mb-2">
                          <Badge variant={getRiskBadgeVariant(result.risk_score)} className="text-sm">
                            {result.risk_score.toUpperCase()} RISK
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {result.risk_score === "low" && "This document appears relatively standard with minimal concerns."}
                          {result.risk_score === "medium" && "This document contains some clauses that warrant attention."}
                          {result.risk_score === "high" && "This document contains significant concerns that you should carefully review."}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                          Analyzed {result.word_count.toLocaleString()} words
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Summary */}
                  <div>
                    <h3 className="mb-3 text-xl font-semibold text-foreground">Summary</h3>
                    <Card className="p-5">
                      <ul className="space-y-2">
                        {result.summary.map((item, index) => (
                          <li key={index} className="flex gap-2 text-sm text-foreground">
                            <span className="text-primary">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </div>

                  {/* Risks by Category */}
                  {groupedRisks && Object.keys(groupedRisks).length > 0 && (
                    <div>
                      <h3 className="mb-3 text-xl font-semibold text-foreground">Identified Risks</h3>
                      <div className="space-y-4">
                        {Object.entries(groupedRisks).map(([category, risks]) => {
                          const Icon = categoryIcons[category] || Shield;
                          return (
                            <Card key={category} className="p-5">
                              <div className="mb-3 flex items-center gap-2">
                                <Icon className="h-5 w-5 text-primary" />
                                <h4 className="font-semibold text-foreground">
                                  {categoryLabels[category] || category}
                                </h4>
                              </div>
                              <div className="space-y-3">
                                {risks.map((risk, index) => (
                                  <div key={index} className="border-l-2 border-muted pl-4">
                                    <div className="mb-1 flex items-center gap-2">
                                      <Badge variant={getRiskBadgeVariant(risk.level)} className="text-xs">
                                        {risk.level}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-foreground">{risk.description}</p>
                                    {risk.clause_excerpt && (
                                      <p className="mt-1 text-xs italic text-muted-foreground">
                                        "{risk.clause_excerpt}"
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Suggestions */}
                  {result.suggestions && result.suggestions.length > 0 && (
                    <div>
                      <h3 className="mb-3 text-xl font-semibold text-foreground">What You Can Do</h3>
                      <Card className="p-5">
                        <ul className="space-y-2">
                          {result.suggestions.map((suggestion, index) => (
                            <li key={index} className="flex gap-2 text-sm text-foreground">
                              <span className="text-accent">→</span>
                              <span>{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
