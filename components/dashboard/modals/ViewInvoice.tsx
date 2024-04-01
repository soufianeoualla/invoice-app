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
import { Summary } from "../viewInvoice/Summary";

export const ViewInvoice = () => {
  const { addEditModal, toggle } = useContext(AddEditModalContext);
  const { triggerToggle, trigger } = useContext(TriggerContext);
  const [invoice, setInvoice] = useState<InvoiceProps>();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
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

       <Summary invoice={invoice} />
      </div>
      {deleteModal && (
        <DeleteModal id={invoice.id} setDeleteModal={setDeleteModal} />
      )}

      {addEditModal && <AddEditInvoice edit invoice={invoice} />}
    </>
  );
};
