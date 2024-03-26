import { Button } from "../ui/button";
import { MdChevronRight } from "react-icons/md";

export const SingleInvoice = () => {
  return (
    <div className="w-full flex justify-between pr-3 pl-8  items-center h-[72px] bg-white rounded-lg shadow-sm hover:border-primary hover:border cursor-pointer ">
      <b className="text-dark">
        <span className="text-Subtle-Turquoise">#</span>RT3080
      </b>
      <p className="text-Subtle-Turquoise">
        <span className="text-Soft-Teal">Due</span> 19 fev 2024
      </p>
      <p className="text-Soft-Teal">Jensen Huang</p>
      <div className="flex items-center ">
        <b className="mr-10 text-dark">$ 1,800.90</b>
        <div className="w-[104px] h-10 text-emerald-500 bg-emerald-50 rounded-md flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <b>Paid</b>
        </div>

        <Button
          variant={"ghost"}
          size={"icon"}
          className="hover:bg-transparent"
        >
          <MdChevronRight className="text-primary text-xl" />
        </Button>
      </div>
    </div>
  );
};
