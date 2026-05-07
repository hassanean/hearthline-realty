import Image from 'next/image'
import Link from 'next/link'
import type { Property } from '@/types/property'
import { formatPrice } from '@/lib/properties'

interface Props {
  property: Property
  priority?: boolean
}

const STATUS_LABELS: Record<Property['status'], string> = {
  active: 'Active',
  pending: 'Under Contract',
  sold: 'Sold',
}

export default function PropertyCard({ property, priority = false }: Props) {
  const { id, status, address, neighborhood, city, state, price, beds, baths, sqft, type, imageUrl, openHouse } = property

  return (
    <Link href={`/listings/${id}`} className="card group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 rounded-2xl">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={address}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority={priority}
        />

        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span
            className={
              status === 'active'
                ? 'badge-active'
                : status === 'pending'
                ? 'badge-pending'
                : 'badge-sold'
            }
          >
            {STATUS_LABELS[status]}
          </span>
          {openHouse && status === 'active' && (
            <span className="badge bg-gold text-white">Open House</span>
          )}
        </div>

        {/* Type pill */}
        <div className="absolute top-3 right-3">
          <span className="badge bg-white/90 text-gray-700 shadow-sm">{type}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Price */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <p className="text-2xl font-serif font-semibold text-navy leading-none">
            {formatPrice(price)}
          </p>
        </div>

        {/* Address */}
        <p className="font-medium text-gray-900 leading-tight">{address}</p>
        <p className="text-sm text-gray-500 mt-0.5">
          {neighborhood}, {city}, {state}
        </p>

        {/* Stats */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-5 text-sm text-gray-600">
          <span className="flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gray-400" aria-hidden>
              <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" />
            </svg>
            <span>
              <strong className="text-gray-900">{beds}</strong> bd
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gray-400" aria-hidden>
              <path d="M7 6a1 1 0 010-2 1 1 0 010 2zm7-2a3 3 0 00-3 3v3H4V8H2v9a2 2 0 002 2h16a2 2 0 002-2v-5H14V7a1 1 0 011-1h7V4h-8z" />
            </svg>
            <span>
              <strong className="text-gray-900">{baths}</strong> ba
            </span>
          </span>
          <span className="flex items-center gap-1.5 ml-auto">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gray-400" aria-hidden>
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            <span>
              <strong className="text-gray-900">{sqft.toLocaleString()}</strong> sqft
            </span>
          </span>
        </div>

        {/* Open house */}
        {openHouse && status === 'active' && (
          <p className="mt-3 text-xs font-medium text-gold flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-gold" aria-hidden>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
            </svg>
            Open House: {openHouse}
          </p>
        )}
      </div>
    </Link>
  )
}
