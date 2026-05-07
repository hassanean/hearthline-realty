import Link from 'next/link'

const LINKS = {
  Company: [
    { href: '/about', label: 'About Us' },
    { href: '/listings', label: 'Browse Listings' },
    { href: '/contact', label: 'Contact' },
  ],
  Resources: [
    { href: '/contact#tour', label: 'Schedule a Tour' },
    { href: '/contact#qualify', label: 'Get Pre-Qualified' },
  ],
  Legal: [
    { href: '#', label: 'Privacy Policy' },
    { href: '#', label: 'Terms of Service' },
    { href: '#', label: 'Fair Housing Notice' },
  ],
}

const NEIGHBORHOODS = [
  'Ballard', 'Capitol Hill', 'Fremont', 'Queen Anne',
  'West Seattle', 'Bellevue', 'Redmond', 'Kirkland',
]

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
              </div>
              <span className="font-serif text-lg font-semibold text-white">Hearthline Realty</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-5 max-w-xs">
              Local expertise, transparent pricing, and a guided experience from first showing to closing day.
            </p>
            <div className="space-y-2 text-sm text-white/60">
              <p>5414 Leary Ave NW, Seattle, WA 98107</p>
              <p>
                <a href="tel:+12065550172" className="hover:text-gold transition-colors">
                  (206) 555-0172
                </a>
              </p>
              <p>
                <a href="mailto:hello@hearthline.realty" className="hover:text-gold transition-colors">
                  hello@hearthline.realty
                </a>
              </p>
              <p className="text-white/40 text-xs mt-3">
                Mon–Fri 9am–6pm &nbsp;·&nbsp; Sat–Sun 10am–4pm
              </p>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gold mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Neighborhoods */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-4">Neighborhoods We Serve</p>
          <div className="flex flex-wrap gap-2">
            {NEIGHBORHOODS.map((n) => (
              <Link
                key={n}
                href={`/listings?neighborhood=${encodeURIComponent(n)}`}
                className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/60
                           hover:border-gold hover:text-gold transition-colors"
              >
                {n}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Hearthline Realty. All rights reserved.</p>
          <p>
            <span className="inline-flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current" aria-hidden>
                <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-7 3a4 4 0 110 8 4 4 0 010-8zm0 14c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z" />
              </svg>
              Equal Housing Opportunity
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
