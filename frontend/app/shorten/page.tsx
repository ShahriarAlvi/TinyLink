import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { ShortenForm } from "./shorten-form"

export default function ShortenPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 flex flex-col items-center justify-center px-4 py-8">
            <div className="max-w-md w-full space-y-6">
                {/* Back Button */}
                <Link href="/">
                    <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Button>
                </Link>

                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold text-foreground">Shorten Your URL</h1>
                    <p className="text-muted-foreground">Paste a long URL to get a short, shareable link</p>
                </div>

                {/* Form Component */}
                <ShortenForm />
            </div>
        </main>
    )
}
