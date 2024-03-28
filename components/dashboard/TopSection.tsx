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

export const TopSection = () => {
  const { toggle } = useContext(AddEditModalContext);
  const filters = ["draft", "pending", "paid"];
  const [checked, setChecked] = useState<Array<string>>([]);

  const handleChecked = (item: string) => {
    if (checked.includes(item)) {
      return setChecked(checked.filter((filter) => filter !== item));
    }
    setChecked((prev) => [...prev, item]);
  };
  return (
    <section className="flex items-center justify-between w-full text-[15px]">
      <div>
        <h1 className="font-bold text-4xl text-dark">Invoices</h1>
        <p className="text-Soft-Teal">There are 4 pending invoices</p>
      </div>

      <div>
        <div className="flex items-center gap-x-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size={"default"}>
                <div className="flex justify-between items-center text-dark">
                  <b>Filter by status</b>
                  <IoChevronDown className="ml-4 text-primary" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 p-3 space-y-1 ">
              {filters.map((item, index) => (
                <DropdownMenuCheckboxItem
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
            onClick={()=>toggle()}
            className="w-[150px] h-12 flex gap-4 px-2 justify-start items-center rounded-3xl text-white bg-primary hover:bg-primary-foreground "
          >
            <div className="w-8 h-8 rounded-full flex justify-center items-center bg-white">
              <FaPlus className="text-primary" />
            </div>
            <b className="pt-1">New Invoice</b>
          </button>
        </div>
      </div>
    </section>
  );
};
