'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Star, Bookmark } from 'lucide-react';
import { Property } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

import { useRouter } from 'next/navigation';

interface PropertyCardProps {
  property: Property;
  onClick?: () => void;
  isSelected?: boolean;
}

export function PropertyCard({ property, onClick, isSelected }: PropertyCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(`/properties/${property.id}`);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      onClick={handleCardClick}
      className="cursor-pointer"
    >
      <Card className={cn(
        "overflow-hidden border-none shadow-sm bg-white group transition-all duration-300",
        isSelected ? "ring-2 ring-blue-600 shadow-lg" : "hover:shadow-md"
      )}>
        <div className="relative aspect-[4/3]">
          <Image 
            src={property.cover_photo} 
            alt={property.title} 
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className="bg-white/90 text-gray-800 hover:bg-white border-none text-[10px] font-bold px-2 py-0.5 rounded-md">
              {property.property_type}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <div className="bg-white/90 p-1.5 rounded-md text-blue-600 hover:bg-white transition-colors shadow-sm">
              <Bookmark className="w-4 h-4" />
            </div>
          </div>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 truncate">{property.title}</h3>
          </div>
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{property.city}, {property.country}</span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-lg text-gray-900">{property.price.toLocaleString()} FCFA</span>
              <span className="text-gray-400 text-[10px]">{property.advert_type === 'A louer' ? '/mois' : ''}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-bold text-gray-700">4.8/5</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
