import { Button } from '@/components/ui/button';
import { Bell, Search } from 'lucide-react';
import React from 'react';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 max-w-md">
            <label htmlFor="search" className="sr-only">
              Pesquisar
            </label>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                aria-hidden="true"
              />
              <input
                id="search"
                type="text"
                placeholder="Pesquisar..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg"
              aria-label="Notificações"
            >
              <Bell className="w-6 h-6" aria-hidden="true" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">U</span>
              </div>
              <span className="text-sm font-medium text-gray-700">Usuário</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
