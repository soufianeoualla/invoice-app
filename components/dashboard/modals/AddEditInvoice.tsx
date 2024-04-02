"use client";
import { AddEditModalContext } from "@/context/AddEditModalContext";
import { BillForm } from "../AddEditInvoice/BillForm";
import { useContext, useState } from "react";
import { InvoiceProps } from "@/lib/interfaces";

type EditProp = Partial<{
  invoice: InvoiceProps;
  edit: boolean;
}>;


export const AddEditInvoice = ({ edit, invoice }: EditProp) => {
  const { toggle } = useContext(AddEditModalContext);
  
  return (
    <>
      <div
        onClick={toggle}
        className="w-full top-0 left-0 h-full fixed bg-dark/40 z-10 md:z-30 dark:bg-dark/80"
      ></div>
      <div className="bg-white w-[610px] h-screen absolute top-0 left-[90px] rounded-r-2xl p-14 shadow-md z-20 overflow-y-scroll dark:bg-dark md:z-40 md:left-0 sm:w-screen sm:h-[110vh] ">
        <div className="text-2xl font-bold mb-20 text-dark dark:text-white">
          {edit ? <h1 className="">Edit Invoice <span className="text-Soft-Teal text-2xl">#</span><span className="uppercase text-2xl">{invoice?.id}</span></h1> : "New Invoice"}
        </div>
        <BillForm edit={edit} invoice={invoice as InvoiceProps}  />
      </div>
      
    </>
  );
};
