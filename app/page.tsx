import Link from 'next/link'
import Image from 'next/image'
import { getAllProperties, formatPrice } from '@/lib/properties'
import PropertyCard from '@/components/PropertyCard'
import ChatButton from '@/components/ChatButton'

export const revalidate = 60

const NEIGHBORHOODS = [
  { name: 'Ballard', img: 'photo-1576941089067-2de3c901e126' },
  { name: 'Capitol Hill', img: 'photo-1512917774080-9991f1c4c750' },
  { name: 'Fremont', img: 'photo-1600596542815-ffad4c1539a9' },
  { name: 'Queen Anne', img: 'photo-1568605114967-8130f3a36994' },
  { name: 'West Seattle', img: 'photo-1560448075-cbc16bb4af8e' },
  { name: 'Bellevue', img: 'photo-1582268611958-ebfd161ef9cf' },
  { name: 'Redmond', img: 'photo-1625603736199-775425d2890a' },
  { name: 'Kirkland', img: 'photo-1502672260266-1c1ef2d93688' },
]

const STEPS = [
  {
    n: '01',
    title: 'Get Pre-Qualified',
    body: 'Work with our lending partners to understand your buying power — no impact to your credit score.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-gold" aria-hidden>
        <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Tour Homes',
    body: 'Schedule in-person or virtual tours on your timeline. Same-day showings available for active listings.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-gold" aria-hidden>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Make an Offer',
    body: 'Our agents use real-time comps and market data to craft competitive offers that protect your interests.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-gold" aria-hidden>
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
    ),
  },
]

const TESTIMONIALS = [
  {
    quote: 'Our agent knew every comp in the area and saved us $22K below asking. The whole process felt effortless.',
    author: 'Sarah & Marcus T.',
    area: 'Ballard buyers',
    avatar: 'S',
  },
  {
    quote: 'We toured the same day we called and had an accepted offer in 48 hours. Truly exceptional service.',
    author: 'Jennifer L.',
    area: 'Capitol Hill buyer',
    avatar: 'J',
  },
  {
    quote: 'As first-time buyers we were nervous, but Hearthline walked us through every single step with patience.',
    author: 'David & Priya K.',
    area: 'West Seattle buyers',
    avatar: 'D',
  },
]

export default async function HomePage() {
  const allProperties = await getAllProperties()
  const featured = allProperties.filter((p) => p.status === 'active').slice(0, 3)

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80"
            alt="Modern home exterior at dusk"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy/80" />
        </div>

        <div className="relative z-10 container-wide pt-24 pb-16 w-full">
          <div className="max-w-3xl">
            <p className="section-label text-gold-light mb-4">Seattle &amp; Eastside Real Estate</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6">
              Find the place you&apos;ll love{' '}
              <span className="italic text-gold-light">coming home to</span>
            </h1>
            <p className="text-lg text-white/75 mb-10 max-w-xl leading-relaxed">
              Local expertise, transparent pricing, and a guided experience — from first showing to closing day.
            </p>

            {/* Search card */}
            <div className="bg-white rounded-2xl p-5 shadow-2xl max-w-2xl">
              <form action="/listings" method="GET">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                  <select
                    name="neighborhood"
                    className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-navy/30"
                  >
                    <option value="">Any Neighborhood</option>
                    {NEIGHBORHOODS.map((n) => (
                      <option key={n.name} value={n.name}>
                        {n.name}
                      </option>
                    ))}
                  </select>
                  <select
                    name="minBeds"
                    className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-navy/30"
                  >
                    <option value="">Any Beds</option>
                    <option value="1">1+ Beds</option>
                    <option value="2">2+ Beds</option>
                    <option value="3">3+ Beds</option>
                    <option value="4">4+ Beds</option>
                  </select>
                  <select
                    name="maxPrice"
                    className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-navy/30"
                  >
                    <option value="">Any Price</option>
                    <option value="600000">Up to $600K</option>
                    <option value="800000">Up to $800K</option>
                    <option value="1000000">Up to $1M</option>
                    <option value="1500000">Up to $1.5M</option>
                  </select>
                </div>
                <button type="submit" className="w-full btn-primary justify-center py-3">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
                    <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                  </svg>
                  Search Homes
                </button>
              </form>
            </div>

            {/* Quick stats */}
            <div className="mt-8 flex flex-wrap gap-6 text-white/70 text-sm">
              <span>
                <strong className="text-white text-2xl font-serif">{allProperties.length}</strong>{' '}
                active listings
              </span>
              <span>
                <strong className="text-white text-2xl font-serif">
                  {formatPrice(Math.min(...allProperties.map((p) => p.price)))}
                </strong>{' '}
                starting price
              </span>
              <span>
                <strong className="text-white text-2xl font-serif">8</strong> neighborhoods
              </span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white/50" aria-hidden>
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </svg>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 bg-white">
        <div className="container-wide">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Simple Process</p>
            <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-navy">
              How it works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {STEPS.map((step) => (
              <div key={step.n} className="text-center group">
                <div className="relative inline-flex mb-6">
                  <div className="w-16 h-16 bg-warm-100 rounded-2xl flex items-center justify-center group-hover:bg-warm-200 transition-colors">
                    {step.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-navy text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {step.n.slice(1)}
                  </span>
                </div>
                <h3 className="text-lg font-serif font-semibold text-navy mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center flex flex-wrap gap-4 justify-center">
            <Link href="/listings" className="btn-primary">
              Browse All Listings
            </Link>
            <Link href="/contact" className="btn-outline">
              Schedule a Tour
            </Link>
            <ChatButton variant="outline" />
          </div>
        </div>
      </section>

      {/* ── Featured Listings ── */}
      {featured.length > 0 && (
        <section className="py-20 bg-warm-50">
          <div className="container-wide">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="section-label mb-3">Just Listed</p>
                <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-navy">
                  Featured homes
                </h2>
              </div>
              <Link
                href="/listings"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:text-gold transition-colors"
              >
                View all
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((property, i) => (
                <PropertyCard key={property.id} property={property} priority={i === 0} />
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link href="/listings" className="btn-outline">
                View All Listings
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Neighborhoods ── */}
      <section className="py-20 bg-white">
        <div className="container-wide">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Explore</p>
            <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-navy">
              Browse by neighborhood
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
            {NEIGHBORHOODS.map(({ name, img }) => (
              <Link
                key={name}
                href={`/listings?neighborhood=${encodeURIComponent(name)}`}
                className="relative group overflow-hidden rounded-xl aspect-square"
              >
                <Image
                  src={`https://images.unsplash.com/${img}?auto=format&fit=crop&w=400&q=70`}
                  alt={name}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white font-medium text-sm">{name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 bg-navy">
        <div className="container-wide">
          <div className="text-center mb-12">
            <p className="section-label text-gold-light mb-3">What Clients Say</p>
            <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-white">
              Trusted by Seattle buyers
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ quote, author, area, avatar }) => (
              <div key={author} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" className="w-4 h-4 fill-gold" aria-hidden>
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-5 italic">&ldquo;{quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gold/30 rounded-full flex items-center justify-center text-gold font-semibold text-sm flex-shrink-0">
                    {avatar}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{author}</p>
                    <p className="text-white/50 text-xs">{area}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-warm-100">
        <div className="container-wide text-center">
          <p className="section-label mb-4">Ready to Start?</p>
          <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-navy mb-4">
            Your next chapter starts here
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed">
            Whether you&apos;re buying your first home or your fifth, Hearthline agents are ready to guide you with transparent advice and no pressure.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Schedule a Free Consultation
            </Link>
            <ChatButton variant="outline" />
            <Link href="/listings" className="btn-outline">
              Browse Listings
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
