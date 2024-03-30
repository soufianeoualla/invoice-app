import { Sidebar } from "@/components/Sidebar";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="bg-light flex dashboard ">
      <Sidebar />
      
        <div className="h-screen overflow-y-scroll">{children}</div>
     
    </div>
  );
};

export default DashboardLayout;
