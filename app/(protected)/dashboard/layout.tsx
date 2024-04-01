
import { Sidebar } from "@/components/Sidebar";
import { PopUpMessage } from "@/components/dashboard/modals/PopUpMessage";
import { ThemeContext } from "@/context/ThemeContext";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {


  return (
    <>
    <ThemeContext>

      <div className="bg-light flex dashboard dark:bg-dark ">
        <Sidebar />

        <div className="h-screen overflow-y-scroll">{children}</div>
      </div>
    </ThemeContext>
     
    </>
  );
};

export default DashboardLayout;
