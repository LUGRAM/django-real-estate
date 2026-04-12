'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { SidebarFilters } from '@/components/SidebarFilters';
import { PropertyGrid } from '@/components/PropertyGrid';
import { PropertyDetail } from '@/components/PropertyDetail';
import { Chatbot } from '@/components/Chatbot';
import { Property } from '@/lib/types';
import { propertyService } from '@/lib/api';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await propertyService.getAll();
        setProperties(data);
        if (data.length > 0) {
          setSelectedProperty(data[0]);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <SidebarFilters />
        
        <main className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col min-w-0">
            <div className="p-6 border-b border-gray-100 bg-white shrink-0">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold text-gray-900">Propriétés Recommandées</h1>
                <span className="text-sm text-gray-500 font-medium">{properties.length} résultats trouvés</span>
              </div>
              <p className="text-sm text-gray-500">Découvrez les meilleures opportunités immobilières au Gabon.</p>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-6">
                <PropertyGrid 
                  properties={properties} 
                  onSelect={setSelectedProperty}
                  selectedId={selectedProperty?.id}
                />
              </div>
            </ScrollArea>
          </div>

          {selectedProperty && (
            <div className="hidden xl:block">
              <PropertyDetail property={selectedProperty} />
            </div>
          )}
        </main>
      </div>

      <Chatbot />
    </div>
  );
}
