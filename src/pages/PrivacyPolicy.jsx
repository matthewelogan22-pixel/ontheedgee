import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-ink px-6 py-16 max-w-3xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-muted hover:text-primary transition mb-12 font-mono text-sm">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
      <h1 className="font-display font-bold text-4xl mb-8">Privacy Policy</h1>
      <p className="text-muted leading-relaxed mb-6">
        On The Edge ("we", "us", "our") respects your privacy. This policy explains how we collect, use, and protect your information when you use our website or services.
      </p>
      <h2 className="font-display font-semibold text-xl mt-8 mb-3">Information We Collect</h2>
      <p className="text-muted leading-relaxed mb-6">
        We collect information you provide directly — such as your name, email, and business details when you contact us. We do not sell your data to third parties.
      </p>
      <h2 className="font-display font-semibold text-xl mt-8 mb-3">How We Use It</h2>
      <p className="text-muted leading-relaxed mb-6">
        We use your information solely to respond to your enquiry, deliver our services, and improve our offerings. We will not contact you for unrelated marketing without your consent.
      </p>
      <h2 className="font-display font-semibold text-xl mt-8 mb-3">Contact</h2>
      <p className="text-muted leading-relaxed">
        Questions? Email us at{' '}
        <a href="mailto:ontheedgeai@ontheedgeau.com" className="text-primary hover:underline">ontheedgeai@ontheedgeau.com</a>.
      </p>
    </div>
  )
}
