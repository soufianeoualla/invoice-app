import Image from "next/image";
import logo from "@/public/logo.svg";
import moon from "@/components/assets/icon-moon.svg";
import avatar from "@/components/assets/image-avatar.jpg";

export const Sidebar = () => {
  return (
    <div className=" bg-DustyAqua h-screen bg-Dusty-Aqua rounded-r-2xl flex flex-col justify-between z-30 ">
      <div className="logo w-full h-[103px] relative">
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
      <div className="relative">
        <button className="absolute top-[-50px] left-1/2 translate-x-[-50%]">
          <Image src={moon} alt="moon" />
        </button>
        
        <div className="w-full h-20 flex justify-center items-center border-t border-t-Soft-Teal">
          <Image
            src={avatar}
            alt="user avatar"
            className="rounded-full w-10 h-10"
          />
        </div>
      </div>
    </div>
  );
};
