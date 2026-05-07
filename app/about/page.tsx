import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet the Hearthline Realty team — local experts who guide you from first showing to closing day.',
}

const TEAM = [
  {
    name: 'Alexandra Reed',
    role: 'Founder & Principal Broker',
    bio: '15+ years in Seattle real estate. Specializes in Ballard, Fremont, and North Seattle neighborhoods.',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Marcus Chen',
    role: 'Buyer\'s Agent, Eastside',
    bio: 'Former tech professional turned agent. Deep expertise in Redmond, Bellevue, and Kirkland markets.',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Priya Nair',
    role: 'Buyer\'s Agent, South Seattle',
    bio: 'Capitol Hill and West Seattle specialist with a passion for connecting first-time buyers to the right home.',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  },
]

const VALUES = [
  {
    title: 'Transparent Pricing',
    body: 'No surprise fees. Every offer we craft includes a complete breakdown of costs so you know exactly where your money is going.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-gold" aria-hidden>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
      </svg>
    ),
  },
  {
    title: 'Local Expertise',
    body: 'Our agents live and work in the neighborhoods they sell. We know the comps, the schools, and the blocks that matter.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-gold" aria-hidden>
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
  },
  {
    title: 'Flexible Scheduling',
    body: 'Same-day tours available for active listings. Evening and weekend appointments always welcome.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-gold" aria-hidden>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 5H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
      </svg>
    ),
  },
  {
    title: 'Data-Driven Offers',
    body: 'Every offer we write is backed by real-time market analysis and comparable sales — not gut instinct.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-gold" aria-hidden>
        <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z" />
      </svg>
    ),
  },
]

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative bg-navy py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=60"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="relative container-wide text-center">
          <p className="section-label text-gold-light mb-4">Our Story</p>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-6 max-w-2xl mx-auto">
            A different kind of real estate experience
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
            Hearthline was founded on a simple belief: buying a home should be exciting — not stressful. We put clarity, honesty, and your timeline first.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container-wide">
          <div className="text-center mb-14">
            <p className="section-label mb-3">What We Stand For</p>
            <h2 className="text-3xl font-serif font-semibold text-navy">Our core values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ title, body, icon }) => (
              <div key={title} className="bg-warm-50 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  {icon}
                </div>
                <h3 className="font-serif font-semibold text-navy mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-warm-50">
        <div className="container-wide">
          <div className="text-center mb-14">
            <p className="section-label mb-3">The Team</p>
            <h2 className="text-3xl font-serif font-semibold text-navy">Meet your agents</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {TEAM.map(({ name, role, bio, img }) => (
              <div key={name} className="text-center group">
                <div className="relative w-28 h-28 mx-auto mb-4 rounded-2xl overflow-hidden">
                  <Image
                    src={img}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-serif font-semibold text-navy">{name}</h3>
                <p className="text-gold text-xs font-medium uppercase tracking-wide mt-1 mb-2">{role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-navy">
        <div className="container-wide">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { stat: '15+', label: 'Years of Experience' },
              { stat: '800+', label: 'Homes Sold' },
              { stat: '98%', label: 'Client Satisfaction' },
              { stat: '8', label: 'Neighborhoods Served' },
            ].map(({ stat, label }) => (
              <div key={label}>
                <p className="text-4xl font-serif font-bold text-gold mb-1">{stat}</p>
                <p className="text-white/60 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
        <div className="container-wide">
          <h2 className="text-3xl font-serif font-semibold text-navy mb-4">Ready to find your home?</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            Browse our current listings or reach out to schedule a free consultation with one of our agents.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/listings" className="btn-primary">Browse Listings</Link>
            <Link href="/contact" className="btn-outline">Get in Touch</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
