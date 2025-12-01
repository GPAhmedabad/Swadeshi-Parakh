import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI({ apiKey: "AIzaSyC1Hz5ISB16F7ZJt_5iG-ps4jBmefrodss" })],
  model: 'googleai/gemini-2.5-flash',
});
