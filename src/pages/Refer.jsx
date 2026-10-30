import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, MessageSquare, Phone } from 'lucide-react'

const PHONE = '+61468825328'
const JOIN_TEXT = "I'm in for the referral program. My name is "

const steps = [
  {
    title: 'Text me "I\'m in"',
    body: "I'll text back your own code (your first name and a number) and a couple of lines you can pass on.",
  },
  {
    title: 'Mention me to a business owner',
    body: 'With their OK, give them my number and your code, or text me their name, business and number.',
  },
  {
    title: 'They pay, you get paid',
    body: "$250 by bank transfer once they've made their second monthly payment, or paid in full.",
  },
]

const rules = [
  'Personal intros only. No bulk texts or emails, cold calls or posts in groups about me. Posting on your own socials is fine.',
  "Only pass on someone's details if they've said it's OK.",
  "Be upfront that you get a referral fee. Accountants and BAS agents need to tell their clients about it.",
  'If two people introduce the same business, the first intro counts.',
  "A business I've already texted or emailed in the last 60 days doesn't count, unless your intro is what gets them talking to me. I'll tell you straight away if that's the case.",
  "You can't refer your own business.",
  'If you run a business, I need your ABN. If you don\'t, you fill in the ATO "Statement by a supplier" form instead.',
  'I can change or end the program with 30 days\' notice. Anything you\'ve already earned still gets paid.',
]

export default function Refer() {
  useEffect(() => {
    document.title = 'Refer a tradie, get $250 | On The Edge'
  }, [])

  const joinHref = `sms:${PHONE}?&body=${encodeURIComponent(JOIN_TEXT)}`

  return (
    <div className="min-h-screen bg-background text-ink">
      <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-muted hover:text-primary transition mb-10 text-sm">
          <ArrowLeft className="h-4 w-4" /> On The Edge
        </Link>

        <h1 className="font-display font-bold text-[2rem] sm:text-5xl leading-tight mb-5">
          Know a tradie without a website?
          <br />
          Send them my way.
        </h1>
        <p className="text-lg text-muted leading-relaxed mb-8 max-w-xl">
          I build websites for small businesses. Introduce me to one that needs a site, and when they become a paying client I pay you <span className="text-ink font-semibold">$250</span>. Every third one in a year earns you another $250 on top.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-14">
          <a
            href={joinHref}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-semibold text-white hover:bg-primary-dark active:scale-[0.98] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <MessageSquare className="h-5 w-5" /> Text Matt to join
          </a>
          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-divider bg-surface px-6 py-4 font-semibold text-ink hover:border-primary active:scale-[0.98] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Phone className="h-5 w-5" /> Call 0468 825 328
          </a>
        </div>

        <h2 className="font-display font-semibold text-2xl mb-6">How it works</h2>
        <ol className="space-y-6 mb-14">
          {steps.map((s, i) => (
            <li key={s.title} className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink font-display font-bold text-white">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold mb-1">{s.title}</p>
                <p className="text-muted leading-relaxed">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="rounded-2xl bg-surface border border-divider p-6 sm:p-8 mb-14">
          <h2 className="font-display font-semibold text-2xl mb-4">What the business gets</h2>
          <ul className="space-y-3 text-muted leading-relaxed">
            <li><span className="text-ink font-semibold">A free sample homepage</span> to look at before they decide anything.</li>
            <li><span className="text-ink font-semibold">A free Google Business Profile setup</span> (normally $350) for coming through you.</li>
            <li><span className="text-ink font-semibold">Nothing to pay</span> until they've seen their site and they're happy with it.</li>
          </ul>
        </div>

        <h2 className="font-display font-semibold text-2xl mb-3">Who this suits</h2>
        <p className="text-muted leading-relaxed mb-14">
          Anyone who knows tradies: mates and family, other tradies, sign writers and wrap shops, workwear and uniform shops, trade printers and insurance brokers.
        </p>

        <h2 className="font-display font-semibold text-2xl mb-5">The fine print</h2>
        <ul className="space-y-3 text-muted leading-relaxed mb-14 list-disc pl-5">
          {rules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>

        <div className="border-t border-divider pt-8 text-sm text-muted">
          <p className="mb-1">Matthew Logan, On The Edge</p>
          <p>
            <a href={`tel:${PHONE}`} className="hover:text-primary">0468 825 328</a>
            {' · '}
            <a href="mailto:ontheedgeai@ontheedgeau.com" className="hover:text-primary">ontheedgeai@ontheedgeau.com</a>
          </p>
        </div>
      </div>
    </div>
  )
}
