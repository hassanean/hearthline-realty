'use client'

import { useEffect, useState, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import type { Property } from '@/types/property'
import PropertyCard from '@/components/PropertyCard'
import { formatPrice } from '@/lib/properties'

const PRICE_OPTIONS = [
  { label: 'Any Price', value: '' },
  { label: 'Up to $600K', value: '600000' },
  { label: 'Up to $800K', value: '800000' },
  { label: 'Up to $1M', value: '1000000' },
  { label: 'Up to $1.5M', value: '1500000' },
]

const BED_OPTIONS = [
  { label: 'Any Beds', value: '' },
  { label: '1+', value: '1' },
  { label: '2+', value: '2' },
  { label: '3+', value: '3' },
  { label: '4+', value: '4' },
]

const TYPE_OPTIONS = [
  { label: 'Any Type', value: '' },
  { label: 'House', value: 'House' },
  { label: 'Condo', value: 'Condo' },
  { label: 'Townhouse', value: 'Townhouse' },
]

const STATUS_OPTIONS = [
  { label: 'Active', value: 'active' },
  { label: 'Pending', value: 'pending' },
  { label: 'All', value: '' },
]

function FilterSelect({
  name,
  options,
  value,
  onChange,
}: {
  name: string
  options: { label: string; value: string }[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <select
      aria-label={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-navy/30 cursor-pointer"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}

function ListingsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [allProperties, setAllProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  const neighborhood = searchParams.get('neighborhood') ?? ''
  const maxPrice = searchParams.get('maxPrice') ?? ''
  const minBeds = searchParams.get('minBeds') ?? ''
  const type = searchParams.get('type') ?? ''
  const status = searchParams.get('status') ?? 'active'

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.replace(`/listings?${params.toString()}`, { scroll: false })
    },
    [searchParams, router],
  )

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (neighborhood) params.set('neighborhood', neighborhood)
    if (maxPrice) params.set('maxPrice', maxPrice)
    if (minBeds) params.set('minBeds', minBeds)
    if (type) params.set('type', type)
    if (status) params.set('status', status)

    fetch(`/api/listings?${params.toString()}`)
      .then((r) => r.json())
      .then((data: Property[]) => {
        setAllProperties(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [neighborhood, maxPrice, minBeds, type, status])

  const hasFilters = !!(neighborhood || maxPrice || minBeds || type || (status && status !== 'active'))

  return (
    <div className="pt-16 min-h-screen bg-warm-50">
      {/* Page header */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="container-wide py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <h1 className="font-serif text-xl font-semibold text-navy mr-auto whitespace-nowrap">
              {loading ? 'Loading...' : `${allProperties.length} Home${allProperties.length !== 1 ? 's' : ''}`}
            </h1>

            <div className="flex flex-wrap items-center gap-2">
              <FilterSelect
                name="Neighborhood"
                options={[
                  { label: 'Any Neighborhood', value: '' },
                  ...['Ballard','Capitol Hill','Fremont','Queen Anne','West Seattle','Bellevue','Redmond','Kirkland'].map((n) => ({
                    label: n, value: n,
                  })),
                ]}
                value={neighborhood}
                onChange={(v) => updateFilter('neighborhood', v)}
              />
              <FilterSelect
                name="Max Price"
                options={PRICE_OPTIONS}
                value={maxPrice}
                onChange={(v) => updateFilter('maxPrice', v)}
              />
              <FilterSelect
                name="Beds"
                options={BED_OPTIONS}
                value={minBeds}
                onChange={(v) => updateFilter('minBeds', v)}
              />
              <FilterSelect
                name="Type"
                options={TYPE_OPTIONS}
                value={type}
                onChange={(v) => updateFilter('type', v)}
              />
              <FilterSelect
                name="Status"
                options={STATUS_OPTIONS}
                value={status}
                onChange={(v) => updateFilter('status', v)}
              />

              {hasFilters && (
                <button
                  onClick={() => router.replace('/listings')}
                  className="text-xs font-medium text-gray-500 hover:text-navy underline underline-offset-2 transition-colors px-2 py-2"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container-wide py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
                <div className="aspect-[4/3] bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : allProperties.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🏡</div>
            <h2 className="text-xl font-serif font-semibold text-navy mb-2">No homes found</h2>
            <p className="text-gray-500 text-sm mb-6">Try adjusting your filters to see more results.</p>
            <button onClick={() => router.replace('/listings')} className="btn-outline text-sm py-2">
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            {/* Active filter pills */}
            {hasFilters && (
              <div className="flex flex-wrap gap-2 mb-6">
                {neighborhood && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-navy/10 text-navy text-xs font-medium rounded-full">
                    {neighborhood}
                    <button onClick={() => updateFilter('neighborhood', '')} className="hover:text-gold transition-colors" aria-label="Remove neighborhood filter">×</button>
                  </span>
                )}
                {maxPrice && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-navy/10 text-navy text-xs font-medium rounded-full">
                    Up to {formatPrice(Number(maxPrice))}
                    <button onClick={() => updateFilter('maxPrice', '')} className="hover:text-gold transition-colors" aria-label="Remove price filter">×</button>
                  </span>
                )}
                {minBeds && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-navy/10 text-navy text-xs font-medium rounded-full">
                    {minBeds}+ beds
                    <button onClick={() => updateFilter('minBeds', '')} className="hover:text-gold transition-colors" aria-label="Remove beds filter">×</button>
                  </span>
                )}
                {type && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-navy/10 text-navy text-xs font-medium rounded-full">
                    {type}
                    <button onClick={() => updateFilter('type', '')} className="hover:text-gold transition-colors" aria-label="Remove type filter">×</button>
                  </span>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allProperties.map((property, i) => (
                <PropertyCard key={property.id} property={property} priority={i < 3} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function ListingsPage() {
  return (
    <Suspense fallback={
      <div className="pt-16 min-h-screen bg-warm-50 flex items-center justify-center">
        <div className="text-gray-400 text-sm">Loading listings…</div>
      </div>
    }>
      <ListingsContent />
    </Suspense>
  )
}
