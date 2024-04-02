import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.svg";
import { auth } from "@/auth";
import { logOut } from "@/actions/logOut";
import { IoLogOutOutline } from "react-icons/io5";

export const Header = async () => {
  const session = await auth();

  return (
    <header className="mx-auto flex justify-between h-24 max-w-screen-xl items-center gap-8 px-4">
      <div className="logo w-[50px] h-[50%] relative">
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

      {!session && (
        <div className="flex items-center sm:gap-4">
          <Button className="" asChild size={"lg"} variant={"ghost"}>
            <Link href={"/auth/login"}>Login</Link>
          </Button>
          <Button
            className="text-primary border-primary hover:bg-primary hover:text-white"
            asChild
            size={"lg"}
            variant={"outline"}
          >
            <Link className="w-28 rounded-[35px] " href={"/auth/login"}>
              Sign up
            </Link>
          </Button>
        </div>
      )}

      {session && (
        <form action={logOut}>
          <Button type="submit" className=" flex gap-x-2 items-center">
            Log Out
            <IoLogOutOutline className="w-5 h-5" />
          </Button>
        </form>
      )}
    </header>
  );
};
