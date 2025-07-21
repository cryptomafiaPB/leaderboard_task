import z from "zod";

const envSchema = z.object({
    PORT: z.string().transform(Number).default(3000),
    MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
    RATE_LIMIT_WINDOW_MS: z.string().transform(Number).default(60000),
    RATE_LIMIT_MAX: z.string().transform(Number).default(10),
})


function createEnv(env: NodeJS.ProcessEnv) {
    const validationResult = envSchema.safeParse(env);

    if (!validationResult.success) {
        console.error("Invalid environment variables:", validationResult.error.message);
        throw new Error("Invalid environment variables: " + validationResult?.error.message);
    }
    return validationResult.data;
}

export const env = createEnv(process.env);