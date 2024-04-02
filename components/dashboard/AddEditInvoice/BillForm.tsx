"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { v4 as uuidv4 } from "uuid";
import { Input } from "@/components/ui/input";
import { BillFormSchema } from "@/schemas";
import { ItemList } from "./itemList";
import { DatePicker } from "./DatePicker";
import { PaymentDue } from "./PaymentDue";
import { Button } from "@/components/ui/button";
import { useContext, useState, useTransition } from "react";
import { AddEditModalContext } from "@/context/AddEditModalContext";
import { addInvoice, addInvoiceDraft } from "@/actions/addInvoice";
import { InvoiceProps } from "@/lib/interfaces";
import { editInvoice } from "@/actions/editInvoice";
import { TriggerContext } from "@/context/TriggerContext";
import { NotificationContext } from "@/context/NotificationContext";

interface errorProp {
  itemName: string;
  quantity: string;
  price: string;
}
interface EditProp {
  edit: boolean | undefined;
  invoice: InvoiceProps;
}
export const BillForm = ({ edit, invoice }: EditProp) => {
  const { triggerToggle } = useContext(TriggerContext);
  const { toggle } = useContext(AddEditModalContext);
  const { setError, setSuccess, notificationToggle } =
    useContext(NotificationContext);
  const form = useForm<z.infer<typeof BillFormSchema>>({
    resolver: zodResolver(BillFormSchema),
    defaultValues: {
      city: edit ? invoice?.senderAddress[0]?.city : "",
      country: edit ? invoice?.senderAddress[0]?.country : "",
      postCode: edit ? invoice?.senderAddress[0]?.postCode : "",
      streetAddress: edit ? invoice?.senderAddress[0]?.street : "",
      ClientCity: edit ? invoice?.clientAddress[0]?.city : "",
      ClientCountry: edit ? invoice?.clientAddress[0]?.country : "",
      clientEmail: edit ? invoice?.clientEmail : "",
      clientName: edit ? invoice?.clientName : "",
      ClientPostCode: edit ? invoice?.clientAddress[0]?.postCode : "",
      ClientStreetAddress: edit ? invoice?.clientAddress[0]?.street : "",
      Description: edit ? (invoice?.description as string) : "",
    },
  });

  const [date, setDate] = useState<Date | undefined>(
    edit ? new Date(invoice.invoiceDate) : new Date()
  );
  const [paymentDue, setPaymentDue] = useState<string | undefined>(
    edit ? invoice.paymentDue : "7"
  );
  const [itemError, setItemError] = useState<errorProp | undefined>({
    itemName: "",
    quantity: "",
    price: "",
  });
  const [isPending, startTransition] = useTransition();
  const [items, setItems] = useState<any>(
    edit
      ? invoice.item
      : [
          {
            itemName: "",
            quantity: 1,
            price: 0,
            total: 0,
            id: uuidv4(),
          },
        ]
  );
  const total = items.reduce((acc: number, item: any) => acc + item.total, 0);

  const validateItems = () => {
    const errors: errorProp = {
      itemName: "",
      quantity: "",
      price: "",
    };
    items.forEach((item: any) => {
      if (item.itemName === "") {
        errors.itemName = "Item name cannot be empty";
      }

      if (item.quantity === "") {
        errors.quantity = "Quantity cannot be empty";
      } else if (parseInt(item.quantity) < 1) {
        errors.quantity = "Quantity must be greater than one";
      }

      if (item.price === "") {
        errors.price = "price cannot be empty";
      } else if (parseInt(item.price) < 1) {
        errors.quantity = "price must be greater than one";
      }
    });
    setItemError(errors ? errors : undefined);
  };
  const onSave =  (values: z.infer<typeof BillFormSchema>) => {
     validateItems();
    if (itemError?.itemName || itemError?.price || itemError?.quantity) return;

    startTransition(() => {
      if (edit) {
        editInvoice(
          values,
          total,
          date as Date,
          paymentDue as string,
          items,
          invoice.id
        ).then((data) => {
          setError(data?.error);
          setSuccess(data?.success);
        });
      } else {
        addInvoice(
          values,
          total,
          date as Date,
          paymentDue as string,
          items
        ).then((data) => {
          setError(data?.error);
          setSuccess(data?.success);
        });
      }
      triggerToggle();
      notificationToggle();
      toggle();
    });

   
  };

  const onSaveDraft = () => {
    const values = form.getValues();
    startTransition(() => {
      addInvoiceDraft(values, total, date as Date, paymentDue as string, items);
      toggle();
      triggerToggle();
    });
  };

  return (
    <>
      <div>
        <h2 className="text-primary mb-6 font-bold">Bill Form</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSave)} className="space-y-6">
            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-6">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="postCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Code</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <h2 className="text-primary mb-6 font-bold">Bill To</h2>
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client&lsquo;s Name</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clientEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client&lsquo;s Email</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ClientStreetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-6">
              <FormField
                control={form.control}
                name="ClientCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ClientPostCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Code</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ClientCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className=" flex items-center justify-between w-full ">
              <div className="space-y-2 w-[48%]">
                <span className="text-[13px] text-Subtle-Turquoise font-medium dark:text-Bright-Turquoise ">
                  Invoice Date
                </span>
                <DatePicker setDate={setDate} date={date} />
              </div>
              <PaymentDue setPaymentDue={setPaymentDue} />
            </div>
            <FormField
              control={form.control}
              name="Description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      className="w-full"
                      type="text"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-10">
              <ItemList setItems={setItems} items={items} />

              <div className="text-[12px] text-destructive grid capitalize">
                <em> {itemError?.itemName}</em>
                <em> {itemError?.quantity}</em>
                <em> {itemError?.price}</em>
              </div>

              <div
                className={` flex ${
                  edit ? "justify-end gap-2" : "justify-between"
                } items-center `}
              >
                <Button
                  variant={"ghost"}
                  type="button"
                  onClick={toggle}
                  disabled={isPending}
                  className={` pt-2.5 h-12  hover:bg-transparent  text-sm rounded-3xl font-bold  ${
                    edit
                      ? "dark:bg-Dusty-Aqua/80 text-Soft-Teal dark:hover:text-white"
                      : "dark:bg-light text-light-purple hover:text-dark"
                  }`}
                >
                  Discard
                </Button>
                <div className=" ml-2 space-x-2 flex items-center">
                  {!edit && (
                    <Button
                      onClick={onSaveDraft}
                      type="button"
                      disabled={isPending}
                      className="bg-Dusty-Aqua text-Soft-Teal h-12 pt-2.5 w-[133px] sm:w[20%] font-bold text-[15px] rounded-3xl hover:bg-dark dark:bg-Dusty-Aqua/80"
                    >
                      Save as Draft
                    </Button>
                  )}
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="font-bold text-[15px]  h-12 pt-2.5 w-[133px] sm:w[20%] rounded-3xl"
                  >
                    Save & Send
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
