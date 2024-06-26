"use client";
import { useContext, useEffect, useState } from "react";
import { Invoices } from "./Invoices";
import { TopSection } from "./TopSection";
import { AddEditInvoice } from "./modals/AddEditInvoice";
import { AddEditModalContext } from "@/context/AddEditModalContext";
import { getInvoices } from "@/data/invoices";
import Loading from "../Loading";
import { InvoiceProps } from "@/lib/interfaces";
import Image from "next/image";
import ullistration from "@/components/assets/illustration-empty.svg";
import { TriggerContext } from "@/context/TriggerContext";
import { PopUpMessage } from "./modals/PopUpMessage";
import { NotificationContext } from "@/context/NotificationContext";

export const DashboardWrapper = () => {
  const { addEditModal } = useContext(AddEditModalContext);
  const { trigger } = useContext(TriggerContext);
  const { notification } = useContext(NotificationContext);
  const [invoices, setInvoices] = useState<InvoiceProps[]>([]);
  const [ismounted, setIsmounted] = useState<boolean>(false);
  useEffect(() => {
    const getData = async () => {
      const response = await getInvoices();
      setInvoices(response as InvoiceProps[]);
    };
    getData();
    setIsmounted(true);
  }, [trigger]);
  const filters = ["draft", "pending", "paid"];
  const [checked, setChecked] = useState<Array<string>>([]);

  const updatedInvoices = invoices &&
    checked.length > 0
      ? invoices?.filter((invoice) =>
          checked.some((status) => invoice.status.includes(status))
        )
      : invoices;

  if (!ismounted || !invoices)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  return (
    <>
      <div className=" mx-auto w-[730px] mt-[77px] space-y-16 relative p-4  md:w-[100%]  ">
        <TopSection
          invoices={invoices}
          filters={filters}
          checked={checked}
          setChecked={setChecked}
        />
        {updatedInvoices?.length > 0 && <Invoices invoices={updatedInvoices} />}
        {updatedInvoices?.length === 0 && (
          <div className="flex flex-col justify-center items-center h-[60vh] text-center">
            <Image src={ullistration} alt="ullistration empty" />
            <h1 className="text-2xl font-bold text-dark -tracking-[0.75px] mt-16 mb-6 dark:text-white">
              There is nothing here
            </h1>
            <p className="w-[193px] mx-auto text-Soft-Teal text-[13px] dark:text-Bright-Turquoise">
              {" "}
              Create an invoice by clicking the New Invoice button and get
              started
            </p>
          </div>
        )}
      </div>

      {addEditModal && <AddEditInvoice edit={false} />}
      {notification && <PopUpMessage />}
    </>
  );
};
