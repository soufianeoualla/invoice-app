"use server";

import { getUserById } from "@/data/user";
import { db } from "@/lib/db";

export const markAsPaid = async (id: string) => {
  const existingInvoice = await db.invoice.findUnique({
    where: { id: id },
  });
  if (!existingInvoice) return { error: "Invoice not found" };
  const existingUser = await getUserById(existingInvoice.userId)
  if(!existingUser) return {error:'User not found'}
  await db.invoice.update({
    where:{id:id},
    data:{
      status:'paid'
    }
  })

};

export const deleteInvoice = async (id: string) => {
  const existingInvoice = await db.invoice.findUnique({
    where: { id: id },
  });
  if (!existingInvoice) return { error: "Invoice not found" };
  const existingUser = await getUserById(existingInvoice.userId)
  if(!existingUser) return {error:'User not found'}
  await db.invoice.delete({
    where:{id:id},
  })

};
