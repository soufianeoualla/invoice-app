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

import { Input } from "@/components/ui/input";
import { BillFormSchema } from "@/schemas";
import { ItemList } from "./itemList";
import { DatePicker } from "./DatePicker";
import { PaymentDue } from "./PaymentDue";
import { Button } from "@/components/ui/button";
export const BillForm = () => {
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

  return (
    <div>
      <h2 className="text-primary mb-6 font-bold">Bill Form</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})} className="space-y-6">
          <FormField
            control={form.control}
            name="streetAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
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
                    <Input placeholder="" {...field} />
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
                    <Input placeholder="" {...field} />
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
                    <Input placeholder="" {...field} />
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
                  <Input placeholder="" {...field} />
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
                  <Input placeholder="" {...field} />
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
                  <Input placeholder="" {...field} />
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
              <span className="text-[13px] text-Subtle-Turquoise font-medium ">Invoice Date</span>
              <DatePicker />
            </div>
            <PaymentDue />
          </div>
          <FormField
            control={form.control}
            name="Description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Description</FormLabel>
                <FormControl>
                  <Input
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

          <ItemList />

          <div className="flex justify-between items-center ">
            <Button
              className="text-light-purple hover:bg-transparent"
              variant={"ghost"}
            >
              Discard
            </Button>
            <div className="space-x-2">
              <Button className="bg-Dusty-Aqua text-Soft-Teal h-12 pt-3 w-[133px] font-bold text-[15px] rounded-3xl hover:bg-dark">
                Save as Draft
              </Button>
              <Button className="font-bold text-[15px]  h-12 pt-3 w-[133px] rounded-3xl">
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