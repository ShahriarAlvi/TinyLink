"use client"

import {useState} from "react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Card} from "@/components/ui/card"
import {Alert, AlertDescription} from "@/components/ui/alert"
import {Copy, CheckCircle2, AlertCircle} from "lucide-react"
import {shortenUrl} from "./action"
import {shortenUrlSchema, type ShortenUrlInput} from "./schema"

interface ShortenFormProps {
    initialUrl?: string
}

export function ShortenForm({initialUrl = ""}: ShortenFormProps) {
    const [shortCode, setShortCode] = useState("")
    const [shortUrl, setShortUrl] = useState("")
    const [copied, setCopied] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<ShortenUrlInput>({
        resolver: zodResolver(shortenUrlSchema),
        defaultValues: {
            originalUrl: initialUrl,
        },
    })

    const onSubmit = async (data: ShortenUrlInput) => {
        setIsSubmitting(true)
        setShortCode("")
        setShortUrl("")
        setCopied(false)
        setError(null)

        const result = await shortenUrl(data.originalUrl)

        setIsSubmitting(false)

        if ("error" in result) {
            setError(result.error ?? null)
        } else {
            setShortCode(result.shortCode)
            setShortUrl(result.shortUrl)
            reset()
        }
    }

    const handleCopy = () => {
        const fullUrl = shortUrl || `${window.location.origin}/${shortCode}`
        navigator.clipboard.writeText(fullUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="space-y-4">
            {error && (
                <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
                    <AlertCircle className="h-4 w-4"/>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* Form Card */}
            <Card className="p-6 space-y-4 border-border">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="originalUrl" className="text-sm font-semibold text-foreground">
                            Original URL
                        </label>
                        <Input
                            id="originalUrl"
                            type="url"
                            placeholder="https://example.com/very/long/url"
                            disabled={isSubmitting}
                            className="text-base"
                            {...register("originalUrl")}
                        />
                        {errors.originalUrl && <p className="text-sm text-destructive">{errors.originalUrl.message}</p>}
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
                        {isSubmitting ? "Shortening..." : "Shorten URL"}
                    </Button>
                </form>
            </Card>

            {/* Result Card */}
            {shortCode && (
                <Card className="p-6 space-y-4 bg-primary/5 border-primary/30">
                    <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-primary"/>
                        <p className="text-sm font-semibold text-primary">Success!</p>
                    </div>
                    <div className="space-y-3">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Your Short
                            URL</p>
                        <div className="flex items-center gap-2">
                            <code
                                className="flex-1 p-3 bg-background rounded-lg text-sm font-mono text-foreground break-all border border-border">
                                {shortUrl || `${window.location.origin}/${shortCode}`}
                            </code>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleCopy}
                                disabled={isSubmitting}
                                className="flex-shrink-0 bg-transparent"
                                title={copied ? "Copied!" : "Copy to clipboard"}
                            >
                                <Copy className="w-4 h-4"/>
                            </Button>
                        </div>
                        {copied && (
                            <p className="text-xs text-primary font-medium flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3"/>
                                Copied to clipboard!
                            </p>
                        )}
                    </div>
                </Card>
            )}
        </div>
    )
}
