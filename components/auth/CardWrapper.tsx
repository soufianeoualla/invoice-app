import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import SocialProviders from "./SocialProviders";
import ResetPassword from "./ResetPassword";
import RegisterForm from "./RegisterForm";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { LoginForm } from "./LoginForm";
interface CardWrapperProps {
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  type: string;
  showSocial: boolean;
}

const CardWrapper = ({
  headerLabel,
  backButtonHref,
  backButtonLabel,
  type,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="text-center w-[400px] sm:w-[90%] shadow-md ">
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

        <CardDescription>{headerLabel} </CardDescription>
      </CardHeader>
      <CardContent className=" grid gap-2">
        {type === "login" ? (
          <LoginForm />
        ) : type === "register" ? (
          <RegisterForm />
        ) : (
          type === "reset" && <ResetPassword />
        )}
        <Link
          className=" text-muted-foreground hover:text-black hover:underline "
          href={backButtonHref}
        >
          {backButtonLabel}
        </Link>
      </CardContent>

      {showSocial && (
        <CardFooter>
          <SocialProviders />
        </CardFooter>
      )}
    </Card>
  );
};

export default CardWrapper;
