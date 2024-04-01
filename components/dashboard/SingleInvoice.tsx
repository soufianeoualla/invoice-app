import { string } from "zod";
import { Button } from "../ui/button";
import { MdChevronRight } from "react-icons/md";
import Link from "next/link";
import { formatDate, formatPrice } from "@/lib/functions";
import { InvoiceProps } from "@/lib/interfaces";

interface SingleInvoiceProps {
  invoice: InvoiceProps;
}

export const SingleInvoice = ({ invoice }: SingleInvoiceProps) => {
  const formattedDate = formatDate(invoice.invoiceDate.toString());

  const formattedPrice = formatPrice(invoice.total);

  const statusColors =
    invoice.status === "pending"
      ? "bg-pending text-pending"
      : invoice.status === "paid"
      ? "bg-emerald-500 text-emerald-500"
      : "bg-draft text-draft";

  return (
    <Link href={`/dashboard/invoice?id=${invoice.id}`}>
      <div className="w-full mb-4 flex justify-between pr-3 pl-8  items-center h-[72px] bg-white rounded-lg shadow-sm hover:border-primary hover:border cursor-pointer dark:bg-Slate-Teal md:pr-1 md:pl-5 sm:relative sm:h-[130px] sm:py-8  ">
        <div className="flex items-center justify-between gap-x-16 md:gap-x-8">
          <b className="text-dark uppercase w-[12%] md:w-[10%] dark:text-white sm:absolute top-4  ">
            <span className="text-Subtle-Turquoise  ">#</span>
            {invoice.id}
          </b>
          <p className="text-Subtle-Turquoise dark:text-Bright-Turquoise sm:absolute left-4 bottom-12 ">
            <span className="text-Soft-Teal">Due</span> {formattedDate}
          </p>
          <p className="text-Soft-Teal dark:text-white sm:absolute top-4 right-4 ">
            {invoice.clientName}
          </p>
        </div>

        <div className="flex items-center   ">
          <b className=" mr-12 text-dark  dark:text-white md:mr-8 sm:absolute left-4 bottom-4">{formattedPrice}</b>
          <div
            className={`w-[104px] h-10 md:w-[90px]   bg-opacity-10 rounded-md flex items-center justify-center gap-2 ${statusColors} sm:absolute right-4 bottom-4`}
          >
            <div className={`w-2 h-2 rounded-full ${statusColors} `} />
            <b className={` capitalize tracking-wide`}>{invoice.status}</b>
          </div>

          <Button
            variant={"ghost"}
            size={"icon"}
            className="hover:bg-transparent sm:hidden"
          >
            <MdChevronRight className="text-primary text-xl" />
          </Button>
        </div>
      </div>
    </Link>
  );
};
