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
  type: string
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
  const status = type === "draft" ? "draft" : "pending";
  const InvoiceId = uuid().substring(0,5);

  await db.invoice.create({
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
  });
  await db.senderAddress.create({
    data: {
      street: streetAddress,
      city: city,
      country: country,
      postCode: postCode,
      invoiceId: InvoiceId,
    },
  });
  await db.clientAddress.create({
    data: {
      street: ClientStreetAddress,
      city: ClientCity,
      country: ClientCountry,
      postCode: ClientPostCode,
      invoiceId: InvoiceId,
    },
  });
  await db.item.createMany({
    data: items.map((item) => ({
      invoiceId: InvoiceId,
      price: parseFloat(item.price),
      quantity: parseInt(item.quantity),
      total: item.total,
      itemName: item.ItemName,
    })),
  });
};