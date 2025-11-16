import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ANALYSIS_PROMPT = `You are an assistant that analyzes software Terms & Conditions and privacy policies for end users.

You MUST respond with VALID JSON only. No explanations, no markdown, no backticks.

JSON schema:
{
  "summary": [ "...", "..." ],
  "risk_score": "low" | "medium" | "high",
  "risks": [
    {
      "category": "data_privacy" | "financial" | "permissions" | "legal" | "other",
      "level": "low" | "medium" | "high",
      "description": "Simple explanation of the risk in one sentence.",
      "clause_excerpt": "Optional short excerpt from the terms that supports this risk."
    }
  ],
  "word_count": 1234,
  "suggestions": [
    "Short plain-language tip 1",
    "Short plain-language tip 2"
  ]
}

Instructions:
1. Read the Terms & Conditions or privacy policy text.
2. Create a concise bullet-point summary (max 10 items) explaining what the user is agreeing to in simple language.
3. Identify any risks in these categories:
   - data_privacy: personal data collection, tracking, sharing with third parties, selling data, etc.
   - financial: subscriptions, auto-renewals, fees, non-refundable payments, extra charges.
   - permissions: access to camera, microphone, location, contacts, background tracking, etc.
   - legal: waiving rights, binding arbitration, jurisdiction issues, limitations of liability, etc.
   - other: anything important that doesn't fit the above.
4. For each risk, set a risk level: low, medium, or high.
5. Determine the overall "risk_score" for the entire document (low/medium/high):
   - "high" if there is any high risk or multiple medium risks
   - "medium" for a few moderate risks
   - "low" if only minor/standard clauses
6. Provide "suggestions" (3-5 items) that help a non-technical user understand what actions they could take or what to watch out for.
7. Calculate approximate word_count of the input text.
8. Output ONLY JSON, matching the schema above. Do not include any markdown formatting or code blocks.`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();

    // Validate input
    if (!text || typeof text !== 'string' || text.trim().length < 50) {
      return new Response(
        JSON.stringify({ error: 'Text must be at least 50 characters long' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'Service configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Analyzing text with Lovable AI (Gemini)...');

    // Call Lovable AI Gateway with Gemini
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: ANALYSIS_PROMPT },
          { role: 'user', content: `Analyze the following Terms & Conditions or Privacy Policy:\n\n${text}` }
        ],
        temperature: 0.3, // Lower temperature for more consistent structured output
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Too many requests. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Service temporarily unavailable. Please add credits to your workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: 'AI analysis failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('AI response received');

    // Extract the content from the AI response
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      console.error('No content in AI response');
      return new Response(
        JSON.stringify({ error: 'Invalid AI response' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse the JSON response from the AI
    let analysisResult;
    try {
      // Remove any potential markdown code blocks
      const cleanedContent = content.replace(/```json\s*|\s*```/g, '').trim();
      analysisResult = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError, 'Content:', content);
      
      // Fallback response
      analysisResult = {
        summary: [
          'Unable to fully parse the terms and conditions.',
          'Please review the original document carefully.',
          'Consider consulting with a legal professional for important agreements.'
        ],
        risk_score: 'medium',
        risks: [{
          category: 'other',
          level: 'medium',
          description: 'Analysis could not be completed fully. Manual review recommended.',
          clause_excerpt: null
        }],
        word_count: text.split(/\s+/).length,
        suggestions: [
          'Read the original terms carefully',
          'Look for sections about data privacy and refunds',
          'Consider seeking legal advice for important agreements'
        ]
      };
    }

    return new Response(
      JSON.stringify(analysisResult),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-terms function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
