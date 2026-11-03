import { z } from 'zod';
export const categories = [
  'Residential',
  'Hospitality',
  'Workplace',
  'Cultural',
] as const;
export const projectSchema = z.object({
  title: z.string().min(3),
  tagline: z.string().min(8),
  category: z.enum(categories),
  location: z.string().min(3),
  year: z.number().int().min(2020).max(2030),
  area: z.string().min(2),
  cover: z.enum([
    'courtyard',
    'listening-room',
    'clay-atelier',
    'tidal-pavilion',
  ]),
  alt: z.string().min(20),
  overview: z.string().min(80),
  approach: z.string().min(80),
  materials: z.array(z.string().min(2)).min(3),
  gallery: z
    .array(z.object({ label: z.string().min(5), position: z.string() }))
    .min(2),
  related: z
    .array(z.string().regex(/^[a-z0-9-]+$/))
    .min(1)
    .max(3),
  order: z.number().int().min(1).max(6),
});
