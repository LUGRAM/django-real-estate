import type { Property, Tenant } from './types';

const BASE_URL = '/api/v1';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

function mapProperty(raw: Record<string, unknown>): Property {
  return {
    ...(raw as unknown as Property),
    id: raw.slug as string,
  };
}

export const propertyService = {
  async getAll(): Promise<Property[]> {
    const data = await request<{ count: number; results: Record<string, unknown>[] }>(
      '/properties/all/'
    );
    return (data.results ?? []).map(mapProperty);
  },

  async getOne(slug: string): Promise<Property> {
    const raw = await request<Record<string, unknown>>(`/properties/details/${slug}/`);
    return mapProperty(raw);
  },

  async create(payload: Partial<Property>): Promise<Property> {
    const raw = await request<Record<string, unknown>>('/properties/create/', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return mapProperty(raw);
  },

  async update(slug: string, payload: Partial<Property>): Promise<Property> {
    const raw = await request<Record<string, unknown>>(`/properties/update/${slug}/`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    return mapProperty(raw);
  },

  async delete(slug: string): Promise<void> {
    await fetch(`${BASE_URL}/properties/delete/${slug}/`, { method: 'DELETE' });
  },
};

export const tenantService = {
  async getAll(): Promise<Tenant[]> {
    return [];
  },
};
