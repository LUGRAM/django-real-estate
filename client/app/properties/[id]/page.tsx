'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { PropertyDetail } from '@/components/PropertyDetail';
import { Chatbot } from '@/components/Chatbot';
import { Property } from '@/lib/types';
import { propertyService } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function PropertyPage() {
  const { id } = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (typeof id === 'string') {
        const data = await propertyService.getById(id);
        setProperty(data || null);
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold">Propriété non trouvée</h1>
        <Button onClick={() => router.push('/')}>Retour à l&apos;accueil</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 text-gray-500 hover:text-gray-900"
          onClick={() => router.back()}
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Retour
        </Button>

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden max-w-5xl mx-auto">
          <PropertyDetail property={property} />
        </div>
      </main>

      <Chatbot />
    </div>
  );
}
