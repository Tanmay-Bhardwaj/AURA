import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeAura(type: string, data: any) {
  const systemInstruction = "You are AURA — Adaptive Universal Recognition Architecture. You are the intelligence layer of a 5-star luxury hotel operating in 2050. Be precise, formal, and professional. When asked for JSON, return only valid JSON with no markdown fencing.";
  
  let prompt = "";
  let parts: any[] = [];

  if (type === "guest-dna") {
    prompt = "Analyse this image for guest behaviour signals. Respond in strict JSON only: { \"emotionState\": \"string\", \"stressLevel\": \"Low\"|\"Medium\"|\"High\", \"guestType\": \"Relaxed\"|\"Business\"|\"Fussy\"|\"VIP\", \"confidenceScore\": number (0-100), \"auraSuggestion\": \"string (one specific staff action)\", \"microbehaviors\": [\"string\", \"string\", \"string\"] }";
    parts = [
      { text: prompt },
      { inlineData: { data: data.imageBase64.split(',')[1] || data.imageBase64, mimeType: "image/jpeg" } }
    ];
  } else if (type === "spatial") {
    prompt = "Analyse this space and return strict JSON: { \"zones\": [{\"id\":\"A1\", \"occupancy\":\"Empty\"|\"Low\"|\"High\", \"cleanlinessScore\": number 0-100, \"hazard\": boolean}], \"utilization\": number, \"recommendedRoomType\": \"string\", \"anomaly\": \"string|null\", \"housekeepingAlert\": \"string|null\" }";
    parts = [
      { text: prompt },
      { inlineData: { data: data.imageBase64.split(',')[1] || data.imageBase64, mimeType: "image/jpeg" } }
    ];
  } else if (type === "empathy") {
    prompt = `A guest said: '${data.text}'. Analyse and return strict JSON: { "sentimentScore": number -100 to 100, "primaryEmotion": "string", "frustrationLevel": "None"|"Low"|"Medium"|"High"|"Critical", "guestCategory": "HWC"|"Fussy"|"VIP"|"CIP"|"Standard", "staffGuidance": "string", "toneDescription": "string", "languageClues": "string" }`;
    parts = [{ text: prompt }];
  } else if (type === "revenue") {
    prompt = `Given this room type revenue mix ${JSON.stringify(data.text)}, provide exactly 3 specific revenue optimization actions in under 70 words. Be precise and actionable.`;
    parts = [{ text: prompt }];
  } else if (type === "translate") {
    prompt = `Translate and culturally adapt this hotel communication to ${data.language}. Match the formal register and warmth appropriate for luxury hospitality in that culture. Plain text response only. Communication: ${data.text}`;
    parts = [{ text: prompt }];
  } else if (type === "chat") {
    prompt = `Respond to the user's message as AURA, the hotel intelligence layer. Message: ${data.text}`;
    parts = [{ text: prompt }];
  } else {
    throw new Error("Invalid analysis type");
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: { parts },
    config: {
      systemInstruction,
      responseMimeType: (type === "guest-dna" || type === "spatial" || type === "empathy") ? "application/json" : "text/plain",
    }
  });

  let resultText = response.text || "";
  
  if (type === "guest-dna" || type === "spatial" || type === "empathy") {
    try {
      return JSON.parse(resultText);
    } catch (e) {
      console.error("Failed to parse JSON from Gemini:", resultText);
      throw new Error("Invalid JSON response from AI");
    }
  } else {
    return { result: resultText };
  }
}
