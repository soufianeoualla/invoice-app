"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { BillFormSchema } from "@/schemas";
import { z } from "zod";
import { v4 as uuid } from "uuid";

interface ItemProps {
  ItemName: string;
  quantity: string;
  price: string;
  total: number;
  id: string;
}




export const addInvoice = async (
 

  values: z.infer<typeof BillFormSchema>,
  total: number,
  invoiceDate: Date,
  paymentDue: string,
  items: ItemProps[],
) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return { error: "NOT AUTHORIZED" };

  const validateFields = BillFormSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid Fields" };
  }
  const {
    ClientCity,
    ClientCountry,
    ClientPostCode,
    ClientStreetAddress,
    Description,
    city,
    clientEmail,
    clientName,
    country,
    postCode,
    streetAddress,
  } = validateFields.data;
  const status = "pending";
  const InvoiceId = uuid().substring(0,5);
  const promises:any = [];

  
  promises.push(db.invoice.create({
    data: {
      id: InvoiceId,
      status: status,
      userId: userId,
      clientEmail: clientEmail,
      clientName: clientName,
      description: Description,
      paymentDue: paymentDue,
      invoiceDate: invoiceDate,
      total: total,
    },
  }));
  
  promises.push(db.senderAddress.create({
    data: {
      street: streetAddress,
      city: city,
      country: country,
      postCode: postCode,
      invoiceId: InvoiceId,
    },
  }));
  
  promises.push(db.clientAddress.create({
    data: {
      street: ClientStreetAddress,
      city: ClientCity,
      country: ClientCountry,
      postCode: ClientPostCode,
      invoiceId: InvoiceId,
    },
  }));
  
  promises.push(db.item.createMany({
    data: items.map((item) => ({
      invoiceId: InvoiceId,
      price: parseFloat(item.price),
      quantity: parseInt(item.quantity),
      total: item.total,
      itemName: item.ItemName,
    })),
  }));
  
  await Promise.all(promises);
};


export const addInvoiceDraft = async (
  values: z.infer<typeof BillFormSchema>,
  total: number,
  invoiceDate: Date,
  paymentDue: string,
  items: ItemProps[],
) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return { error: "NOT AUTHORIZED" };

  
  const {
    ClientCity,
    ClientCountry,
    ClientPostCode,
    ClientStreetAddress,
    Description,
    city,
    clientEmail,
    clientName,
    country,
    postCode,
    streetAddress,
  } = values;
  
  const InvoiceId = uuid().substring(0,5);
  const promises:any = [];

  
  promises.push(db.invoice.create({
    data: {
      id: InvoiceId,
      userId: userId,
      clientEmail: clientEmail,
      clientName: clientName,
      description: Description,
      paymentDue: paymentDue,
      invoiceDate: invoiceDate,
      total: total,
    },
  }));
  
  promises.push(db.senderAddress.create({
    data: {
      street: streetAddress,
      city: city,
      country: country,
      postCode: postCode,
      invoiceId: InvoiceId,
    },
  }));
  
  promises.push(db.clientAddress.create({
    data: {
      street: ClientStreetAddress,
      city: ClientCity,
      country: ClientCountry,
      postCode: ClientPostCode,
      invoiceId: InvoiceId,
    },
  }));
  
  promises.push(db.item.createMany({
    data: items.map((item) => ({
      invoiceId: InvoiceId,
      price: parseFloat(item.price) > 0 ? parseFloat(item.price): 0 ,
      quantity: parseInt(item.quantity),
      total: item.total,
      itemName: item.ItemName,
    })),
  }));
  
  await Promise.all(promises);
};