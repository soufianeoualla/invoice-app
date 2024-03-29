interface AddressProps {
  id: number;
  street: string;
  city: string;
  postCode: string;
  country: string;
  invoiceId: string;
}

interface ItemProps {
  id: number;
  itemName: string;
  quantity: number;
  price: number;
  total: number;
  invoiceId: string;
}

export interface InvoiceProps {
  id: string;
  description: string | null;
  clientName: string;
  clientEmail: string;
  total: number;
  status: string;
  createdAt: Date | string;
  invoiceDate: Date | string;
  paymentDue: string;
  updatedAt: Date | string;
  userId: string;
  clientAddress: AddressProps[];
  item: ItemProps[];
  senderAddress: AddressProps[];
  error: string;
}
