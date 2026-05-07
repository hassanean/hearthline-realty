export type PropertyType = 'House' | 'Condo' | 'Townhouse' | 'Multi-Family' | 'Land'
export type PropertyStatus = 'active' | 'pending' | 'sold'

export interface Property {
  id: string
  status: PropertyStatus
  address: string
  neighborhood: string
  city: string
  state: string
  zip: string
  price: number
  beds: number
  baths: number
  sqft: number
  type: PropertyType
  yearBuilt: number
  lotSize: number | null
  hoaFee: number
  propertyTax: number
  openHouse: string | null
  description: string
  features: string[]
  imageUrl: string
  imageUrls: string[]
  walkScore: number
  transitScore: number
  bikeScore: number
}

export interface SearchFilters {
  neighborhood?: string
  minPrice?: number
  maxPrice?: number
  minBeds?: number
  type?: PropertyType
  status?: PropertyStatus
}
