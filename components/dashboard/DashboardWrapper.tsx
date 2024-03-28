"use client";
import { useContext } from "react";
import { Invoices } from "./Invoices";
import { TopSection } from "./TopSection";
import { AddEditInvoice } from "./modals/AddEditInvoice";
import { AddEditModalContext } from "@/context/AddEditModalContext";

export const DashboardWrapper = () => {
  const { addEditModal } = useContext(AddEditModalContext);

  return (
    <>
      <div className=" mx-auto w-[730px] mt-[77px] space-y-16 relative">
        <TopSection />
        <Invoices />
      </div>

      {addEditModal && <AddEditInvoice />}
    </>
  );
};
