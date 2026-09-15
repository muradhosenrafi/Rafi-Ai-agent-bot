import { AppSidebar } from "@/components/ui/custom/dashboard/AppSidebar"
import { SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"

function Dashboardlayout({children}:any) {
  return (
      <SidebarProvider>
        <AppSidebar/>
        <SidebarTrigger/>
    <div className="w-full">{children}</div>

      </SidebarProvider>

  )
}

export default Dashboardlayout