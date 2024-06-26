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
  try {
    const existingInvoice = await db.invoice.findUnique({
      where: {
        id: id,
      },
      include: {
        senderAddress: true,
        clientAddress: true,
        item: true,
      },
    });
    if (!existingInvoice) return { error: "Invoice not found" };

    const existingUser = await getUserById(existingInvoice.userId);
    if (!existingUser) return { error: "User not found" };

    const existngSenderAddress = await db.senderAddress.findFirst({
      where: { invoiceId: id },
    });
    const existngClientAddress = await db.clientAddress.findFirst({
      where: { invoiceId: id },
    });
    const items = await db.item.findMany({
      where: { invoiceId: id },
    });
    const deletePromises = [
      existngSenderAddress &&
        db.senderAddress.deleteMany({
          where: {
            invoiceId: existingInvoice.id,
          },
        }),
      existngClientAddress &&
        db.clientAddress.deleteMany({
          where: {
            invoiceId: existingInvoice.id,
          },
        }),
      items &&
        db.item.deleteMany({
          where: {
            invoiceId: existingInvoice.id,
          },
        }),
    ];
    await Promise.all(deletePromises);

    await db.invoice.delete({
      where: {
        id: existingInvoice.id,
      },
    });

    return { success: "Invoice successfully deleted" };
  } catch (error) {
    return { error: "An error occurred while deleting the invoice" };
  }
};
