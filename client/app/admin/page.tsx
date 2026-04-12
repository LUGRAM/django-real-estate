'use client';

import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Building2, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Calendar
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

import Image from 'next/image';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Fév', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Avr', value: 2780 },
  { name: 'Mai', value: 1890 },
  { name: 'Juin', value: 2390 },
  { name: 'Juil', value: 3490 },
];

const stats = [
  { label: 'Revenu Total', value: '12.5M FCFA', change: '+12.5%', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Propriétés Actives', value: '45', change: '+2.4%', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Nouveaux Locataires', value: '12', change: '-4.1%', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Taux d&apos;Occupation', value: '94%', change: '+0.8%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
];

export default function AdminDashboard() {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="h-screen flex items-center justify-center">Chargement...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bienvenue, Admin</h1>
          <p className="text-gray-500">Voici ce qui se passe avec votre portefeuille aujourd&apos;hui.</p>
        </div>
        <Button variant="outline" className="rounded-xl border-gray-200">
          <Calendar className="w-4 h-4 mr-2" /> Derniers 30 jours
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6 border-none shadow-sm rounded-2xl">
            <div className="flex items-start justify-between mb-4">
              <div className={`${stat.bg} p-3 rounded-xl`}>
                <stat.icon className={`${stat.color} w-6 h-6`} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
                {stat.change.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 border-none shadow-sm rounded-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg">Aperçu des Revenus</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-xs font-bold text-blue-600 bg-blue-50">Hebdomadaire</Button>
              <Button variant="ghost" size="sm" className="text-xs font-bold text-gray-400">Mensuel</Button>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 border-none shadow-sm rounded-2xl">
          <h3 className="font-bold text-lg mb-6">Activités Récentes</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden shrink-0 relative">
                  <Image 
                    src={`https://picsum.photos/seed/user${i}/100/100`} 
                    alt="User" 
                    fill 
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">Nouvelle demande de visite</p>
                  <p className="text-xs text-gray-500 truncate">Villa Sablière • Il y a 2h</p>
                </div>
                <Button variant="ghost" size="icon" className="text-gray-400">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-6 text-blue-600 font-bold text-sm">Voir tout</Button>
        </Card>
      </div>
    </div>
  );
}
