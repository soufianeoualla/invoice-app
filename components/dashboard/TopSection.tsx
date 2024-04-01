"use client";

import { Dispatch, SetStateAction, useContext, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { IoChevronDown } from "react-icons/io5";
import { AddEditModalContext } from "@/context/AddEditModalContext";
import { InvoiceProps } from "@/lib/interfaces";

interface Invoices {
  invoices: InvoiceProps[];
  filters: Array<string>;
  checked: Array<string>;
  setChecked: Dispatch<SetStateAction<Array<string>>>;
}

export const TopSection = ({
  invoices,
  filters,
  checked,
  setChecked,
}: Invoices) => {
  const { toggle } = useContext(AddEditModalContext);
  const pendingInvoices = invoices.filter((item) => item.status === "pending");
  const handleChecked = (item: string) => {
    if (checked.includes(item)) {
      return setChecked(checked.filter((filter) => filter !== item));
    }
    setChecked((prev) => [...prev, item]);
  };

  return (
    <section className="flex items-center justify-between w-full text-[15px]">
      <div>
        <h1 className="font-bold text-4xl text-dark dark:text-white sm:text-2xl">
          Invoices
        </h1>
        <p className="text-Soft-Teal dark:text-Bright-Turquoise sm:hidden">
          {invoices.length > 0
            ? `There are ${pendingInvoices.length} pending invoices`
            : "No invoices"}
        </p>
        <p className="text-Soft-Teal dark:text-Bright-Turquoise hidden sm:block">
          {invoices.length > 0
            ? ` ${invoices.length} invoices`
            : "No invoices"}
        </p>
      </div>

      <div>
        <div className="flex items-center gap-x-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size={"default"}>
                <div className="flex justify-between items-center text-dark dark:text-white">
                  <b className="sm:hidden">Filter by status</b>
                  <b className="hidden sm:block">Filter </b>
                  <IoChevronDown className="ml-4 text-primary" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 p-3 space-y-1  dark:border-Dusty-Aqua dark:bg-Slate-Teal ">
              {filters.map((item, index) => (
                <DropdownMenuCheckboxItem
                  className="capitalize text-dark dark:text-white"
                  onClick={() => handleChecked(item)}
                  key={index}
                  checked={checked.includes(item)}
                >
                  {item}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            onClick={() => toggle()}
            className="w-[150px] h-12 flex gap-2 px-2 justify-start items-center rounded-3xl text-white bg-primary hover:bg-primary-foreground sm:w-[90px] sm:h-11 "
          >
            <div className="w-8 h-8 rounded-full flex justify-center items-center bg-white">
              <FaPlus className="text-primary" />
            </div>
            <b className="pt-1 sm:hidden">New Invoice</b>
            <b className="pt-1 hidden sm:block">New</b>
          </button>
        </div>
      </div>
    </section>
  );
};
