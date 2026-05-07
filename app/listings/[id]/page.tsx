import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPropertyById, getAllProperties, formatPrice, formatNumber } from '@/lib/properties'

export const revalidate = 60

export async function generateStaticParams() {
  const properties = await getAllProperties()
  return properties.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const property = await getPropertyById(id)
  if (!property) return { title: 'Listing Not Found' }

  const { address, neighborhood, city, state, price, beds, baths, sqft } = property
  return {
    title: `${address} — ${formatPrice(price)}`,
    description: `${beds} bed, ${baths} bath ${property.type.toLowerCase()} in ${neighborhood}, ${city}, ${state}. ${formatNumber(sqft)} sqft. ${formatPrice(price)}.`,
    openGraph: {
      title: `${address} | Hearthline Realty`,
      images: [{ url: property.imageUrl, width: 1200, height: 800 }],
    },
  }
}

const SCORE_COLOR = (score: number) =>
  score >= 90 ? 'text-emerald-600 bg-emerald-50' :
  score >= 70 ? 'text-amber-600 bg-amber-50' :
  'text-orange-600 bg-orange-50'

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const property = await getPropertyById(id)
  if (!property) notFound()

  const {
    address, neighborhood, city, state, zip, price, beds, baths, sqft,
    type, yearBuilt, lotSize, hoaFee, propertyTax, openHouse, status,
    description, features, imageUrl, imageUrls, walkScore, transitScore, bikeScore,
  } = property

  const allImages = imageUrls.length > 0 ? imageUrls : [imageUrl]

  const statusLabel =
    status === 'active' ? 'Active Listing' :
    status === 'pending' ? 'Under Contract' : 'Sold'

  const statusClass =
    status === 'active' ? 'badge-active' :
    status === 'pending' ? 'badge-pending' : 'badge-sold'

  return (
    <div className="pt-16 min-h-screen bg-warm-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-wide py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-navy transition-colors">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-navy transition-colors">Listings</Link>
          <span>/</span>
          <Link
            href={`/listings?neighborhood=${encodeURIComponent(neighborhood)}`}
            className="hover:text-navy transition-colors"
          >
            {neighborhood}
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium truncate max-w-xs">{address}</span>
        </div>
      </div>

      {/* Image gallery */}
      <div className="bg-gray-900">
        <div className="container-wide py-4">
          <div className="grid grid-cols-4 gap-2 rounded-2xl overflow-hidden" style={{ maxHeight: 480 }}>
            {/* Main image */}
            <div className="col-span-4 lg:col-span-2 relative" style={{ minHeight: 320 }}>
              <Image
                src={allImages[0]}
                alt={`${address} — main view`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Thumbnails */}
            <div className="hidden lg:grid col-span-2 grid-cols-2 gap-2">
              {allImages.slice(1, 5).map((src, i) => (
                <div key={i} className="relative">
                  <Image
                    src={src}
                    alt={`${address} — photo ${i + 2}`}
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container-wide py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title block */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={statusClass}>{statusLabel}</span>
                <span className="badge bg-warm-100 text-gray-700">{type}</span>
                {openHouse && status === 'active' && (
                  <span className="badge bg-gold text-white">Open House: {openHouse}</span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-navy leading-tight mb-1">
                {address}
              </h1>
              <p className="text-gray-500 mb-4">
                {neighborhood}, {city}, {state} {zip}
              </p>
              <div className="text-3xl font-serif font-bold text-navy">{formatPrice(price)}</div>

              {/* Key stats bar */}
              <div className="mt-4 flex flex-wrap gap-5 text-sm text-gray-700 border-t border-gray-100 pt-4">
                <span className="flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gray-400" aria-hidden><path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" /></svg>
                  <strong>{beds}</strong> Beds
                </span>
                <span className="flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gray-400" aria-hidden><path d="M7 6a1 1 0 010-2 1 1 0 010 2zm7-2a3 3 0 00-3 3v3H4V8H2v9a2 2 0 002 2h16a2 2 0 002-2v-5H14V7a1 1 0 011-1h7V4h-8z" /></svg>
                  <strong>{baths}</strong> Baths
                </span>
                <span className="flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gray-400" aria-hidden><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
                  <strong>{formatNumber(sqft)}</strong> sqft
                </span>
                {lotSize && (
                  <span className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gray-400" aria-hidden><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" /></svg>
                    <strong>{formatNumber(lotSize)}</strong> sqft lot
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-serif text-lg font-semibold text-navy mb-4">About this home</h2>
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>

            {/* Features */}
            {features.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="font-serif text-lg font-semibold text-navy mb-4">Features &amp; Amenities</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gold flex-shrink-0 mt-0.5" aria-hidden>
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Property details grid */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-serif text-lg font-semibold text-navy mb-4">Property Details</h2>
              <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: 'MLS ID', value: property.id.toUpperCase() },
                  { label: 'Property Type', value: type },
                  { label: 'Year Built', value: yearBuilt },
                  { label: 'Square Footage', value: `${formatNumber(sqft)} sqft` },
                  ...(lotSize ? [{ label: 'Lot Size', value: `${formatNumber(lotSize)} sqft` }] : []),
                  { label: 'HOA Fee', value: hoaFee > 0 ? `${formatPrice(hoaFee)}/mo` : 'None' },
                  { label: 'Est. Annual Tax', value: formatPrice(propertyTax) },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-warm-50 rounded-xl p-3">
                    <dt className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">{label}</dt>
                    <dd className="font-semibold text-navy text-sm">{String(value)}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Walkability scores */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-serif text-lg font-semibold text-navy mb-4">Location Scores</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Walk Score', score: walkScore, icon: '🚶' },
                  { label: 'Transit Score', score: transitScore, icon: '🚌' },
                  { label: 'Bike Score', score: bikeScore, icon: '🚲' },
                ].map(({ label, score, icon }) => (
                  <div key={label} className="text-center">
                    <div className={`text-3xl font-serif font-bold mb-1 inline-block px-3 py-1.5 rounded-xl ${SCORE_COLOR(score)}`}>
                      {score}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{icon} {label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: sticky contact card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Schedule card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="text-center mb-5">
                  <p className="text-2xl font-serif font-bold text-navy">{formatPrice(price)}</p>
                  {hoaFee > 0 && (
                    <p className="text-xs text-gray-500 mt-1">+ {formatPrice(hoaFee)}/mo HOA</p>
                  )}
                </div>

                {openHouse && status === 'active' && (
                  <div className="bg-gold/10 border border-gold/20 rounded-xl p-3 mb-4 text-center">
                    <p className="text-xs font-semibold text-gold-dark uppercase tracking-wide">Open House</p>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">{openHouse}</p>
                  </div>
                )}

                <div className="space-y-3">
                  <Link
                    href={`/contact?listing=${id}`}
                    className="btn-gold w-full text-center py-3"
                  >
                    Schedule a Tour
                  </Link>
                  <Link
                    href={`/contact?listing=${id}&type=info`}
                    className="btn-outline w-full text-center py-3"
                  >
                    Request More Info
                  </Link>
                  <a
                    href="tel:+12065550172"
                    className="flex items-center justify-center gap-2 w-full py-3 text-sm text-gray-600 hover:text-navy transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                    (206) 555-0172
                  </a>
                </div>
              </div>

              {/* Agent card */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 bg-navy rounded-full flex items-center justify-center text-white font-semibold">
                    HR
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Hearthline Realty</p>
                    <p className="text-xs text-gray-500">Listing Agent</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  5414 Leary Ave NW, Seattle, WA 98107<br />
                  Mon–Fri 9am–6pm · Sat–Sun 10am–4pm
                </p>
                <a
                  href="mailto:hello@hearthline.realty"
                  className="mt-2 block text-xs text-gold hover:text-gold-dark transition-colors"
                >
                  hello@hearthline.realty
                </a>
              </div>

              {/* Share */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Share this listing</p>
                <div className="flex items-center gap-2">
                  <input
                    readOnly
                    value={typeof window !== 'undefined' ? window.location.href : `https://hearthline.realty/listings/${id}`}
                    className="flex-1 text-xs px-3 py-2 bg-warm-50 border border-gray-200 rounded-lg text-gray-600 truncate focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to listings */}
      <div className="container-wide pb-12">
        <Link
          href="/listings"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-navy transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
          </svg>
          Back to all listings
        </Link>
      </div>
    </div>
  )
}
