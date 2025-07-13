
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 w-full">
      <div className="flex items-center justify-between w-auto h-16 bg-white p-4 shadow-md">
        <span className="text-lg font-bold text-gray-800">Dashboard Financeiro</span>
        <div className="flex items-center ml-auto">
          <Menubar className="bg-transparent border-none" >
            <MenubarMenu>
              <MenubarTrigger className="bg-transparent border-none">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </MenubarTrigger>
              <MenubarContent align="end" >
                <MenubarItem>
                  <span>Perfil</span>
                </MenubarItem>
                <MenubarItem>
                  <span>Configurações</span>
                </MenubarItem>
                <MenubarItem>
                  <span>Sair</span>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
      {children}
    </div>
  )
}