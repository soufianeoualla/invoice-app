"use client";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

interface ItemProps {
  ItemName: string;
  quantity: number;
  price: number;
  total: string;
  id: string;
}

export const ItemList = () => {
  const [items, setItems] = useState<ItemProps[]>([
    {
      ItemName: "",
      quantity: 1,
      price: 0,
      total: "",
      id: uuidv4(),
    },
  ]);
  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, [name]: value };
        }
        return item;
      });

      const updatedItemsWithTotal = updatedItems.map((item) => ({
        ...item,
        total: (item.price * item.quantity).toString(),
      }));

      return updatedItemsWithTotal;
    });
  };
  const onAddNewItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        ItemName: "",
        quantity: 1,
        price: 0,
        total: "",
        id: uuidv4(),
      },
    ]);
  };
  const onItemDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full">
      <h2 className="text-lg font-bold text-Soft-Teal ">Item List</h2>
      <div className="w-full mt-3">
        <div className="flex items-center w-full gap-4 text-Subtle-Turquoise text-[13px] font-medium">
          <span className="w-[35%]">Item Name</span>
          <span className="w-[10%]">QTY.</span>
          <span className="w-[16%]">Price</span>
          <span className="w-[15%]">Total</span>
        </div>
        <div className="space-y-5 mt-3">
          {items.map((item: ItemProps) => (
            <div key={item.id} className="flex w-full items-center gap-4">
              <Input
                className="w-[35%] font-bold text-dark"
                value={item.ItemName}
                name="ItemName"
                onChange={(e) => handleChange(item.id, e)}
              />
              <Input
                className="w-[10%] font-bold text-dark"
                type="number"
                value={item.quantity}
                name="quantity"
                onChange={(e) => handleChange(item.id, e)}
              />
              <Input
                className="w-[16%] font-bold text-dark"
                value={item.price}
                type="number"
                name="price"
                onChange={(e) => handleChange(item.id, e)}
              />
              <span className="w-[15%] text-Soft-Teal font-bold">
                {" "}
                ${parseFloat(item.total) > 0 ? item.total : "0.00"}
              </span>
              <Button
                onClick={() => onItemDelete(item.id)}
                variant={"ghost"}
                size={"sm"}
                className=""
              >
                <MdDelete className="text-Soft-Teal text-xl hover:text-destructive " />
              </Button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          onClick={onAddNewItem}
          className="bg-light rounded-2xl w-full h-12 text-Subtle-Turquoise -tracking-wide  mt-5 font-bold hover:bg-Bright-Turquoise "
        >
          + Add New Item
        </Button>
      </div>
    </div>
  );
};
