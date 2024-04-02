import { formatDate, formatPrice } from "@/lib/functions";
import { InvoiceProps } from "@/lib/interfaces";
import React from "react";
interface Invoice {
  invoice: InvoiceProps;
}

export const Summary = ({ invoice }: Invoice) => {
  const invoiceDate = new Date(invoice.invoiceDate);

  const paymentDueDate = new Date(invoiceDate);
  paymentDueDate.setDate(
    paymentDueDate.getDate() + parseInt(invoice.paymentDue)
  );
  return (
    <div className="my-6 bg-white rounded-lg p-12 dark:bg-Slate-Teal sm:mb-10 ">
      <div className="flex items-center justify-between sm:flex-col sm:gap-y-8 sm:justify-start sm:items-start">
        <div className="grid gap-y-2">
          <strong className="text-dark uppercase dark:text-white text-[15px]">
            <span className="text-Subtle-Turquoise ">#</span>
            {invoice.id}
          </strong>
          <span className="text-Subtle-Turquoise text-[13px] font-medium dark:text-Bright-Turquoise">
            {invoice?.description}
          </span>
        </div>
        <div className="text-Subtle-Turquoise text-[13px] font-medium text-right dark:text-Bright-Turquoise sm:text-left">
          <div>
            {invoice?.senderAddress[0]?.street} <br />
            {invoice?.senderAddress[0]?.city} <br />
            {invoice?.senderAddress[0]?.postCode} <br />
            {invoice?.senderAddress[0]?.country}
          </div>
        </div>
      </div>

      <div className="text-dark flex gap-20   items-start mt-5 sm:flex-col sm:gap-10">
        <div className="flex gap-28 md:gap-20 ">
          <div className="space-y-8">
            <div className="grid gap-2">
              <span className="text-Subtle-Turquoise text-[13px] font-medium dark:text-Bright-Turquoise">
                Invoice Date
              </span>
              <strong className="text-dark dark:text-white text-[15px]">
                {formatDate(invoice.invoiceDate.toString())}
              </strong>
            </div>

            <div className="grid gap-2">
              <span className="text-Subtle-Turquoise text-[13px] font-medium dark:text-Bright-Turquoise">
                Payment Due
              </span>
              <strong className="text-dark dark:text-white text-[15px]">
                {formatDate(paymentDueDate.toString())}
              </strong>
            </div>
          </div>

          <div className="grid gap-2 text-[13px] text-Subtle-Turquoise dark:text-Bright-Turquoise">
            <span className=" font-medium  ">Bill to</span>
            <strong className="capitalize dark:text-white text-dark text-[15px]">
              {invoice.clientName}
            </strong>
            <p className=" font-medium ] ">
              {invoice.clientAddress[0]?.street} <br />{" "}
              {invoice.clientAddress[0]?.city} <br />
              {invoice.clientAddress[0]?.postCode} <br />{" "}
              {invoice.clientAddress[0]?.country}
            </p>
          </div>
        </div>

        <div className="grid gap-2">
          <span className="text-[13px] text-Subtle-Turquoise font-medium dark:text-Bright-Turquoise">
            Sent to
          </span>
          <strong className="text-dark dark:text-white text-[15px] -tracking-tighter">
            {invoice.clientEmail}
          </strong>
        </div>
      </div>

      <div className="p-8 dark:bg-Dusty-Aqua rounded-lg mt-11 text-[15px]">
        <table className="w-full sm:hidden">
          <tr className="dark:text-Bright-Turquoise text-Subtle-Turquoise">
            <th>item Name</th>
            <th>QTY.</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
          {invoice.item.map((item) => (
            <tr key={item.id} className=" text-dark dark:text-white">
              <td>{item.itemName}</td>
              <td className="text-Subtle-Turquoise dark:text-Bright-Turquoise">
                {item.quantity}
              </td>
              <td className="text-Subtle-Turquoise dark:text-Bright-Turquoise">
                {formatPrice(item.price)}
              </td>
              <td>{formatPrice(item.total)}</td>
            </tr>
          ))}
        </table>

        <div className="hidden sm:block">
          {invoice.item.map((item) => (
            <div key={item.id} className=" text-dark dark:text-white flex items-center justify-between">
              <div className="grid gap-y-2">
                <b className="text-dark dark:text-white">{item.itemName}</b>
                <span className="text-Soft-Teal">
                  {item.quantity} x {formatPrice(item.price)}
                </span>
              </div>

              <b className="text-white">{formatPrice(item.total)}</b>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-Dusty-Aqua w-full h-20 px-8 flex justify-between items-center text-white text-[13px] rounded-b-md dark:bg-dark sm:px-4 ">
        <span className="text-[13px]">Amount Due</span>
        <strong className="text-2xl ">{formatPrice(invoice.total)}</strong>
      </div>
    </div>
  );
};
