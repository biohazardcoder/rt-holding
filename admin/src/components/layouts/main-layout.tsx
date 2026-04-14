import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../shared/app-sidebar"
import { Outlet, useLocation } from "react-router-dom"
import { Navbar } from "../shared/navbar"
import { AddAdmin } from "@/modules/AddAdmin"
import { AddBlog } from "@/modules/AddBlog"
import { AddService } from "@/modules/AddService"
import { AddStory } from "@/modules/AddStory"
import { AddComment } from "@/modules/AddComment"

export default function Layout() {

  const { pathname } = useLocation()
  const buttonData = [
    {
      path: "/services",
      button: <AddService />
    },
    {
      path: "/blogs",
      button: <AddBlog />
    },
    {
      path: "/stories",
      button: <AddStory />
    },
    {
      path: "/comments",
      button: <AddComment />
    },
    {
      path: "/admins",
      button: <AddAdmin />
    },
  ];

  return (
    <SidebarProvider>
      <AppSidebar title="RT Holdings" />
      <main className="flex-1 overflow-y-auto p-2 bg-[#e7e7e7]">
        <div className="flex items-center ">
          <SidebarTrigger />
          <Navbar button={true} component={buttonData.find(btn => btn.path === pathname)?.button} />
        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  )
}