import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-100">
      <div className="flex h-16 w-auto items-center justify-between bg-white p-4 shadow-md">
        <div className="ml-auto flex items-center">
          <Menubar className="border-none bg-transparent">
            <MenubarMenu>
              <MenubarTrigger className="border-none bg-transparent">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </MenubarTrigger>
              <MenubarContent align="end">
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
  );
}
