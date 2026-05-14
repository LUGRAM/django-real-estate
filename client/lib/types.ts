export type PropertyType =
  | 'Maison'
  | 'Appartement'
  | 'Bureau'
  | 'Entrepôt'
  | 'Commercial'
  | 'Autre';

export type AdvertType = 'A vendre' | 'A louer';

export interface Property {
  id: string;
  slug: string;
  user: string;
  profile_photo: string;
  title: string;
  ref_code: string;
  description: string;
  country: string;
  city: string;
  postal_code: string;
  street_address: string;
  property_number: number;
  price: number;
  tax: number;
  final_property_price: number;
  plot_area: number;
  total_floors: number;
  bedrooms: number;
  bathrooms: number;
  advert_type: AdvertType;
  property_type: PropertyType;
  cover_photo: string;
  photo1: string;
  photo2: string;
  photo3: string;
  photo4: string;
  published_status: boolean;
  views: number;
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  profile_photo?: string;
  property_id?: string;
  lease_start: string;
  lease_end: string;
  rent_amount: number;
  status: 'Actif' | 'Inactif' | 'En retard';
}
