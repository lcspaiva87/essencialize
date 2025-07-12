"use client"

import {
  BarChart3,
  DollarSign,
  TrendingUp,
  CreditCard,
  Target,
  Settings,
  FileText,
  Tag,
  ShoppingCart
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from 'next/navigation'

const navigationItems = [
  { title: "Dashboard", url: "/", icon: BarChart3 },
  { title: "Receitas", url: "/receitas", icon: TrendingUp },
  { title: "Despesas", url: "/despesas", icon: CreditCard },
  { title: "Transações", url: "/transacoes", icon: DollarSign },
  { title: "Categorias", url: "/categorias", icon: Tag },
  { title: "Mercado", url: "/mercado", icon: ShoppingCart },
  { title: "Relatórios", url: "/relatorios", icon: FileText },
  { title: "Metas", url: "/metas", icon: Target },
  { title: "Perfil", url: "/perfil", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <Sidebar className={state === "collapsed" ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-white border-r">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            {state === "expanded" && (
              <span className="font-bold text-gray-800">Mordomize</span>
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
                      href={item.url}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive(item.url)
                        ? "bg-orange-100 text-orange-600 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {state === "expanded" && <span>{item.title}</span>}
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