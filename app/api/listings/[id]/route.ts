import { NextRequest, NextResponse } from 'next/server'
import { getPropertyById } from '@/lib/properties'

export const revalidate = 60

/**
 * GET /api/listings/:id
 *
 * Returns a single Property object by its MLS ID (e.g. hlr-241008).
 * AI agents can deep-link to individual listing pages at /listings/:id
 * or fetch the structured JSON representation here.
 *
 * 404 if the listing is not found.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const property = await getPropertyById(id)

  if (!property) {
    return NextResponse.json({ error: 'Listing not found', id }, { status: 404 })
  }

  return NextResponse.json(property, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
