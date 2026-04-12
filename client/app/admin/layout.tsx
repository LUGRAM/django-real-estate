'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  Plus,
  Search,
  Bell,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';

import Image from 'next/image';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord', href: '/admin' },
    { icon: Building2, label: 'Propriétés', href: '/admin/properties' },
    { icon: Users, label: 'Locataires', href: '/admin/tenants' },
    { icon: BarChart3, label: 'Rapports', href: '/admin/reports' },
  ];

  const bottomItems = [
    { icon: Settings, label: 'Paramètres', href: '/admin/settings' },
    { icon: HelpCircle, label: 'Support', href: '/admin/support' },
  ];

  const handleLogout = () => {
    toast.info('Déconnexion...');
    setTimeout(() => {
      router.push('/login');
    }, 500);
  };

  return (
    <div className="flex h-screen bg-[#F8F9FB] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-100 flex flex-col shrink-0">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-100">
              <Building2 className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-xl leading-tight text-gray-900">Curator Pro</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Portfolio Manager</p>
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={cn(
                    "flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 group",
                    isActive 
                      ? "bg-blue-50 text-blue-600 shadow-sm" 
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                  )}
                >
                  <item.icon className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                  )} />
                  <span className="font-bold text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-8 space-y-6">
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-7 font-bold shadow-xl shadow-blue-100 transition-all active:scale-[0.98]"
            onClick={() => router.push('/admin/properties/new')}
          >
            <Plus className="w-4 h-4 mr-2" /> Ajouter un bien
          </Button>

          <nav className="space-y-1">
            {bottomItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-5 py-3 rounded-xl text-sm font-bold transition-colors",
                  pathname === item.href 
                    ? "text-blue-600" 
                    : "text-gray-400 hover:text-gray-600"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-5 py-3 rounded-xl text-sm font-bold text-gray-400 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Déconnexion
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-24 bg-white border-b border-gray-100 flex items-center justify-between px-10 shrink-0">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Rechercher des propriétés, locataires..." 
                className="pl-12 bg-gray-50 border-none rounded-2xl h-12 focus-visible:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 pr-8 border-r border-gray-100">
              <button className="text-gray-400 hover:text-gray-600 relative p-2 hover:bg-gray-50 rounded-xl transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <button className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-50 rounded-xl transition-colors">
                <HelpCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900">Admin User</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Super Admin</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gray-100 overflow-hidden border-2 border-white shadow-sm relative">
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
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
