'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye,
  Building2,
  MapPin,
  DollarSign,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { propertyService } from '@/lib/api';
import { Property, PropertyType, AdvertType } from '@/lib/types';
import Image from 'next/image';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function AdminProperties() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const [formData, setFormData] = useState<Partial<Property>>({
    title: '',
    description: '',
    price: 0,
    city: 'Libreville',
    country: 'GA',
    property_type: 'Maison',
    advert_type: 'A vendre',
    bedrooms: 0,
    bathrooms: 0,
    plot_area: 0,
    total_floors: 1,
    published_status: true,
    cover_photo: 'https://picsum.photos/seed/new/800/600',
  });

  const fetchProperties = useCallback(async (showLoading = false) => {
    if (showLoading) setLoading(true);
    const data = await propertyService.getAll();
    setProperties(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    let mounted = true;
    propertyService.getAll().then(data => {
      if (mounted) {
        setProperties(data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'price' || name === 'bedrooms' || name === 'bathrooms' || name === 'plot_area' || name === 'total_floors' 
        ? parseFloat(value) || 0 
        : value 
    }));
  };

  const handleSelectChange = (name: string, value: string | null) => {
    if (value !== null) {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProperty) {
        await propertyService.update(editingProperty.id, formData);
        toast.success('Propriété mise à jour avec succès');
      } else {
        await propertyService.create(formData);
        toast.success('Propriété ajoutée avec succès');
      }
      setIsDialogOpen(false);
      setEditingProperty(null);
      setFormData({
        title: '',
        description: '',
        price: 0,
        city: 'Libreville',
        country: 'GA',
        property_type: 'Maison',
        advert_type: 'A vendre',
        bedrooms: 0,
        bathrooms: 0,
        plot_area: 0,
        total_floors: 1,
        published_status: true,
        cover_photo: 'https://picsum.photos/seed/new/800/600',
      });
      fetchProperties();
    } catch (error) {
      toast.error('Une erreur est survenue');
    }
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setFormData(property);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette propriété ?')) {
      try {
        await propertyService.delete(id);
        toast.success('Propriété supprimée');
        fetchProperties();
      } catch (error) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Propriétés</h1>
          <p className="text-gray-500">Gérez vos annonces immobilières et suivez leurs performances.</p>
        </div>
        <Button 
          onClick={() => router.push('/admin/properties/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 font-bold"
        >
          <Plus className="w-4 h-4 mr-2" /> Ajouter un bien
        </Button>
      </div>

      <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Rechercher par titre ou ville..." 
              className="pl-10 bg-gray-50 border-none rounded-xl h-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-xl border-gray-200">
              <Filter className="w-4 h-4 mr-2" /> Filtres
            </Button>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px] rounded-xl border-gray-200">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="published">Publiés</SelectItem>
                <SelectItem value="draft">Brouillons</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="font-bold text-gray-600 py-4">Propriété</TableHead>
              <TableHead className="font-bold text-gray-600">Type</TableHead>
              <TableHead className="font-bold text-gray-600">Prix</TableHead>
              <TableHead className="font-bold text-gray-600">Statut</TableHead>
              <TableHead className="font-bold text-gray-600 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-gray-500">Chargement...</TableCell>
              </TableRow>
            ) : properties.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-gray-500">Aucune propriété trouvée</TableCell>
              </TableRow>
            ) : (
              properties.map((property) => (
                <TableRow key={property.id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0">
                        <Image 
                          src={property.cover_photo} 
                          alt={property.title} 
                          fill 
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 truncate">{property.title}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{property.city}, {property.country}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-gray-900">{property.property_type}</span>
                      <span className="text-xs text-gray-500">{property.advert_type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-gray-900">{property.price.toLocaleString()} FCFA</span>
                  </TableCell>
                  <TableCell>
                    {property.published_status ? (
                      <Badge className="bg-green-50 text-green-600 hover:bg-green-50 border-none rounded-full px-3 py-1 flex items-center gap-1 w-fit">
                        <CheckCircle2 className="w-3 h-3" /> Publié
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-500 hover:bg-gray-100 border-none rounded-full px-3 py-1 flex items-center gap-1 w-fit">
                        <Clock className="w-3 h-3" /> Brouillon
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-blue-600" onClick={() => handleEdit(property)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-600" onClick={() => handleDelete(property.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
