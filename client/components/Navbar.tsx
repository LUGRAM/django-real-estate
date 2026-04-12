'use client';

import React from 'react';
import { Search, Bell, MessageSquare, User, Home, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="bg-black p-2 rounded-lg">
            <Home className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">EstateEase</span>
        </div>

        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-1 gap-1">
          <Button variant="ghost" className="rounded-full bg-blue-600 text-white hover:bg-blue-700 px-6">Acheter</Button>
          <Button variant="ghost" className="rounded-full text-gray-600 hover:bg-gray-200">Louer</Button>
          <Button variant="ghost" className="rounded-full text-gray-600 hover:bg-gray-200">Favoris</Button>
          <Button variant="ghost" className="rounded-full text-gray-600 hover:bg-gray-200">Aide</Button>
          <Button variant="ghost" className="rounded-full text-gray-600 hover:bg-gray-200">Services</Button>
          <Button variant="ghost" className="rounded-full text-gray-600 hover:bg-gray-200">Blog</Button>
          <Link href="/admin">
            <Button variant="ghost" className="rounded-full text-blue-600 hover:bg-blue-50 font-bold">Admin</Button>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden lg:block w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            placeholder="Rechercher..." 
            className="pl-10 rounded-full bg-gray-50 border-gray-200 focus:ring-blue-500"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <span className="text-xs text-gray-400">x</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full text-gray-600">
            <MessageSquare className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-gray-600 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-gray-600 md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-100">
            <User className="w-6 h-6 text-gray-500" />
          </div>
        </div>
      </div>
    </nav>
  );
}
