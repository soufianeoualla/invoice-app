"use client";
import { markAsPaid } from "@/actions/InvoiceActions";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { getSingleInvoice } from "@/data/singleInvoice";
import { formatDate, formatPrice } from "@/lib/functions";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { DeleteModal } from "./DeleteModal";
import { AddEditModalContext } from "@/context/AddEditModalContext";
import { AddEditInvoice } from "./AddEditInvoice";
import { InvoiceProps } from "@/lib/interfaces";
import { TriggerContext } from "@/context/TriggerContext";

export const ViewInvoice = () => {
  const { addEditModal, toggle } = useContext(AddEditModalContext);
  const { triggerToggle, trigger } = useContext(TriggerContext);
  const [invoice, setInvoice] = useState<InvoiceProps>();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  console.log(invoice);
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const getData = useCallback(async () => {
    if (!id) return;
    const response = await getSingleInvoice(id);
    if (!response) return;
    setInvoice(response as InvoiceProps);
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData, trigger]);

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
  const statusColors =
    invoice.status === "pending"
      ? "bg-pending text-pending"
      : invoice.status === "paid"
      ? "bg-emerald-500 text-emerald-500"
      : "bg-draft text-draft";

  return (
    <>
      <div className="w-[730px] mt-[50px] mx-auto md:w-full  md:p-8 ">
        <Button
          onClick={() => {
            router.back();
          }}
          variant={"ghost"}
          className="flex items-center gap-6 font-bold hover:bg-transparent focus:text-primary hover:text-light-purple"
        >
          <FaChevronLeft className="text-primary w-4 h-4  " />
          Go back
        </Button>

        <div className="w-full h-[88px] rounded-lg flex items-center justify-between px-8 py-6 bg-white mt-8 dark:bg-Slate-Teal">
          <div className="flex items-center sm:w-full sm:justify-between gap-5">
            <small className="text-[13px] font-medium text-Soft-Teal dark:text-Bright-Turquoise">
              Status
            </small>
            <div
              className={`w-[104px] h-10 ${statusColors}  bg-opacity-10 rounded-md flex items-center justify-center gap-2`}
            >
              <div className={`w-2 h-2 rounded-full ${statusColors} `} />
              <b className={` capitalize`}>{invoice.status}</b>
            </div>
          </div>

          <div className="space-x-2 sm:fixed sm:bottom-0 sm:left-0 md:bg-Slate-Teal sm:flex sm:justify-center sm:w-screen sm:h-20 sm:items-center ">
            <Button
              onClick={() => {
                toggle();
              }}
              variant={"ghost"}
              className="text-Subtle-Turquoise pt-2.5 font-bold rounded-3xl h-12 w-16 hover:text-primary text-[15px] hover:bg-transparent focus:text-primary dark:bg-Dusty-Aqua dark:hover:bg-Bright-Turquoise "
            >
              Edit
            </Button>

            <Button
              onClick={() => setDeleteModal(true)}
              className="bg-destructive/95 pt-2.5 hover:bg-destructive/75 text-white rounded-3xl w-[89px] h-12 text-[15px] font-bold tracking-wide dark:hover:bg-destructive-foreground"
            >
              Delete
            </Button>
            {invoice.status === "pending" && (
              <Button
                onClick={() => {
                  markAsPaid(invoice.id);
                  triggerToggle();
                }}
                className="rounded-3xl w-[131px] pt-2.5 h-12 text-[15px] font-bold tracking-wide hover:bg-light-purple"
              >
                Mark as Paid{" "}
              </Button>
            )}
          </div>
        </div>

        <div className="my-6 bg-white rounded-lg p-12 dark:bg-Slate-Teal ">
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
            <div className="text-Subtle-Turquoise text-[13px] font-medium text-right dark:text-Bright-Turquoise">
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
                <div key={item.id} className=" text-dark dark:text-white">
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
      </div>
      {deleteModal && (
        <DeleteModal id={invoice.id} setDeleteModal={setDeleteModal} />
      )}

      {addEditModal && <AddEditInvoice edit invoice={invoice} />}
    </>
  );
};
