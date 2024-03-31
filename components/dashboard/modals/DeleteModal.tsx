"use client";
import { deleteInvoice } from "@/actions/InvoiceActions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { TriggerContext } from "@/context/TriggerContext";
import { NotificationContext } from "@/context/NotificationContext";

interface DeleteModalProp {
  id: string;
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
}

export const DeleteModal = ({ id, setDeleteModal }: DeleteModalProp) => {
  const { triggerToggle } = useContext(TriggerContext);
  const { notificationToggle, setError, setSuccess } =
    useContext(NotificationContext);
  const router = useRouter();

  const onDelete = () => {
    deleteInvoice(id).then((data) => {
      setError(data.error);
      setSuccess(data.success);
    });
    triggerToggle();
    router.push("/dashboard");
    notificationToggle();
  };
  return (
    <>
      <div
        onClick={() => setDeleteModal(false)}
        className="fixed inset-0 w-full h-full bg-dark/15"
      ></div>
      <div className="w-[480px] absolute top-[20%] left-1/2 -translate-x-1/2 translate-y-1/2  rounded-lg p-12 z-20 bg-white">
        <h1 className="text-xl font-bold -tracking-tighter mb-3 text-dark">
          Confirm Deletion
        </h1>
        <p className="text-Soft-Teal text-[13px]">
          Are you sure you want to delete invoice{" "}
          <span className="uppercase">#{id}</span>? This action cannot be
          undone.
        </p>
        <div className="flex justify-end items-center mt-4">
          <Button
            onClick={() => setDeleteModal(false)}
            variant={"ghost"}
            className="text-base pt-3 h-12 w-[89px] text-Subtle-Turquoise hover:bg-transparent font-bold "
          >
            Cancel
          </Button>
          <Button
            onClick={onDelete}
            variant={"destructive"}
            className="text-base pt-3 rounded-3xl h-12 w-[89px] font-bold "
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};
