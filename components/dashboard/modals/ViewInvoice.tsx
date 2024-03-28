"use client";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { getSingleInvoice } from "@/data/singleInvoice";
import { formatDate, formatPrice } from "@/lib/functions";
import { Item } from "@radix-ui/react-dropdown-menu";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";

interface AddressProps {
  id: number;
  street: string;
  city: string;
  postCode: string;
  country: string;
  invoiceId: string;
}

interface ItemProps {
  id: number;
  itemName: string;
  quantity: number;
  price: number;
  total: number;
  invoiceId: string;
}

interface InvoiceProps {
  id: string;
  description: string | null;
  clientName: string;
  clientEmail: string;
  total: number;
  status: string;
  createdAt: Date | string;
  invoiceDate: Date | string;
  paymentDue: string;
  updatedAt: Date | string;
  userId: string;
  clientAddress: AddressProps[];
  item: ItemProps[];
  senderAddress: AddressProps[];
  error: string;
}

export const ViewInvoice = () => {
  const [invoice, setInvoice] = useState<InvoiceProps>();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const getData = useCallback(async () => {
    if (!id) return;
    const response = await getSingleInvoice(id);
    if (!response) return;
    setInvoice(response as InvoiceProps);
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  if (!invoice)
    return (
      <div className="h-screen flex justify-center items-center">
        <Loading />
      </div>
    );

  const invoiceDate = new Date(invoice.invoiceDate);

  const paymentDueDate = new Date(invoiceDate);
  paymentDueDate.setDate(
    paymentDueDate.getDate() + parseInt(invoice.paymentDue)
  );
  const background =
    invoice.status === "draft"
      ? "#373B53"
      : invoice.status === "pending"
      ? "#FF8F00"
      : "emerald-500";

  return (
    <>
      <div className="w-[730px] mt-[50px] mx-auto ">
        <Button
          variant={"ghost"}
          className="flex items-center gap-6 font-bold hover:bg-transparent"
        >
          <FaChevronLeft className="text-primary w-4 h-4 " />
          Go back
        </Button>

        <div className="w-full h-[88px] rounded-lg flex items-center justify-between px-8 py-6 bg-white mt-8">
          <div className="flex items-center gap-5">
            <small className="text-[13px] font-medium text-Soft-Teal">
              Status
            </small>
            <div
              className={`w-[104px] h-10 text-[${background}] bg-[${background}] bg-opacity-10 rounded-md flex items-center justify-center gap-2`}
            >
              <div className={`w-2 h-2 rounded-full bg-[${background}]`} />
              <b className={` capitalize`}>{invoice.status}</b>
            </div>
          </div>

          <div className="space-x-2">
            <Button
              variant={"ghost"}
              className="text-Subtle-Turquoise font-bold hover:text-primary text-[15px] hover:bg-transparent "
            >
              Edit
            </Button>
            <Button className="bg-destructive/90 pt-3 hover:bg-destructive/75 text-white rounded-3xl w-[89px] h-12 text-[15px] font-bold tracking-wide">
              Delete
            </Button>
            <Button className="rounded-3xl w-[131px] pt-3 h-12 text-[15px] font-bold tracking-wide">
              Mark as Paid{" "}
            </Button>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg p-12">
          <div className="flex items-center justify-between">
            <div className="grid gap-y-2">
              <strong className="text-dark">
                <span className="text-Subtle-Turquoise">#</span>
                {invoice.id}
              </strong>
              <span className="text-Subtle-Turquoise text-[13px] font-medium">
                {invoice.description}
              </span>
            </div>
            <div className="text-Subtle-Turquoise text-[13px] font-medium text-right">
              <div>
                {invoice?.senderAddress[0]?.street} <br />
                {invoice?.senderAddress[0]?.city} <br />
                {invoice?.senderAddress[0]?.postCode} <br />
                {invoice?.senderAddress[0]?.country}
              </div>
            </div>
          </div>

          <div className="text-dark flex gap-[20%] items-start mt-5">
            <div className="space-y-8">
              <div className="grid gap-2">
                <span className="text-Subtle-Turquoise text-[13px] font-medium">
                  Invoice Date
                </span>
                <strong>{formatDate(invoice.invoiceDate.toString())}</strong>
              </div>

              <div className="grid gap-2">
                <span className="text-Subtle-Turquoise text-[13px] font-medium">
                  Payment Due
                </span>
                <strong>{formatDate(paymentDueDate.toString())}</strong>
              </div>
            </div>

            <div className="grid gap-2">
              <span className="text-Subtle-Turquoise font-medium text-[13px]">
                Bill to
              </span>
              <strong>{invoice.clientName}</strong>
              <p className="text-Subtle-Turquoise font-medium text-[13px]">
                {invoice.clientAddress[0].street} <br />{" "}
                {invoice.clientAddress[0].city} <br />
                {invoice.clientAddress[0].postCode} <br />{" "}
                {invoice.clientAddress[0].country}
              </p>
            </div>

            <div className="grid gap-2">
              <span className="text-[13px] text-Subtle-Turquoise font-medium">
                Sent to
              </span>
              <strong>{invoice.clientEmail}</strong>
            </div>
          </div>

          <div className="px-8 py-10">
            <table className="w-full">
              <tr>
                <th>item Name</th>
                <th>QTY.</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
              {invoice.item.map((item) => (
                <tr key={item.id}>
                  <td>{item.itemName}</td>
                  <td className="text-Subtle-Turquoise">{item.quantity}</td>
                  <td className="text-Subtle-Turquoise">
                    {formatPrice(item.price)}
                  </td>
                  <td>{formatPrice(item.total)}</td>
                </tr>
              ))}
            </table>
          </div>
          <div className="bg-Dusty-Aqua w-full h-20 px-8 flex justify-between items-center text-white text-[13px] rounded-b-md ">
            <span>Amount Due</span>
            <strong className="text-2xl ">{formatPrice(invoice.total)}</strong>
          </div>
        </div>
      </div>
    </>
  );
};
