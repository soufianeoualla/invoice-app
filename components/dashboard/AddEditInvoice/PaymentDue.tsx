"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const PaymentDue = () => {
  const [paymentDue, setPaymentDue] = useState<string | undefined>("");

  const handlePayemntDueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentDue(e.target.value);
  };
  return (
    <div className="space-y-2 w-[48%]">
      <span className="text-[13px] text-Subtle-Turquoise font-medium ">
        Payment Due
      </span>
      <Select defaultValue="7">
        <SelectTrigger className="w-full h-11">
          <SelectValue placeholder="Net 7 Days" />
        </SelectTrigger>
        <SelectContent defaultValue={"7"} >
          <SelectItem onChange={handlePayemntDueChange} value="1">
            Net 1 Day
          </SelectItem>
          <SelectItem
            defaultChecked
            onChange={handlePayemntDueChange}
            value="7"
          >
            Net 7 Days
          </SelectItem>
          <SelectItem onChange={handlePayemntDueChange} value="14">
            Net 14 Days
          </SelectItem>
          <SelectItem onChange={handlePayemntDueChange} value="30">
            Net 30 Days
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
