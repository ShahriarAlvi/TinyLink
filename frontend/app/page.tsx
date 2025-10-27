import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 flex flex-col items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center space-y-12">
          {/* Logo/Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <span className="text-3xl font-bold text-primary">⚡</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-foreground tracking-tight">
              <span className="text-balance">TinyLink</span>
            </h1>
            <p className="text-xl text-muted-foreground">Transform long URLs into short, shareable links instantly</p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
            <div className="space-y-3 p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
              <div className="text-3xl">⚡</div>
              <h3 className="font-semibold text-foreground">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">Instant URL shortening in milliseconds</p>
            </div>
            <div className="space-y-3 p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
              <div className="text-3xl">✨</div>
              <h3 className="font-semibold text-foreground">Simple & Clean</h3>
              <p className="text-sm text-muted-foreground">One-click copy to clipboard</p>
            </div>
            <div className="space-y-3 p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
              <div className="text-3xl">🔗</div>
              <h3 className="font-semibold text-foreground">Reliable</h3>
              <p className="text-sm text-muted-foreground">Always works, always available</p>
            </div>
          </div>

          {/* CTA Button */}
          <Link href="/shorten" className="inline-block">
            <Button size="lg" className="text-lg px-8 py-6 rounded-full gap-2 group">
              Start Shortening
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </main>
  )
}
