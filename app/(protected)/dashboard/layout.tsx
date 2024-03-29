import { Sidebar } from "@/components/Sidebar";
import { AddEditModalProvider } from "@/context/AddEditModalContext";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="bg-light flex dashboard ">
      <Sidebar />
      <AddEditModalProvider>
        <div className="h-screen overflow-y-scroll">{children}</div>
      </AddEditModalProvider>
    </div>
  );
};

export default DashboardLayout;
