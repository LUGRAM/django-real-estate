'use client';

import React from 'react';
import { Property } from '@/lib/types';
import { PropertyCard } from './PropertyCard';

interface PropertyGridProps {
  properties: Property[];
  onSelect?: (property: Property) => void;
  selectedId?: string;
}

export function PropertyGrid({ properties, onSelect, selectedId }: PropertyGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard 
          key={property.id} 
          property={property} 
          onClick={() => onSelect?.(property)}
          isSelected={property.id === selectedId}
        />
      ))}
    </div>
  );
}
