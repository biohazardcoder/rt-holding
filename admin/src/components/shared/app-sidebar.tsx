import {  Blocks,  FolderClock,  FolderCog,  FolderSearch,  LogOut,   Users } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link,  useLocation } from "react-router-dom"
import { Button } from "../ui/button"

const items = [
  {
    title: "Kategoriyalar",
    url: "/",
    icon: Blocks,
  },
  {
    title: "Services",
    url: "/services",
    icon: FolderCog,
  },
   {
    title: "Story",
    url: "/stories",
    icon: FolderClock,
  },
  {
    title: "Blogs",
    url: "/blogs",
    icon: FolderSearch,
  },
  {
    title: "Administratorlar",
    url: "/admins",
    icon: Users,
  },
]

export function AppSidebar({ title }: { title?: string }) {

  const { pathname } = useLocation()

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <Sidebar>
      <SidebarContent className="bg-[#e7e7e7] gap-0">
        <SidebarGroup>
          <SidebarGroupLabel >
            {title || "Application"}
          </SidebarGroupLabel>
          <SidebarGroupContent >
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-full py-3 font-semibold px-6  text-lg rounded-none rounded-r-2xl">
                    <Link
                      to={item.url}
                      className={
                        pathname === item.url
                          ? "flex items-center gap-2 bg-[#003939] text-white"
                          : "flex items-center gap-2"
                      }
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
        <SidebarFooter className="bg-[#e7e7e7] pb-4">
          <Button 
          onClick={handleLogout}
          variant={"ghost"} className="justify-start cursor-pointer">
            <LogOut size={20}/>
            <span className="font-semibold">Tizimdan chiqish</span>
          </Button>
        </SidebarFooter>
    </Sidebar>
  )
}