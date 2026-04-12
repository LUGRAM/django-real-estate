'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Bell, 
  ChevronRight, 
  MapPin, 
  Image as ImageIcon, 
  LayoutGrid, 
  CheckCircle2,
  Info,
  Save,
  ArrowRight,
  Map as MapIcon,
  Video,
  FileText,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

const steps = [
  { id: 1, name: 'INFORMATION', icon: Info },
  { id: 2, name: 'MÉDIA', icon: ImageIcon },
  { id: 3, name: 'DÉTAILS', icon: LayoutGrid },
  { id: 4, name: 'RÉVISION', icon: ShieldCheck },
];

export default function AddPropertyPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    ownership_type: '',
    address: '',
  });

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1D4D]">Ajouter un nouveau bien</h1>
          <p className="text-gray-500 mt-1">Référencement d&apos;un nouveau chef-d&apos;œuvre architectural</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-gray-100 rounded-full">
            <Bell className="w-5 h-5" />
          </Button>
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <Image 
              src="https://picsum.photos/seed/admin/100/100" 
              alt="Admin" 
              fill 
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative flex justify-between items-center max-w-4xl mx-auto px-4">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0" />
        {steps.map((step) => (
          <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                currentStep >= step.id 
                  ? 'bg-[#0039A6] text-white shadow-lg shadow-blue-100 scale-110' 
                  : 'bg-white text-gray-400 border-2 border-gray-100'
              }`}
            >
              {currentStep > step.id ? <CheckCircle2 className="w-6 h-6" /> : step.id}
            </div>
            <span className={`text-[10px] font-bold tracking-widest ${
              currentStep >= step.id ? 'text-[#0039A6]' : 'text-gray-400'
            }`}>
              {step.name}
            </span>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Area */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-10 border-none shadow-sm rounded-[32px] bg-white min-h-[500px] flex flex-col">
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-[#1A1D4D]">Informations de base</h2>
                  <p className="text-gray-500 mt-2">Fournissez l&apos;identité principale et l&apos;emplacement du bien.</p>
                </div>

                <div className="space-y-8 flex-1">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Titre de la propriété</Label>
                    <Input 
                      placeholder="ex: La Résidence du Pavillon de Verre" 
                      className="h-14 bg-[#F5F7FA] border-none rounded-xl text-gray-700 focus-visible:ring-2 focus-visible:ring-blue-500"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Catégorie</Label>
                      <Select>
                        <SelectTrigger className="h-14 bg-[#F5F7FA] border-none rounded-xl text-gray-700">
                          <SelectValue placeholder="Domaine Résidentiel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Maison">Maison</SelectItem>
                          <SelectItem value="Appartement">Appartement</SelectItem>
                          <SelectItem value="Studio">Studio</SelectItem>
                          <SelectItem value="Duplex">Duplex</SelectItem>
                          <SelectItem value="Terrain">Terrain</SelectItem>
                          <SelectItem value="Bureau">Bureau</SelectItem>
                          <SelectItem value="Commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Type de propriété</Label>
                      <Select>
                        <SelectTrigger className="h-14 bg-[#F5F7FA] border-none rounded-xl text-gray-700">
                          <SelectValue placeholder="Pleine propriété" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="freehold">Pleine propriété</SelectItem>
                          <SelectItem value="leasehold">Bail emphytéotique</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Adresse complète</Label>
                    <Textarea 
                      placeholder="Nom de rue, Quartier, Code Postal, Ville" 
                      className="min-h-[120px] bg-[#F5F7FA] border-none rounded-xl text-gray-700 focus-visible:ring-2 focus-visible:ring-blue-500 p-4"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-6 mt-12">
                  <button className="text-sm font-bold text-gray-900 hover:underline">Enregistrer le brouillon</button>
                  <Button 
                    onClick={handleNext}
                    className="h-14 px-10 bg-[#0039A6] hover:bg-[#002D85] text-white rounded-2xl font-bold shadow-xl shadow-blue-100 flex items-center gap-3"
                  >
                    Suivant: Média <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-8">
          {/* Curator's Tip */}
          <Card className="bg-[#0039A6] p-8 rounded-[32px] text-white border-none shadow-xl shadow-blue-100 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <h3 className="text-xl font-bold mb-4">Conseil du conservateur</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Les titres précis incluant des styles architecturaux (ex: &quot;Moderniste&quot;) sont 40% plus performants dans les recherches. Évitez les noms génériques.
            </p>
          </Card>

          {/* Map Preview */}
          <Card className="bg-white p-6 rounded-[32px] border-none shadow-sm space-y-4">
            <Label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Aperçu de la carte</Label>
            <div className="aspect-square bg-[#F5F7FA] rounded-2xl relative overflow-hidden flex items-center justify-center group">
              <MapIcon className="w-12 h-12 text-gray-200 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-[#0039A6]" />
                </div>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 italic leading-relaxed">
              Vérification d&apos;adresse active. La carte se mettra à jour au fur et à mesure.
            </p>
          </Card>
        </div>
      </div>

      {/* Footer Preview Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-white/50 border-none rounded-3xl flex items-center gap-6 group hover:bg-white transition-all cursor-pointer">
          <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
            <Video className="w-6 h-6 text-gray-400 group-hover:text-blue-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 tracking-widest">ÉTAPE 2</p>
            <p className="font-bold text-gray-900">Galerie & Vidéos</p>
          </div>
        </Card>
        <Card className="p-6 bg-white/50 border-none rounded-3xl flex items-center gap-6 group hover:bg-white transition-all cursor-pointer">
          <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
            <FileText className="w-6 h-6 text-gray-400 group-hover:text-blue-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 tracking-widest">ÉTAPE 3</p>
            <p className="font-bold text-gray-900">Rendement & Logistique</p>
          </div>
        </Card>
        <Card className="p-6 bg-white/50 border-none rounded-3xl flex items-center gap-6 group hover:bg-white transition-all cursor-pointer">
          <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
            <ShieldCheck className="w-6 h-6 text-gray-400 group-hover:text-blue-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 tracking-widest">ÉTAPE 4</p>
            <p className="font-bold text-gray-900">Audit Final</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
