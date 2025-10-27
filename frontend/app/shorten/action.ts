"use server"

export async function shortenUrl(originalUrl: string) {
    if (!originalUrl.trim()) {
        return { error: "Please enter a URL" }
    }

    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
        const response = await fetch(`${apiUrl}/api/shorten`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ originalUrl }),
        })

        if (!response.ok) {
            throw new Error("Failed to shorten URL")
        }

        const data = await response.json()
        return { shortCode: data.shortCode, shortUrl: data.shortUrl }
    } catch (err) {
        return { error: err instanceof Error ? err.message : "An error occurred" }
    }
}
