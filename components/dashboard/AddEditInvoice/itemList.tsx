import { Dispatch, SetStateAction } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

interface ItemProps {
  ItemName: string;
  quantity: string;
  price: string;
  total: number;
  id: string;
}
interface ItemListProp {
  items: ItemProps[];
  setItems: Dispatch<SetStateAction<ItemProps[]>>;
}


export const ItemList = ({items,setItems}:ItemListProp) => {
 
  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItems((prevItems:any) => {
      const updatedItems = prevItems.map((item:ItemProps) => {
        if (item.id === id) {
          return { ...item, [name]: value };
        }
        return item;
      });

      const updatedItemsWithTotal = updatedItems.map((item:ItemProps) => ({
        ...item,
        total: (parseFloat(item.price) * parseInt(item.quantity)),
      }));

      return updatedItemsWithTotal;
    });
  };
  const onAddNewItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        ItemName: "",
        quantity: '1',
        price: '',
        total: 0,
        id: uuidv4(),
      },
    ]);
  };
  const onItemDelete = (id: string) => {
    setItems(items.filter((item:ItemProps) => item.id !== id));
  };

  return (
    <div className="w-full">
      <h2 className="text-lg font-bold text-Soft-Teal ">Item List</h2>
      <div className="w-full mt-3">
        <div className="flex items-center w-full gap-4 text-Subtle-Turquoise ">
          <span className="w-[35%] text-[13px] font-medium">Item Name</span>
          <span className="w-[10%] text-[13px] font-medium">QTY.</span>
          <span className="w-[16%] text-[13px] font-medium">Price</span>
          <span className="w-[15%] text-[13px] font-medium">Total</span>
        </div>
        <div className="space-y-5 mt-3">
          {items.map((item:ItemProps) => (
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
                ${(item.total) > 0 ? item.total.toFixed(2) : "0.00"}
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
