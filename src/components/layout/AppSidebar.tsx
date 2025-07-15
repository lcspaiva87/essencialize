'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  BarChart3,
  CreditCard,
  DollarSign,
  FileText,
  Settings,
  ShoppingCart,
  Tag,
  Target,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationItems = [
  { title: 'Dashboard', url: '/dashboard', icon: BarChart3 },
  { title: 'Receitas', url: '/receitas', icon: TrendingUp },
  { title: 'Despesas', url: '/expenses', icon: CreditCard },
  { title: 'Transações', url: '/transacoes', icon: DollarSign },
  { title: 'Categorias', url: '/categorias', icon: Tag },
  { title: 'Mercado', url: '/mercado', icon: ShoppingCart },
  { title: 'Relatórios', url: '/relatorios', icon: FileText },
  { title: 'Metas', url: '/metas', icon: Target },
  { title: 'Perfil', url: '/perfil', icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <Sidebar
      className={state === 'collapsed' ? 'w-14' : 'w-64'}
      collapsible="icon"
    >
      <SidebarContent className="border-r bg-white">
        <div className="border-b p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500">
              <span className="font-bold text-sm text-white" />
            </div>
            {state === 'expanded' && (
              <span className="font-bold text-gray-800" />
            )}
          </div>
        </div>

        <SidebarGroup className="px-2 py-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                        isActive(item.url)
                          ? 'bg-orange-100 font-medium text-orange-600'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      href={item.url}
                    >
                      <item.icon className="h-5 w-5" />
                      {state === 'expanded' && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
