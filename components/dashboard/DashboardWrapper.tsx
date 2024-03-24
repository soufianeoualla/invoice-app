import { Sidebar } from "../Sidebar"
import { Invoices } from "./Invoices"
import { TopSection } from "./TopSection"

export const DashboardWrapper = () => {
  return (
    <div className=" bg-light flex gap-6 ">
        <Sidebar/>
        <div className=" mx-auto w-[730px] mt-[77px] space-y-16">
            <TopSection/>
            <Invoices/>
        </div>
      
    </div>
  )
}
