import { z } from 'zod';
export const designProfileSchema = z.object({
    colorPalette: z.object({
        primary: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).optional(),
        secondary: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).optional(),
        accent: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).optional(),
        background: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).optional(),
        text: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).optional(),
    }).optional(),
    typography: z.object({
        fontFamily: z.string().optional(),
        headingSize: z.string().optional(),
        bodySize: z.string().optional(),
    }).optional(),
    tone: z.string().optional(), // e.g., "minimalist", "bold", "playful"
    keywords: z.array(z.string()).optional(),
}).partial(); // .partial() makes all top-level properties optional for update operations
export const designProfileUpdateSchema = designProfileSchema.partial();
