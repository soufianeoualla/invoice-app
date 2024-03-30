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
        className="w-full top-0 left-0 h-full fixed bg-dark/40 z-10"
      ></div>
      <div className="bg-white w-[610px] h-screen absolute top-0 left-[90px] rounded-r-2xl p-14 shadow-md z-20 overflow-y-scroll  ">
        <h1 className="text-2xl font-bold mb-20">
          {edit ? "Edit Invoice" : "New Invoice"}
        </h1>
        <BillForm edit={edit} invoice={invoice as InvoiceProps}  />
      </div>
      
    </>
  );
};
