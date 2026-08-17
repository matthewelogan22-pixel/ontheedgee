import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-ink px-6 py-16 max-w-3xl mx-auto flex flex-col items-center justify-center text-center">
      <p className="font-mono text-sm text-primary uppercase tracking-[0.25em] mb-4">404</p>
      <h1 className="font-display font-bold text-4xl mb-4">Page not found</h1>
      <p className="text-muted leading-relaxed mb-10 max-w-md">
        The page you're looking for doesn't exist, or it's moved.
      </p>
      <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline font-mono text-sm">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
    </div>
  )
}
