"use client";
import { useEffect, useState } from "react";
import { SingleInvoice } from "./SingleInvoice";
import { getInvoices } from "@/data/invoices";
import Loading from "../Loading";

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
  createdAt: Date|string;
  invoiceDate:Date | string;
  paymentDue: string;
  updatedAt: Date | string;
  userId: string;
  clientAddress: AddressProps[];
  item: ItemProps[];
  senderAddress: AddressProps[];
  error: string;
}


export const Invoices = () => {
  const [invoices, setInvoices] = useState<InvoiceProps[] | undefined>();
  useEffect(() => {
    const getData = async () => {
      const response = await getInvoices();
      setInvoices(response as InvoiceProps[]);
    };
    getData();
  }, []);

  if(!invoices) return (
    <div className="h-[50vh] flex items-center justify-center">
      <Loading/>
    </div>
  )

  return (
    <div className="w-full">
      {invoices.map((item) => (
        <SingleInvoice key={item.id} invoice={item} />
      ))}
    </div>
  );
};
