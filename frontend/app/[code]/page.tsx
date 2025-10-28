import {API_CONFIG} from "@/lib/api-config";
import {redirect} from "next/navigation";

interface RedirectPageProps {
    params: Promise<{
        code: string;
    }>
}

export default async function RedirectPage({params}: RedirectPageProps) {
    const {code} = await params;

    const backendRedirectUrl = `${API_CONFIG.baseUrl}/${code}`
    redirect(backendRedirectUrl)
}