import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm, ValidationError } from '@formspree/react'
import { ArrowLeft, ArrowUpRight, MessageSquare, Phone } from 'lucide-react'

const PHONE = '+61468825328'
const TEXT_BODY = "Hi Matt, I'd like a free sample homepage. My business is "

const samples = [
  { trade: 'Mobile mechanic', href: '/preview/sample-mobile-mechanic.html' },
  { trade: 'Driving school', href: '/preview/sample-driving-school.html' },
  { trade: 'Dog groomer', href: '/preview/sample-dog-groomer.html' },
  { trade: 'Concreter', href: '/preview/sample-concreter.html' },
  { trade: 'Removalist', href: '/preview/sample-removalist.html' },
  { trade: 'Pest control', href: '/preview/sample-pest-control.html' },
]

const faqs = [
  {
    q: 'Do I need to send you anything?',
    a: "No. I start from your Google listing and Facebook page. If you text me a few photos of your work and your prices, the sample gets even better.",
  },
  {
    q: "What if I don't like it?",
    a: "Then you don't pay anything. Tell me what to change, or just leave it there.",
  },
  {
    q: "I'm not on the Gold Coast. Does that matter?",
    a: "No. I build for businesses all over Australia. Everything is done by text, phone and email.",
  },
]

const inputClass =
  'w-full rounded-xl border border-divider bg-surface px-4 py-3 text-ink placeholder:text-muted/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30'

function Input({ id, label, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold mb-1.5">
        {label}
      </label>
      <input id={id} name={id} className={inputClass} {...props} />
    </div>
  )
}

function SampleForm() {
  const [state, submit] = useForm('mgogwzrb')
  const [source, setSource] = useState('')

  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    setSource(['utm_source', 'utm_campaign', 'utm_term', 'gclid'].map((k) => p.get(k) && `${k}=${p.get(k)}`).filter(Boolean).join('&'))
  }, [])

  if (state.succeeded) {
    return (
      <div className="rounded-2xl bg-surface border border-divider p-6 sm:p-8">
        <p className="font-display font-semibold text-2xl mb-2">Got it, thanks.</p>
        <p className="text-muted leading-relaxed">
          I'll build your sample and text you the link from 0468 825 328 within two business days.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="rounded-2xl bg-surface border border-divider p-6 sm:p-8 space-y-4">
      <input type="hidden" name="_subject" value="Free sample request (free-sample page)" />
      <input type="hidden" name="source" value={source || 'free-sample page'} />
      <Input id="business" label="Business name" required autoComplete="organization" />
      <div className="grid sm:grid-cols-2 gap-4">
        <Input id="trade" label="Trade or service" required placeholder="e.g. mechanic" />
        <Input id="suburb" label="Suburb" required autoComplete="address-level2" />
      </div>
      <Input id="mobile" label="Mobile" type="tel" required autoComplete="tel" inputMode="tel" placeholder="04xx xxx xxx" />
      <div>
        <label htmlFor="website" className="block text-sm font-semibold mb-1.5">
          Do you have a website now?
        </label>
        <select id="website" name="website" className={inputClass} defaultValue="No">
          <option>No</option>
          <option>Only Facebook or Instagram</option>
          <option>Yes, but it needs work</option>
        </select>
      </div>
      <ValidationError errors={state.errors} className="text-sm text-red-600" />
      <button
        type="submit"
        disabled={state.submitting}
        className="w-full rounded-xl bg-primary px-6 py-4 font-semibold text-white hover:bg-primary-dark active:scale-[0.98] transition disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        {state.submitting ? 'Sending…' : 'Build my free sample'}
      </button>
      <p className="text-xs text-muted leading-relaxed">
        I only use these details to build your sample and text you about it. Reply STOP any time and I'll delete them.{' '}
        <Link to="/privacy" className="underline hover:text-primary">Privacy policy</Link>
      </p>
    </form>
  )
}

export default function FreeSample() {
  useEffect(() => {
    document.title = 'Free sample website for your business | On The Edge'
  }, [])

  const textHref = `sms:${PHONE}?&body=${encodeURIComponent(TEXT_BODY)}`

  return (
    <div className="min-h-screen bg-background text-ink">
      <div className="max-w-5xl mx-auto px-6 py-10 sm:py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-muted hover:text-primary transition mb-10 text-sm">
          <ArrowLeft className="h-4 w-4" /> On The Edge
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start mb-16">
          <div>
            <h1 className="font-display font-bold text-[2rem] sm:text-5xl leading-tight mb-5">
              A website for your business.
              <br />
              See it free before you pay.
            </h1>
            <p className="text-lg text-muted leading-relaxed mb-6">
              Tell me your trade and suburb. I'll build a sample homepage with your name, your suburbs and a tap-to-call button, and text you the link within two business days. If you like it, the first month is free.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-divider bg-surface px-5 py-3.5 font-semibold text-ink hover:border-primary active:scale-[0.98] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <Phone className="h-5 w-5" /> Call 0468 825 328
              </a>
              <a
                href={textHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-divider bg-surface px-5 py-3.5 font-semibold text-ink hover:border-primary active:scale-[0.98] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <MessageSquare className="h-5 w-5" /> Text me instead
              </a>
            </div>
          </div>
          <SampleForm />
        </div>

        <h2 className="font-display font-semibold text-2xl mb-3">See what you'd get</h2>
        <p className="text-muted leading-relaxed mb-6 max-w-2xl">
          These are sample sites for made-up businesses. Yours gets your real name, suburbs, services and Google rating.
        </p>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 border-t border-divider mb-16">
          {samples.map((s) => (
            <li key={s.href} className="border-b border-divider">
              <a
                href={s.href}
                target="_blank"
                rel="noopener"
                className="flex items-center justify-between py-4 font-semibold hover:text-primary transition"
              >
                {s.trade} <ArrowUpRight className="h-4 w-4 text-muted" />
              </a>
            </li>
          ))}
        </ul>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 mb-16">
          <div>
            <h2 className="font-display font-semibold text-2xl mb-5">What it costs, once you've seen it</h2>
            <div className="space-y-5">
              <div className="rounded-2xl bg-surface border border-divider p-6">
                <p className="font-semibold mb-1">Monthly</p>
                <p className="text-muted leading-relaxed">
                  First month free. Then <span className="text-ink font-semibold">$149 a month</span> for 12 months, plus <span className="text-ink font-semibold">$299</span> to set up ($2,087 all up for the year). Covers the site, your Google profile set up properly, a review link for customers, hosting and small changes within two business days.
                </p>
              </div>
              <div className="rounded-2xl bg-surface border border-divider p-6">
                <p className="font-semibold mb-1">Pay once</p>
                <p className="text-muted leading-relaxed">
                  <span className="text-ink font-semibold">$1,500</span> and the site is yours, plus $49 a month for hosting and changes. No contract.
                </p>
              </div>
            </div>
            <p className="text-sm text-muted leading-relaxed mt-5">
              On the monthly plan, if the site hasn't brought you a real enquiry within 90 days of going live (a call of a minute or more, a form or a Google message), the monthly stops until one comes.
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-2xl mb-5">Who you're dealing with</h2>
            <p className="text-muted leading-relaxed mb-4">
              Just me. I'm Matt, I'm on the Gold Coast and I build every site myself. No agency, no account manager. You text me, I fix it.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              Your web address is registered in your name, so it's always yours.
            </p>
            <h2 className="font-display font-semibold text-2xl mb-5">Questions</h2>
            <dl className="space-y-5">
              {faqs.map((f) => (
                <div key={f.q}>
                  <dt className="font-semibold mb-1">{f.q}</dt>
                  <dd className="text-muted leading-relaxed">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="border-t border-divider pt-8 text-sm text-muted">
          <p className="mb-1">Matthew Logan, On The Edge, Gold Coast QLD</p>
          <p>
            <a href={`tel:${PHONE}`} className="hover:text-primary">0468 825 328</a>
            {' · '}
            <a href="mailto:ontheedgeai@ontheedgeau.com" className="hover:text-primary">ontheedgeai@ontheedgeau.com</a>
            {' · '}
            <Link to="/privacy" className="hover:text-primary">Privacy</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
