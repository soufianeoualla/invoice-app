"use client";
import Image from "next/image";
import logo from "@/public/logo.svg";
import moon from "@/components/assets/icon-moon.svg";
import sun from "@/components/assets/icon-sun.svg";
import Link from "next/link";
import { FaUserLarge } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { getSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { IoMdLogOut } from "react-icons/io";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export const Sidebar = () => {
  const [image, setimage] = useState<string | null | undefined>();
  const { setTheme, theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  useEffect(() => {
    const getImage = async () => {
      const session = await getSession();
      const image = session?.user?.image;
      setimage(image);
    };
    getImage();
  }, []);

  return (
    <div className=" bg-DustyAqua h-screen bg-Dusty-Aqua rounded-r-2xl flex flex-col justify-between z-30 md:h-20 md:flex-row md:rounded-none ">
      <Link href={"/"}>
        <div className="logo w-full h-[100px] md:w-20 md:h-20 relative">
          <div className="w-full h-full bg-primary rounded-r-2xl " />
          <div className="w-full h-[50%] bg-primary-foreground rounded-br-2xl rounded-tl-2xl absolute bottom-0" />
          <Image
            width={40}
            height={40}
            src={logo}
            alt="Invoice app logo"
            className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
          />
        </div>
      </Link>
      <div className="relative   ">
        {currentTheme === "light" && (
          <button
            onClick={() => setTheme("dark")}
            className="absolute top-[-50px] left-1/2 translate-x-[-50%] md:top-1/2 md:-translate-y-1/2 md:-left-12  "
          >
            <Image src={moon} alt="moon" />
          </button>
        )}
        {currentTheme === "dark" && (
          <button
            onClick={() => setTheme("light")}
            className="absolute top-[-50px] left-1/2 translate-x-[-50%] md:top-1/2 md:-translate-y-1/2  md:-left-12 "
          >
            <Image src={sun} alt="sun" />
          </button>
        )}

        <div className="w-full h-20 flex justify-center items-center border-t border-t-Soft-Teal md:border-t-transparent md:border-l-Soft-Teal md:border-l md:w-24">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                {image ? (
                  <Image
                    src={image}
                    alt="user avatar"
                    className="rounded-full w-10 h-10 "
                  />
                ) : (
                  <FaUserLarge className="text-white text-xl" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white dark:bg-dark border-none">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="text-dark dark:text-white">
                <DropdownMenuItem>Profile</DropdownMenuItem>

                <DropdownMenuItem onClick={()=>signOut()}>
                  Log out
                  <DropdownMenuShortcut>
                    <IoMdLogOut className="text-xl" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
