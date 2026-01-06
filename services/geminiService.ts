
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generatePortfolio(imageData: string, basicInfo: any) {
  const model = 'gemini-3-flash-preview';
  
  const prompt = `
    Based on this artisan's basic information: ${JSON.stringify(basicInfo)}
    And the image of their work provided, please generate a professional artisan portfolio.
    Analyze the image to detect specific skills, craft types, and quality level.
    Return a JSON object matching this schema.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: [
      {
        parts: [
          { text: prompt },
          { inlineData: { data: imageData.split(',')[1], mimeType: 'image/jpeg' } }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          bio: { type: Type.STRING, description: "A heartwarming and professional story of the artisan" },
          skills: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "List of technical and artistic skills detected" 
          },
          craftCategory: { type: Type.STRING, description: "Main category like Pottery, Weaving, Embroidery, etc." },
          experienceDescription: { type: Type.STRING, description: "Description of her expertise level" }
        },
        required: ["bio", "skills", "craftCategory", "experienceDescription"]
      }
    }
  });

  return JSON.parse(response.text);
}

export async function translateContent(text: string, targetLanguage: string) {
  const model = 'gemini-3-flash-preview';
  const response = await ai.models.generateContent({
    model,
    contents: `Translate the following text to ${targetLanguage}. Keep the tone professional yet warm: "${text}"`,
  });
  return response.text;
}
