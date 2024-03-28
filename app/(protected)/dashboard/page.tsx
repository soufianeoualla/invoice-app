import { DashboardWrapper } from "@/components/dashboard/DashboardWrapper";
import { AddEditModalProvider } from "@/context/AddEditModalContext";

const DashboardPage = () => {
  return (
    <>
      <AddEditModalProvider>
        <DashboardWrapper />
      </AddEditModalProvider>
    </>
  );
};

export default DashboardPage;
