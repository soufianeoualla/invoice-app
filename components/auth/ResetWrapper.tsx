"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import logo from "@/public/logo.svg";
import { ResetForm } from "@/components/auth/ResetForm";
import { useSearchParams } from "next/navigation";
import { ResetPassword } from "./ResetPassword";

const ResetWrapper = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  return (
    <Card className="w-[400px] mx-auto">
      <CardHeader className=" space-y-3 flex items-center gap-x-3">
        <div className=" w-[50px] h-[50px] relative">
          <div className="w-full h-full bg-primary rounded-r-2xl " />
          <div className="w-full h-[50%] bg-primary-foreground rounded-br-2xl rounded-tl-2xl absolute bottom-0" />
          <Image
            width={20}
            height={20}
            src={logo}
            alt="Invoice app logo"
            className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
          />
        </div>

        <CardDescription>{"Reset your password"} </CardDescription>
      </CardHeader>
      <CardContent className=" grid gap-4">
        {token ? <ResetPassword token={token} /> : <ResetForm />}
      </CardContent>
    </Card>
  );
};

export default ResetWrapper;
