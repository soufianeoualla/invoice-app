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

interface ItemProps {
  ItemName: string;
  quantity: string;
  price: string;
  total: number;
  id: string;
}
interface errorProp {
  ItemName: string;
  quantity: string;
  price: string;
}
interface EditProp{
  edit : boolean
}
export const BillForm = ({edit}:EditProp) => {
  const { toggle } = useContext(AddEditModalContext);
  const form = useForm<z.infer<typeof BillFormSchema>>({
    resolver: zodResolver(BillFormSchema),
    defaultValues: {
      city: "",
      country: "",
      postCode: "",
      streetAddress: "",
      ClientCity: "",
      ClientCountry: "",
      clientEmail: "",
      clientName: "",
      ClientPostCode: "",
      ClientStreetAddress: "",
      Description: "",
    },
  });

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [paymentDue, setPaymentDue] = useState<string | undefined>("7");
  const [error, setError] = useState<errorProp | undefined>({
    ItemName: "",
    quantity: "",
    price: "",
  });
  const [isPending, startTransition] = useTransition();
  const [items, setItems] = useState<ItemProps[]>([
    {
      ItemName: "",
      quantity: "1",
      price: "",
      total: 0,
      id: uuidv4(),
    },
  ]);
  const total = items.reduce((acc, item) => acc + item.total, 0);

  const validateItems = () => {
    const errors: errorProp = {
      ItemName: "",
      quantity: "",
      price: "",
    };
    items.forEach((item) => {
      if (item.ItemName.trim() === "") {
        errors.ItemName = "Item name cannot be empty";
      }

      if (item.quantity.trim() === "") {
        errors.quantity = "Quantity cannot be empty";
      } else if (parseInt(item.quantity) < 1) {
        errors.quantity = "Quantity must be greater than one";
      }

      if (item.price.trim() === "") {
        errors.price = "price cannot be empty";
      } else if (parseInt(item.price) < 1) {
        errors.quantity = "price must be greater than one";
      }
    });
    setError(errors ? errors : undefined);

  
  };
  const onSave = (values: z.infer<typeof BillFormSchema>) => {
   validateItems()
   if(error?.ItemName || error?.price || error?.quantity) return
    startTransition(() => {
      addInvoice(
        values,
        total,
        date as Date,
        paymentDue as string,
        items,
        
      );
      toggle();
    });
  };
  const onSaveDraft = () => {
    const values = form.getValues()
     startTransition(() => {
       addInvoiceDraft(
         values,
         total,
         date as Date,
         paymentDue as string,
         items,
       );
       toggle();
     });
   };

  return (
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
              <span className="text-[13px] text-Subtle-Turquoise font-medium ">
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
              <em> {error?.ItemName}</em>
              <em> {error?.quantity}</em>
              <em> {error?.price}</em>
            </div>

            <div className="flex justify-between items-center ">
              <Button
                variant={"ghost"}
                type="button"
                onClick={toggle}
                disabled={isPending}
                className="text-light-purple pt-3 hover:bg-transparent hover:text-dark text-sm font-bold"
              >
                Discard
              </Button>
              <div className="space-x-2">
                <Button
                onClick={onSaveDraft}
                type="button"
                  disabled={isPending}
                  className="bg-Dusty-Aqua text-Soft-Teal h-12 pt-3 w-[133px] font-bold text-[15px] rounded-3xl hover:bg-dark"
                >
                  Save as Draft
                </Button>
                <Button
                 type="submit"
                  disabled={isPending}
                  className="font-bold text-[15px]  h-12 pt-3 w-[133px] rounded-3xl"
                >
                  Save & Send
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
