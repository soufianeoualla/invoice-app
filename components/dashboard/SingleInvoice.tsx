import { Button } from "../ui/button"
import { MdChevronRight } from "react-icons/md";

export const SingleInvoice = () => {
  return (
    <div className="w-full flex justify-start px-8 items-center h-[72px] ">
        <b><span>#</span>RT3080</b>
        <p className="ml-11 mr-[59px]">Due 19 fev 2024</p>
        <p>Jensen Huang</p>
        <b className="ml-[108px] mr-10">$ 1,800.90</b>
        <div className="w-[104px] h-10 text-emerald-500 bg-emerald-50 rounded-md flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <b>Paid</b>
        </div>

        <Button variant={'ghost'} size={'icon'}>
            <MdChevronRight className="text-primary text-xl"/>
        </Button>
    </div>
  )
}
