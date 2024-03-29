"use server";

import { getUserById } from "@/data/user";
import { db } from "@/lib/db";

export const markAsPaid = async (id: string) => {
  const existingInvoice = await db.invoice.findUnique({
    where: { id: id },
  });
  if (!existingInvoice) return { error: "Invoice not found" };
  const existingUser = await getUserById(existingInvoice.userId);
  if (!existingUser) return { error: "User not found" };
  await db.invoice.update({
    where: { id: id },
    data: {
      status: "paid",
    },
  });
};

export const deleteInvoice = async (id: string) => {
  const existingInvoice = await db.invoice.findUnique({
    where: { id: id },
  });
  if (!existingInvoice) return { error: "Invoice not found" };
  const existingUser = await getUserById(existingInvoice.userId);
  if (!existingUser) return { error: "User not found" };
  const senderAddress = await db.senderAddress.findFirst({
    where: { invoiceId: id },
  });
  const clientAddress = await db.clientAddress.findFirst({
    where: { invoiceId: id },
  });
  await Promise.all([
    senderAddress && db.senderAddress.delete({ where: { id: senderAddress.id } }),
    clientAddress && db.clientAddress.delete({ where: { id: clientAddress.id } }),
    db.item.deleteMany({ where: { invoiceId: id } }),
    db.invoice.delete({ where: { id: id } }),
  ]);
};
