import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../shared/app-sidebar"
import { Outlet, useLocation } from "react-router-dom"
import { Navbar } from "../shared/navbar"
import { AddCategory } from "@/modules/AddCategory"
import { AddProduct } from "@/modules/AddProduct"
import { AddAdmin } from "@/modules/AddAdmin"

export default function Layout() {

  const {pathname} = useLocation()
  const buttonData = [
    {
      path: "/",
      button: <AddCategory />
    },
    {
      path: "/products",
      button: <AddProduct />
    },
    {
      path: "/admins",
      button: <AddAdmin />
    },
  ];

  return (
    <SidebarProvider>
      <AppSidebar title="Admin panel" />
      <main className="flex-1 overflow-y-auto p-2 bg-[#e7e7e7]">
           <div className="flex items-center ">
            <SidebarTrigger/>
        <Navbar button={true} component={buttonData.find(btn => btn.path === pathname)?.button} />
           </div>
        <Outlet />
      </main>
    </SidebarProvider>
  )
}