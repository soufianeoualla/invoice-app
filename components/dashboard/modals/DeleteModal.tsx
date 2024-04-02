"use client";
import { deleteInvoice } from "@/actions/InvoiceActions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  useTransition,
} from "react";
import { TriggerContext } from "@/context/TriggerContext";
import { NotificationContext } from "@/context/NotificationContext";

interface DeleteModalProp {
  id: string;
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
}

export const DeleteModal = ({ id, setDeleteModal }: DeleteModalProp) => {
  const { triggerToggle } = useContext(TriggerContext);
  const [isPending, startTransition] = useTransition();
  const { notificationToggle, setError, setSuccess } =
    useContext(NotificationContext);
  const router = useRouter();

  const onDelete = () => {
    startTransition(() => {
      deleteInvoice(id).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
      triggerToggle();
      router.push("/dashboard");
      notificationToggle();
    });
  };
  return (
    <>
      <div
        onClick={() => setDeleteModal(false)}
        className="fixed inset-0 w-full h-full bg-dark/15 z-40 dark:bg-dark/80"
      ></div>
      <div className="w-[480px] absolute top-[20%] left-1/2 -translate-x-1/2 translate-y-1/2  rounded-lg p-12 z-50 bg-white dark:bg-dark sm:w-[90%]">
        <h1 className="text-xl font-bold -tracking-tighter mb-3 text-dark dark:text-white">
          Confirm Deletion
        </h1>
        <p className="text-Soft-Teal text-[13px] dark:text-Bright-Turquoise">
          Are you sure you want to delete invoice{" "}
          <span className="uppercase">#{id}</span>? This action cannot be
          undone.
        </p>
        <div className="flex justify-end items-center mt-4 gap-x-2">
          <Button
          disabled={isPending}
            onClick={() => setDeleteModal(false)}
            variant={"ghost"}
            className="text-base pt-3 h-12 w-[89px] text-Subtle-Turquoise hover:bg-transparent font-bold rounded-3xl  dark:bg-Dusty-Aqua dark:text-white"
          >
            Cancel
          </Button>
          <Button
          disabled={isPending}
            onClick={onDelete}
            variant={"destructive"}
            className="text-base pt-3 rounded-3xl h-12 w-[89px] font-bold  text-white "
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};
