'use client';

import React from 'react';
import { Search, MapPin, DollarSign, Maximize, Home, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

export function SidebarFilters() {
  return (
    <aside className="w-72 border-r border-gray-100 bg-white h-[calc(100vh-73px)] sticky top-[73px] hidden md:block">
      <ScrollArea className="h-full">
        <div className="p-6 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg">Filtres</h2>
            <Button variant="link" className="text-blue-600 p-0 h-auto text-sm">Effacer tout</Button>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">Emplacement</span>
              </div>
              <X className="w-4 h-4 text-gray-400 cursor-pointer" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="libreville" defaultChecked />
                <Label htmlFor="libreville" className="text-sm text-gray-700">Libreville, Gabon</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="port-gentil" />
                <Label htmlFor="port-gentil" className="text-sm text-gray-700">Port-Gentil, Gabon</Label>
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm font-medium">Gamme de Prix</span>
              </div>
              <X className="w-4 h-4 text-gray-400 cursor-pointer" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-medium text-gray-500">
                <span>100K FCFA</span>
                <span>500M FCFA</span>
              </div>
              <Slider defaultValue={[25]} max={100} step={1} className="py-2" />
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="radio" name="price" id="under100k" className="text-blue-600" />
                  <Label htmlFor="under100k" className="text-sm text-gray-700">Moins de 100K</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" name="price" id="100k-1m" className="text-blue-600" />
                  <Label htmlFor="100k-1m" className="text-sm text-gray-700">100K - 1M</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" name="price" id="custom" className="text-blue-600" defaultChecked />
                  <Label htmlFor="custom" className="text-sm text-gray-700">Personnalisé</Label>
                </div>
              </div>
            </div>
          </div>

          {/* Land Area */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <Maximize className="w-4 h-4" />
                <span className="text-sm font-medium">Surface du Terrain</span>
              </div>
              <X className="w-4 h-4 text-gray-400 cursor-pointer" />
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input placeholder="Min" className="bg-gray-50 border-gray-100 text-sm pr-8" />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-gray-400">m²</span>
              </div>
              <div className="relative flex-1">
                <Input placeholder="Max" className="bg-gray-50 border-gray-100 text-sm pr-8" />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-gray-400">m²</span>
              </div>
            </div>
          </div>

          {/* Type of Place */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium">Type de Bien</span>
              </div>
              <X className="w-4 h-4 text-gray-400 cursor-pointer" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="house" defaultChecked />
                <Label htmlFor="house" className="text-sm text-gray-700">Maison</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="apartment" defaultChecked />
                <Label htmlFor="apartment" className="text-sm text-gray-700">Appartement</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="office" />
                <Label htmlFor="office" className="text-sm text-gray-700">Bureau</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="warehouse" />
                <Label htmlFor="warehouse" className="text-sm text-gray-700">Entrepôt</Label>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}
