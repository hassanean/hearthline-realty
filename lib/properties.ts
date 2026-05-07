import type { Property, SearchFilters } from '@/types/property'

// ---------------------------------------------------------------------------
// Default listings — used when GOOGLE_SHEET_ID is not set
// ---------------------------------------------------------------------------
const DEFAULT_LISTINGS: Property[] = [
  {
    id: 'hlr-241008',
    status: 'active',
    address: '418 NW 60th St',
    neighborhood: 'Ballard',
    city: 'Seattle',
    state: 'WA',
    zip: '98107',
    price: 1_095_000,
    beds: 3,
    baths: 2.5,
    sqft: 1820,
    type: 'House',
    yearBuilt: 1927,
    lotSize: 3800,
    hoaFee: 0,
    propertyTax: 7850,
    openHouse: 'Saturday 1–3 PM',
    description:
      'Classic Ballard craftsman beautifully blends original 1927 character with a thoughtful 2019 renovation. Original fir floors, box-beam ceilings, and a welcoming covered porch greet you on arrival. Inside, the kitchen was fully reimagined with quartz counters, custom cabinetry, and a farmhouse sink. The primary suite features a heated tile floor and a glass-enclosed shower. A detached studio in the backyard offers flexible space for a home office or guests. Walk to coffee shops, breweries, and the Saturday Farmers Market.',
    features: [
      'Original fir hardwood floors',
      'Fully renovated kitchen (2019)',
      'Primary suite with heated tile floors',
      'Detached backyard studio / ADU potential',
      'Covered front porch',
      'Private fenced yard',
      'Detached 1-car garage',
      'Gas fireplace',
      'New roof (2020)',
      'Central A/C',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=1200&q=80',
    imageUrls: [
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=1200&q=80',
    ],
    walkScore: 85,
    transitScore: 72,
    bikeScore: 95,
  },
  {
    id: 'hlr-241019',
    status: 'active',
    address: '1205 E Mercer St #304',
    neighborhood: 'Capitol Hill',
    city: 'Seattle',
    state: 'WA',
    zip: '98102',
    price: 699_000,
    beds: 2,
    baths: 1.5,
    sqft: 1050,
    type: 'Condo',
    yearBuilt: 1992,
    lotSize: null,
    hoaFee: 420,
    propertyTax: 5200,
    openHouse: 'Sunday 11 AM–1 PM',
    description:
      'Bright and beautifully updated condo in the heart of Capitol Hill. The third-floor unit catches excellent natural light throughout the day and features floor-to-ceiling windows in the living area with treetop views. The open kitchen was updated in 2022 with quartz counters, a tile backsplash, and new stainless appliances. In-unit washer/dryer, secure underground parking, and a rooftop deck with sweeping city views round out this exceptional package. Walk to Pike-Pine corridor restaurants, Volunteer Park, and Cal Anderson Park.',
    features: [
      'Floor-to-ceiling windows with treetop views',
      'Updated kitchen (2022) with quartz counters',
      'In-unit washer/dryer',
      'Secure underground parking',
      'Rooftop deck with city views',
      'Controlled-access building',
      'Bike storage',
      'Storage unit included',
      'Gas fireplace',
      'Pet friendly (cats + 1 dog)',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    imageUrls: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
    ],
    walkScore: 97,
    transitScore: 83,
    bikeScore: 91,
  },
  {
    id: 'hlr-241027',
    status: 'active',
    address: '8855 170th Ave NE',
    neighborhood: 'Downtown Redmond',
    city: 'Redmond',
    state: 'WA',
    zip: '98052',
    price: 849_000,
    beds: 3,
    baths: 2,
    sqft: 1480,
    type: 'Townhouse',
    yearBuilt: 2006,
    lotSize: null,
    hoaFee: 275,
    propertyTax: 5950,
    openHouse: null,
    description:
      'Immaculate three-story townhouse steps from Downtown Redmond\'s dining, shopping, and transit hub. The main level features an open floor plan with 9-foot ceilings, hardwood floors, and a gas fireplace anchoring the living room. The chef-ready kitchen boasts granite counters, stainless appliances, and a breakfast bar perfect for casual meals. Upstairs, the primary suite offers a walk-in closet and spa-like bathroom with a soaking tub. A direct-access two-car garage completes the package. Minutes from Microsoft, Amazon, and SR-520.',
    features: [
      'Open floor plan with 9-ft ceilings',
      'Hardwood floors on main level',
      'Granite counters + stainless appliances',
      'Primary suite with soaking tub',
      'Walk-in closet',
      'Direct-access 2-car garage',
      'Gas fireplace',
      'Private rooftop deck',
      'Central A/C',
      'Walk to Downtown Redmond transit',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80',
    imageUrls: [
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ],
    walkScore: 78,
    transitScore: 68,
    bikeScore: 72,
  },
  {
    id: 'hlr-241031',
    status: 'active',
    address: '4411 49th Ave SW',
    neighborhood: 'West Seattle',
    city: 'Seattle',
    state: 'WA',
    zip: '98116',
    price: 1_245_000,
    beds: 4,
    baths: 3,
    sqft: 2240,
    type: 'House',
    yearBuilt: 1954,
    lotSize: 4200,
    hoaFee: 0,
    propertyTax: 8420,
    openHouse: 'Sunday 2–4 PM',
    description:
      'Sweeping territorial views and a comprehensive 2021 update make this West Seattle home something special. The main level opens to a chef\'s kitchen with a 36" range, waterfall island, and direct access to the view deck — perfect for entertaining. The primary suite occupies the entire upper floor, with vaulted ceilings, a custom walk-in closet, and a spa bathroom featuring radiant floors and a freestanding soaking tub. A fully finished lower level adds two bedrooms, a flex room, and a second living area with backyard access. Two blocks from the Junction and minutes to Lincoln Park.',
    features: [
      'Territorial views from main level & deck',
      'Chef\'s kitchen with 36" range (2021)',
      'Waterfall island with seating',
      'Primary suite with vaulted ceilings',
      'Radiant-floor spa bathroom',
      'Freestanding soaking tub',
      'Fully finished lower level',
      'Private back yard with deck',
      'Detached 2-car garage',
      'New electrical, plumbing & HVAC (2021)',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?auto=format&fit=crop&w=1200&q=80',
    imageUrls: [
      'https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80',
    ],
    walkScore: 82,
    transitScore: 55,
    bikeScore: 80,
  },
  {
    id: 'hlr-241042',
    status: 'pending',
    address: '101 Lake Ave S #1904',
    neighborhood: 'South Lake',
    city: 'Renton',
    state: 'WA',
    zip: '98057',
    price: 575_000,
    beds: 2,
    baths: 2,
    sqft: 1120,
    type: 'Condo',
    yearBuilt: 2008,
    lotSize: null,
    hoaFee: 510,
    propertyTax: 4650,
    openHouse: null,
    description:
      'Breathtaking panoramic lake views from the 19th floor of one of Renton\'s most sought-after high-rise buildings. This thoughtfully designed two-bedroom, two-bath unit captures sunrise views over Lake Washington from nearly every room. The open floor plan features engineered hardwood floors, a gourmet kitchen with granite counters and gas cooking, and a private balcony ideal for morning coffee. Building amenities include a resort-style rooftop pool and lounge, fully equipped fitness center, concierge service, and secured parking. Minutes from I-405, SR-167, and the Renton Landing.',
    features: [
      'Panoramic lake views from 19th floor',
      'Private balcony',
      'Engineered hardwood floors',
      'Gourmet kitchen with granite + gas cooking',
      'Resort-style rooftop pool & lounge',
      'Fully equipped fitness center',
      'Concierge service',
      'Secured assigned parking',
      'Guest suite available',
      'Electric vehicle charging stations',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1625603736199-775425d2890a?auto=format&fit=crop&w=1200&q=80',
    imageUrls: [
      'https://images.unsplash.com/photo-1625603736199-775425d2890a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    ],
    walkScore: 71,
    transitScore: 58,
    bikeScore: 65,
  },
]

// ---------------------------------------------------------------------------
// CSV helpers (for Google Sheets via gviz endpoint)
// ---------------------------------------------------------------------------
function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  result.push(current.trim())
  return result
}

function parseCSV(text: string): Record<string, string>[] {
  const lines = text.trim().split('\n')
  const headers = parseCSVLine(lines[0]).map((h) => h.replace(/"/g, ''))
  return lines.slice(1).map((line) => {
    const values = parseCSVLine(line)
    return headers.reduce(
      (obj, header, i) => {
        obj[header] = (values[i] ?? '').replace(/^"|"$/g, '')
        return obj
      },
      {} as Record<string, string>,
    )
  })
}

// Normalise a raw status string to the union the app uses.
// Sheet uses "Available"; also handles active/pending/sold directly.
function normaliseStatus(raw: string): Property['status'] {
  const s = raw.toLowerCase().trim()
  if (s === 'available' || s === 'active') return 'active'
  if (s === 'pending' || s === 'under contract') return 'pending'
  if (s === 'sold' || s === 'closed') return 'sold'
  return 'active'
}

// Strip currency symbols, commas, and whitespace so "$1,050,000" → 1050000.
function parseNumber(raw: string): number {
  return Number(raw.replace(/[$,\s]/g, '')) || 0
}

function rowToProperty(row: Record<string, string>): Property {
  // Accept both the original expected names and the sheet's actual column names
  const id = row.id || row.Property_ID || ''
  const address = row.address || row.Address || ''
  const city = row.city || row.City || ''
  const zip = row.zip || row.Zip || ''
  const sqftRaw = row.sqft || row.Sq_Ft || '0'
  const featuresRaw = row.features || row.Features || ''
  const statusRaw = row.status || row.Status || 'active'

  // Features: support both pipe-separated (documented) and comma-separated (sheet)
  const features = featuresRaw
    ? featuresRaw.split(/[|,]/).map((f) => f.trim()).filter(Boolean)
    : []

  // Fallback image: cycle through a small set of stock photos keyed by listing index
  const FALLBACK_IMAGES = [
    'https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1625603736199-775425d2890a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
  ]
  const idHash = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const fallbackImg = FALLBACK_IMAGES[idHash % FALLBACK_IMAGES.length]
  const imageUrl = row.imageUrl || row.ImageUrl || fallbackImg

  return {
    id,
    status: normaliseStatus(statusRaw),
    address,
    neighborhood: row.neighborhood || row.Neighborhood || '',
    city,
    state: row.state || row.State || 'WA',
    zip,
    price: parseNumber(row.price || row.Price || '0'),
    beds: parseNumber(row.beds || row.Beds || '0'),
    baths: parseNumber(row.baths || row.Baths || '0'),
    sqft: parseNumber(sqftRaw),
    type: ((row.type || row.Type) as Property['type']) ?? 'House',
    yearBuilt: parseNumber(row.yearBuilt || row.YearBuilt || '0'),
    lotSize: (row.lotSize || row.LotSize) ? parseNumber(row.lotSize || row.LotSize) : null,
    hoaFee: parseNumber(row.hoaFee || row.HoaFee || '0'),
    propertyTax: parseNumber(row.propertyTax || row.PropertyTax || '0'),
    openHouse: row.openHouse || row.OpenHouse || null,
    description: row.description || row.Description || '',
    features,
    imageUrl,
    imageUrls: row.imageUrls
      ? row.imageUrls.split(',').map((u) => u.trim()).filter(Boolean)
      : [imageUrl],
    walkScore: parseNumber(row.walkScore || row.WalkScore || '0'),
    transitScore: parseNumber(row.transitScore || row.TransitScore || '0'),
    bikeScore: parseNumber(row.bikeScore || row.BikeScore || '0'),
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------
let _cache: Property[] | null = null
let _cacheTime = 0
const CACHE_TTL = 60_000 // 60 s

export async function getAllProperties(): Promise<Property[]> {
  const sheetId = process.env.GOOGLE_SHEET_ID
  if (!sheetId) return DEFAULT_LISTINGS

  const now = Date.now()
  if (_cache && now - _cacheTime < CACHE_TTL) return _cache

  const tab = encodeURIComponent(process.env.GOOGLE_SHEET_TAB ?? 'Listings')
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${tab}`

  try {
    const res = await fetch(url, { next: { revalidate: 60 } })
    if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`)
    const text = await res.text()
    const rows = parseCSV(text)
    _cache = rows.filter((r) => r.id || r.Property_ID).map(rowToProperty)
    _cacheTime = now
    return _cache
  } catch (err) {
    console.error('[hearthline] Google Sheets fetch error — falling back to defaults:', err)
    return DEFAULT_LISTINGS
  }
}

export async function getPropertyById(id: string): Promise<Property | undefined> {
  const all = await getAllProperties()
  return all.find((p) => p.id === id)
}

export async function searchProperties(filters: SearchFilters): Promise<Property[]> {
  const all = await getAllProperties()
  return all.filter((p) => {
    if (filters.status && p.status !== filters.status) return false
    if (filters.neighborhood && !p.neighborhood.toLowerCase().includes(filters.neighborhood.toLowerCase())) return false
    if (filters.minPrice && p.price < filters.minPrice) return false
    if (filters.maxPrice && p.price > filters.maxPrice) return false
    if (filters.minBeds && p.beds < filters.minBeds) return false
    if (filters.type && p.type !== filters.type) return false
    return true
  })
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price)
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-US').format(n)
}
