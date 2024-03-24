import { Sidebar } from "@/components/Sidebar"
import { Invoices } from "@/components/dashboard/Invoices"
import { TopSection } from "@/components/dashboard/TopSection"

const DashboardPage = () => {
  return (
    <div className="flex gap-6">
        <Sidebar/>
        <div>
            <TopSection/>
            <Invoices/>
        </div>
      
    </div>
  )
}

export default DashboardPage
