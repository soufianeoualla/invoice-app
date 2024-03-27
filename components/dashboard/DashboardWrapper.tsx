import { Invoices } from "./Invoices"
import { TopSection } from "./TopSection"
import { AddInvoice } from "./modals/AddInvoice"

export const DashboardWrapper = () => {
  return (
   
        <div className=" mx-auto w-[730px] mt-[77px] space-y-16">
            <TopSection/>
            <Invoices/>
            
        </div>
      
  
  )
}
