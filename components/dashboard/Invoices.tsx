import { SingleInvoice } from "./SingleInvoice";
import Loading from "../Loading";
import { InvoiceProps } from "@/lib/interfaces";

interface Invoices {
  invoices: InvoiceProps[] | undefined;
}

export const Invoices = ({ invoices }: Invoices) => {
  if (!invoices)
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <div className="w-full">
      {invoices.map((item) => (
        <SingleInvoice key={item.id} invoice={item} />
      ))}
    </div>
  );
};
