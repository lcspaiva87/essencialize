import { AppSidebar } from '@/components/layout/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      {children}
    </SidebarProvider>
  )
}
