import { ViewInvoice } from "@/components/dashboard/modals/ViewInvoice";
import { AddEditModalProvider } from "@/context/AddEditModalContext";
import React, { Suspense } from "react";

const ViewIncoicePage = () => {
  return (
    <>
      <Suspense>
        <AddEditModalProvider>
          <ViewInvoice />
        </AddEditModalProvider>
      </Suspense>
    </>
  );
};

export default ViewIncoicePage;
