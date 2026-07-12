import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-ink px-6 py-16 max-w-3xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-muted hover:text-primary transition mb-12 font-mono text-sm">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
      <h1 className="font-display font-bold text-4xl mb-8">Terms of Service</h1>
      <p className="text-muted leading-relaxed mb-6">
        By using our website or engaging our services, you agree to these terms. On The Edge reserves the right to update these terms at any time.
      </p>
      <h2 className="font-display font-semibold text-xl mt-8 mb-3">Services</h2>
      <p className="text-muted leading-relaxed mb-6">
        On The Edge provides AI automation strategy, implementation, and support services. Scope, deliverables, and timelines are agreed upon in a separate service agreement with each client.
      </p>
      <h2 className="font-display font-semibold text-xl mt-8 mb-3">Limitation of Liability</h2>
      <p className="text-muted leading-relaxed mb-6">
        On The Edge is not liable for indirect, incidental, or consequential damages arising from the use of our services or this website.
      </p>
      <h2 className="font-display font-semibold text-xl mt-8 mb-3">Contact</h2>
      <p className="text-muted leading-relaxed">
        Questions? Email us at{' '}
        <a href="mailto:ontheedgeai@ontheedgeau.com" className="text-primary hover:underline">ontheedgeai@ontheedgeau.com</a>.
      </p>
    </div>
  )
}
