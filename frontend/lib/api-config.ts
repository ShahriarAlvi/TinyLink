export const API_CONFIG = {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
    endpoints: {
        shorten: process.env.NEXT_PUBLIC_API_SHORTEN_ENDPOINT || "/api/shorten",
        redirect: process.env.NEXT_PUBLIC_API_REDIRECT_ENDPOINT || "/api/redirect",
    },
}

export function getApiUrl(endpoint: keyof typeof API_CONFIG.endpoints): string {
    return `${API_CONFIG.baseUrl}${API_CONFIG.endpoints[endpoint]}`
}