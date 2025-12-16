import {   FolderArchive,  FolderClock,  FolderCog,  FolderGit2,  FolderLock, FolderOpen, FolderSearch,  LogOut } from "lucide-react"

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
    title: "Contacts",
    url: "/",
    icon: FolderArchive,
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
    title: "Comments",
    url: "/comments",
    icon: FolderGit2,
  },
  {
    title: "Admins",
    url: "/admins",
    icon: FolderLock,
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
              {items.map((item) => {
                const isActive = pathname === item.url
                const Icon = isActive ? FolderOpen : item.icon

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="h-full py-3 font-semibold px-6 text-lg rounded-none rounded-r-2xl"
                    >
                      <Link
                        to={item.url}
                        className={
                          isActive
                            ? "flex items-center gap-2 bg-[#003939] text-white"
                            : "flex items-center gap-2"
                        }
                      >
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}

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