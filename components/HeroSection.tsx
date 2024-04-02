import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import hero_image from "@/components/assets/hero-section.svg";
export const HeroSection = () => {
  return (
    <div className="flex h-[70vh]   items-center   max-w-screen-xl mx-auto justify-around md:p-8  md:gap-10 sm:flex-col-reverse sm:justify-center">
      <div className="space-y-4 w-[25%] sm:w-full">
        <h1 className="text-4xl font-bold capitalize text-dark ">
          Say Goodbye to invoice Stress
        </h1>
        <p className="text-Soft-Teal">
          Manage your invoices and payments with ease, even with irregular
          schedule
        </p>
        <div className="flex items-center gap-x-4">
        <Button
          className=" h-11 border-primary bg-primary text-white  hover:bg-light-purple"
          asChild
          size={"default"}
          variant={"outline"}
        >
          <Link className="w-28 " href={"/dashboard"}>
            Get Started
          </Link>
        </Button>


        </div>
      </div>

      <Image width={600} src={hero_image} alt="Payment" className="md:w-[500px] sm:w-full"/>
    </div>
  );
};
