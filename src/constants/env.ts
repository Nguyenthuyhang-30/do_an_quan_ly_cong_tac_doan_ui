import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.string(),
  VITE_FEATURE_FLAG_EXPERIMENTAL: z.enum(['true', 'false']).optional().default('false'),
});

envSchema.parse(import.meta.env);

export const API_URL = import.meta.env.VITE_API_URL;
export const FEATURE_FLAG_EXPERIMENTAL = import.meta.env.VITE_FEATURE_FLAG_EXPERIMENTAL === 'true';
