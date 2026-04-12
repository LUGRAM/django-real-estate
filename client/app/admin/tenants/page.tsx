'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle
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
import { tenantService, propertyService } from '@/lib/api';
import { Tenant, Property } from '@/lib/types';
import Image from 'next/image';

export default function AdminTenants() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [tenantsData, propertiesData] = await Promise.all([
        tenantService.getAll(),
        propertyService.getAll()
      ]);
      setTenants(tenantsData);
      setProperties(propertiesData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const getPropertyTitle = (propertyId?: string) => {
    if (!propertyId) return 'Non assigné';
    const property = properties.find(p => p.id === propertyId);
    return property ? property.title : 'Propriété inconnue';
  };

  const getStatusBadge = (status: Tenant['status']) => {
    switch (status) {
      case 'Actif':
        return (
          <Badge className="bg-green-50 text-green-600 hover:bg-green-50 border-none rounded-full px-3 py-1 flex items-center gap-1 w-fit">
            <CheckCircle2 className="w-3 h-3" /> Actif
          </Badge>
        );
      case 'Inactif':
        return (
          <Badge className="bg-gray-100 text-gray-500 hover:bg-gray-100 border-none rounded-full px-3 py-1 flex items-center gap-1 w-fit">
            <Clock className="w-3 h-3" /> Inactif
          </Badge>
        );
      case 'En retard':
        return (
          <Badge className="bg-red-50 text-red-600 hover:bg-red-50 border-none rounded-full px-3 py-1 flex items-center gap-1 w-fit">
            <AlertCircle className="w-3 h-3" /> En retard
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Locataires</h1>
          <p className="text-gray-500">Suivez vos locataires, leurs contrats et le statut de leurs paiements.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 font-bold">
          <Users className="w-4 h-4 mr-2" /> Nouveau locataire
        </Button>
      </div>

      <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Rechercher un locataire..." 
              className="pl-10 bg-gray-50 border-none rounded-xl h-10"
            />
          </div>
          <Button variant="outline" size="sm" className="rounded-xl border-gray-200">
            <Filter className="w-4 h-4 mr-2" /> Filtres
          </Button>
        </div>

        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="font-bold text-gray-600 py-4">Locataire</TableHead>
              <TableHead className="font-bold text-gray-600">Propriété</TableHead>
              <TableHead className="font-bold text-gray-600">Contrat</TableHead>
              <TableHead className="font-bold text-gray-600">Loyer</TableHead>
              <TableHead className="font-bold text-gray-600">Statut</TableHead>
              <TableHead className="font-bold text-gray-600 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-gray-500">Chargement...</TableCell>
              </TableRow>
            ) : tenants.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-gray-500">Aucun locataire trouvé</TableCell>
              </TableRow>
            ) : (
              tenants.map((tenant) => (
                <TableRow key={tenant.id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-100">
                        <Image 
                          src={tenant.profile_photo || 'https://picsum.photos/seed/user/100/100'} 
                          alt={tenant.name} 
                          fill 
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 truncate">{tenant.name}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {tenant.email}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                      <Building2 className="w-4 h-4 text-blue-500" />
                      <span className="truncate max-w-[150px]">{getPropertyTitle(tenant.property_id)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Calendar className="w-3 h-3" />
                        <span>{tenant.lease_start} - {tenant.lease_end}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-gray-900">{tenant.rent_amount.toLocaleString()} FCFA</span>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(tenant.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
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
