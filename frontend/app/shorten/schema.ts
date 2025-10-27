import { z } from "zod"

export const shortenUrlSchema = z.object({
    originalUrl: z.string().min(1, "Please enter a URL").url("Please enter a valid URL"),
})

export type ShortenUrlInput = z.infer<typeof shortenUrlSchema>
