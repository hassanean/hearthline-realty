import { NextRequest, NextResponse } from 'next/server'
import { searchProperties } from '@/lib/properties'
import type { SearchFilters, PropertyType, PropertyStatus } from '@/types/property'

export const revalidate = 60

/**
 * GET /api/listings
 *
 * Query parameters (all optional):
 *   neighborhood  — partial match, case-insensitive
 *   minPrice      — number
 *   maxPrice      — number
 *   minBeds       — number
 *   type          — House | Condo | Townhouse | Multi-Family | Land
 *   status        — active | pending | sold (default: active)
 *
 * Returns an array of Property objects as JSON.
 * AI agents can use this endpoint to query available listings programmatically.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const filters: SearchFilters = {}

  if (searchParams.has('neighborhood')) filters.neighborhood = searchParams.get('neighborhood')!
  if (searchParams.has('minPrice')) filters.minPrice = Number(searchParams.get('minPrice'))
  if (searchParams.has('maxPrice')) filters.maxPrice = Number(searchParams.get('maxPrice'))
  if (searchParams.has('minBeds')) filters.minBeds = Number(searchParams.get('minBeds'))
  if (searchParams.has('type')) filters.type = searchParams.get('type') as PropertyType
  if (searchParams.has('status')) filters.status = searchParams.get('status') as PropertyStatus

  const properties = await searchProperties(filters)

  return NextResponse.json(properties, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
