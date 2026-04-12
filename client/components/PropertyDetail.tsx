'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Star, Bed, Bath, Maximize, CookingPot, X } from 'lucide-react';
import { Property } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PropertyDetailProps {
  property: Property;
  onClose?: () => void;
}

export function PropertyDetail({ property, onClose }: PropertyDetailProps) {
  return (
    <div className="w-full lg:w-96 bg-white border-l border-gray-100 flex flex-col h-full overflow-hidden">
      <div className="p-4 flex items-center justify-between border-b border-gray-50 lg:hidden">
        <h2 className="font-bold">Détails de la propriété</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image 
              src={property.cover_photo} 
              alt={property.title} 
              fill 
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">{property.title}</h2>
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span>{property.street_address}, {property.city}, {property.country}</span>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full bg-transparent border-b border-gray-100 rounded-none h-auto p-0 gap-8">
              <TabsTrigger 
                value="overview" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-2 font-bold text-gray-500 data-[state=active]:text-gray-900"
              >
                Aperçu
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-2 font-bold text-gray-500 data-[state=active]:text-gray-900"
              >
                Avis
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="pt-4 space-y-6">
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-gray-900">Description :</h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {property.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <Bed className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-sm font-bold text-gray-700">{property.bedrooms} Chambres</span>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <Bath className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-sm font-bold text-gray-700">{property.bathrooms} SDB</span>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <CookingPot className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-sm font-bold text-gray-700">{property.total_floors} Étages</span>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <Maximize className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-sm font-bold text-gray-700">{property.plot_area} m²</span>
                </div>
              </div>

              <Button className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100 border-none h-12 rounded-xl font-bold">
                Contacter l&apos;Agent
              </Button>

              <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100">
                <Image 
                  src={`https://picsum.photos/seed/map-${property.id}/400/200`} 
                  alt="Map" 
                  fill 
                  className="object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-blue-600 p-2 rounded-full shadow-lg border-4 border-white">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
}
