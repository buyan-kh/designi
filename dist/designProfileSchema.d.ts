import { z } from 'zod';
export declare const designProfileSchema: z.ZodObject<{
    colorPalette: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        primary: z.ZodOptional<z.ZodString>;
        secondary: z.ZodOptional<z.ZodString>;
        accent: z.ZodOptional<z.ZodString>;
        background: z.ZodOptional<z.ZodString>;
        text: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
    typography: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        fontFamily: z.ZodOptional<z.ZodString>;
        headingSize: z.ZodOptional<z.ZodString>;
        bodySize: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
    tone: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    keywords: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
}, z.core.$strip>;
export type DesignProfile = z.infer<typeof designProfileSchema>;
export declare const designProfileUpdateSchema: z.ZodObject<{
    colorPalette: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodObject<{
        primary: z.ZodOptional<z.ZodString>;
        secondary: z.ZodOptional<z.ZodString>;
        accent: z.ZodOptional<z.ZodString>;
        background: z.ZodOptional<z.ZodString>;
        text: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>>;
    typography: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodObject<{
        fontFamily: z.ZodOptional<z.ZodString>;
        headingSize: z.ZodOptional<z.ZodString>;
        bodySize: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>>;
    tone: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodString>>>;
    keywords: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>>;
}, z.core.$strip>;
//# sourceMappingURL=designProfileSchema.d.ts.map