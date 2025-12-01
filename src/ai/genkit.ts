import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI({ apiKey: "AIzaSyCWKz-SiD_zBeGyISsSuqqgfRu63XDvLGY" })],
  model: 'googleai/gemini-2.5-flash',
});
