
import { GoogleGenAI, Type } from "@google/genai";
import { ReviewData, Sentiment } from "../types";

export const analyzeMovie = async (movieName: string): Promise<{ data: ReviewData; sources: any[] }> => {
  // Fix: Initializing GoogleGenAI using strictly named parameter as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Analyze the movie "${movieName}". Generate a balanced, original review based on general audience reception and critical tone. 
  Include strengths, weaknesses, dominant emotions, overall sentiment, a natural review paragraph, and a predicted rating out of 5.`;

  // Fix: Calling models.generateContent with model and prompt directly in one call
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      tools: [{ googleSearch: {} }],
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          movieName: { type: Type.STRING },
          overallSentiment: { 
            type: Type.STRING,
            description: "Must be one of: Very Positive, Positive, Mixed, Negative, Very Negative"
          },
          emotions: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Identify 3-5 dominant emotions like joy, nostalgia, etc."
          },
          strengths: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "List 3-4 key strengths"
          },
          weaknesses: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "List 3-4 key weaknesses"
          },
          reviewText: { 
            type: Type.STRING,
            description: "A natural, human-like review paragraph reflecting both positives and negatives"
          },
          rating: { 
            type: Type.NUMBER,
            description: "Predicted rating out of 5"
          },
          releaseYear: { type: Type.STRING },
          genre: { type: Type.STRING }
        },
        required: ["movieName", "overallSentiment", "emotions", "strengths", "weaknesses", "reviewText", "rating"]
      }
    }
  });

  // Fix: Correctly access the .text property from response
  const jsonStr = response.text?.trim() || "{}";
  const data: ReviewData = JSON.parse(jsonStr);
  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

  return { data, sources };
};
