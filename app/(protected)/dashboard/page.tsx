import { Sidebar } from "@/components/Sidebar"
import { TopSection } from "@/components/dashboard/TopSection"

const DashboardPage = () => {
  return (
    <div className="flex gap-6">
        <Sidebar/>
        <div>
            <TopSection/>
        </div>
      
    </div>
  )
}

export default DashboardPage
