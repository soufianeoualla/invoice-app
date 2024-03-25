import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import hero_image from "@/components/assets/hero-section.svg";
export const HeroSection = () => {
  return (
    <div className="flex   items-center h-[70vh]  max-w-screen-xl mx-auto justify-around">
      <div className="space-y-4 w-[25%]">
        <h1 className="text-4xl font-bold capitalize text-dark ">
          Say Goodbye to invoice Stress
        </h1>
        <p className="text-Soft-Teal">
          Manage your invoices and payemets with ease, even with an irregular
          schedule
        </p>
        <div className="flex items-center gap-x-4">
        <Button
          className="hover:text-primary h-11 border-primary bg-primary text-white"
          asChild
          size={"default"}
          variant={"outline"}
        >
          <Link className="w-28 " href={"/dashboard"}>
            Get Started
          </Link>
        </Button>

        <p className="tracking-widest text-dark/70">Try Demo</p>

        </div>
      </div>

      <Image width={600} src={hero_image} alt="Payment" />
    </div>
  );
};
