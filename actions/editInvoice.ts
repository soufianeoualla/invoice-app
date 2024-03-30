"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { BillFormSchema } from "@/schemas";
import { z } from "zod";

interface ItemProps {
  itemName: string;
  quantity: number;
  price: number;
  total: number;
  id: string;
}

export const editInvoice = async (
  values: z.infer<typeof BillFormSchema>,
  total: number,
  invoiceDate: Date,
  paymentDue: string,
  items: ItemProps[],
  invoiceId: string
) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return { error: "NOT AUTHORIZED" };

  const existingInvoice = await db.invoice.findUnique({
    where: { id: invoiceId },
    include: { clientAddress: true, item: true, senderAddress: true },
  });
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

  try {
    await db.invoice.update({
      where: { id: invoiceId },
      data: {
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

    const promises = [];

    promises.push(
      db.senderAddress.update({
        where: { id: existingInvoice?.senderAddress[0].id },
        data: {
          street: streetAddress,
          city: city,
          country: country,
          postCode: postCode,
          invoiceId: existingInvoice?.id,
        },
      })
    );

    promises.push(
      db.clientAddress.update({
        where: { id: existingInvoice?.clientAddress[0].id },
        data: {
          street: ClientStreetAddress,
          city: ClientCity,
          country: ClientCountry,
          postCode: ClientPostCode,
          invoiceId: existingInvoice?.id,
        },
      })
    );
    promises.push(
      db.item.deleteMany({
        where: {
          invoiceId: invoiceId,
        },
      })
    );

    promises.push(
      db.item.createMany({
        data: items.map((item) => ({
          invoiceId: invoiceId,
          price: item.price,
          quantity: item.quantity,
          total: item.total,
          itemName: item.itemName,
        })),
      })
    );
    await Promise.all(promises);

    return { success: "Invoice successfully edited" };
  } catch (error) {
    return { error: "An error occurred while editing your invoice invoice" };
  }
};
