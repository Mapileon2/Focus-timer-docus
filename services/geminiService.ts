import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Quote, RecapStats } from '../types';
import { STORAGE_KEY_API_KEY, IMAGE_QUOTE_MODEL, RECAP_IMAGE_MODEL } from '../constants';

declare const chrome: any;

// --- API Key Management ---
const getApiKey = async (): Promise<string> => {
    if (chrome && chrome.storage && chrome.storage.local) {
        const result = await chrome.storage.local.get(STORAGE_KEY_API_KEY);
        const apiKey = result[STORAGE_KEY_API_KEY];
        if (apiKey) {
            return apiKey;
        }
    }
    throw new Error("API key not found.");
};

const getAiClient = async () => {
    const apiKey = await getApiKey();
    return new GoogleGenAI({ apiKey });
};

// --- Helper Functions ---
const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.readAsDataURL(file);
    });
    return {
        inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
};

// --- Service Functions ---
export const testApiKey = async (apiKey: string, model: string): Promise<boolean> => {
    if (!apiKey) return false;
    try {
        const ai = new GoogleGenAI({ apiKey }); // Test with the provided key directly
        await ai.models.generateContent({
            model: model,
            contents: 'test',
            config: { maxOutputTokens: 1, thinkingConfig: { thinkingBudget: 0 } }
        });
        return true;
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("API Key test failed:", error);
        }
        return false;
    }
};

export const generateQuotesFromVibe = async (model: string, vibe: string, count: number = 3): Promise<Omit<Quote, 'id' | 'isFavorite' | 'source'>[]> => {
    try {
        const ai = await getAiClient();
        const response = await ai.models.generateContent({
            model: model,
            contents: `Generate ${count} short, inspirational quotes about "${vibe}". The quotes should be suitable for a productivity app.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        quotes: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    text: { type: Type.STRING },
                                    author: { type: Type.STRING },
                                },
                                required: ['text', 'author']
                            }
                        }
                    },
                    required: ['quotes']
                },
            },
        });
        const jsonResponse = JSON.parse(response.text);
        return jsonResponse.quotes || [];
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error generating quotes:", error);
        }
        throw error;
    }
};

export const generateImageQuote = async (imageFile: File, theme: string): Promise<{ text: string; imageUrl: string } | null> => {
    try {
        const ai = await getAiClient();
        const imagePart = await fileToGenerativePart(imageFile);
        
        const response = await ai.models.generateContent({
            model: IMAGE_QUOTE_MODEL,
            contents: {
                parts: [
                    imagePart,
                    { text: `Generate a short, powerful quote about "${theme}" and artistically overlay it onto this image. Make the text legible and visually appealing.` },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        let generatedText = '';
        let generatedImage: string | null = null;
        
        if (response.candidates && response.candidates[0].content.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.text) {
                    generatedText = part.text;
                } else if (part.inlineData) {
                    const base64ImageBytes = part.inlineData.data;
                    generatedImage = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
                }
            }
        }
        
        if (generatedText && generatedImage) {
            return { text: generatedText, imageUrl: generatedImage };
        }
        
        return null;

    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error generating image quote:", error);
        }
        throw error;
    }
};

export const generateRecapImage = async (stats: RecapStats): Promise<string | null> => {
    try {
        const ai = await getAiClient();
        const favQuoteText = stats.favQuote ? `Favorite quote: "${stats.favQuote.text}" - ${stats.favQuote.author}` : "No favorite quote set.";
        const prompt = `Create a visually appealing, shareable graphic for a productivity app called "Focus Smile". The graphic should celebrate the user's progress. It must include this information:
- Total focus time: ${stats.totalFocusMin} minutes
- Sessions completed: ${stats.totalSessions}
- ${favQuoteText}
Use a clean, modern, and inspiring design. Maybe with some abstract shapes or a simple, encouraging illustration. The overall vibe should be positive and motivating.`;

        const response = await ai.models.generateImages({
            model: RECAP_IMAGE_MODEL,
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '1:1',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        }
        return null;
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error generating recap image:", error);
        }
        throw error;
    }
};