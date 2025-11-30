'use server';
/**
 * @fileOverview An AI flow to identify a product from an image and determine its origin.
 *
 * - identifyProduct - A function that handles the product identification process.
 * - IdentifyProductInput - The input type for the identifyProduct function.
 * - IdentifyProductOutput - The return type for the identifyProduct function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const IdentifyProductInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyProductInput = z.infer<typeof IdentifyProductInputSchema>;

const IdentifyProductOutputSchema = z.object({
  productName: z.string().describe('The name of the identified product.'),
  companyName: z.string().describe('The brand or company name of the product.'),
  originCountry: z.string().describe('The country of origin of the company/brand.'),
  isIndian: z.boolean().describe('Whether the product brand is of Indian origin.'),
  indianAlternatives: z.array(z.object({
    productName: z.string(),
    companyName: z.string(),
  })).optional().describe('A list of alternative Indian products if the identified product is not Indian.'),
});
export type IdentifyProductOutput = z.infer<typeof IdentifyProductOutputSchema>;

export async function identifyProduct(input: IdentifyProductInput): Promise<IdentifyProductOutput> {
  return identifyProductFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyProductPrompt',
  input: { schema: IdentifyProductInputSchema },
  output: { schema: IdentifyProductOutputSchema },
  prompt: `You are an expert in brand recognition and supply chain analysis. Your primary task is to identify the company/brand from the logo in the provided image. Analyze the image to find the logo, even if no text is present.

Based on the logo, determine the company name. For example, if you see the logo of a bitten apple, the company is Apple Inc.

Once you identify the brand, determine its country of origin. For example, Apple is an American company, so its origin is the USA. Oppo is a Chinese company, so its origin is China.

Based on the origin country, determine if the company is Indian. Set the isIndian field to true if the company's origin country is India, and false otherwise.

If the product is not of Indian origin, provide a list of 3-5 similar alternative products from Indian brands. The alternatives should be returned in the 'indianAlternatives' field. Each alternative should have a 'productName' and 'companyName'.

If you cannot identify the product or brand from the image, set productName to "Unknown Product", companyName to "Unknown Brand", and originCountry to "Unknown".

Photo: {{media url=photoDataUri}}`,
});

const identifyProductFlow = ai.defineFlow(
  {
    name: 'identifyProductFlow',
    inputSchema: IdentifyProductInputSchema,
    outputSchema: IdentifyProductOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
