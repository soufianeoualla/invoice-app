import { Button } from "@/components/ui/button";
import { FaChevronLeft } from "react-icons/fa";

export const ViewInvoice = () => {
  return (
    <div className="w-[730px] mt-[77px] mx-auto ">
      <Button
        variant={"ghost"}
        className="flex items-center gap-6 font-bold hover:bg-transparent"
      >
        <FaChevronLeft className="text-primary w-4 h-4 " />
        Go back
      </Button>

      <div className="w-full h-[88px] rounded-lg flex items-center justify-between px-8 py-6 bg-white mt-8">
        <div className="flex items-center gap-5">
          <small className="text-[13px] font-medium text-Soft-Teal">
            Status
          </small>
          <div className="w-[104px] h-10 bg-pending/15 flex items-center gap-x-2 justify-center text-pending font-bold rounded-md">
            <div className="w-2 h-2 rounded-full bg-pending" />
            <span>Pending</span>
          </div>
        </div>

        <div className="space-x-2">
          <Button
            variant={"ghost"}
            className="text-Subtle-Turquoise font-bold hover:text-primary text-[15px] hover:bg-transparent "
          >
            Edit
          </Button>
          <Button className="bg-destructive/90 hover:bg-destructive/75 text-white rounded-3xl w-[89px] h-12 text-[15px] font-bold tracking-wide">
            Delete
          </Button>
          <Button className="rounded-3xl w-[131px] h-12 text-[15px] font-bold tracking-wide">
            Mark as Paid{" "}
          </Button>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg p-12">
        <div className="flex items-center justify-between">
          <div className="grid gap-y-2">
            <strong className="text-dark">
              <span className="text-Subtle-Turquoise">#</span>XM9141
            </strong>
            <span className="text-Subtle-Turquoise text-[13px] font-medium">
              Graphic Design
            </span>
          </div>
          <div className="text-Subtle-Turquoise text-[13px] font-medium text-right">
            19 Union Terrace <br /> London <br />
            E1 3EZ <br />
            United Kingdom
          </div>
        </div>

        <div className="text-dark flex gap-[20%] items-start mt-5">
          <div className="space-y-8">
            <div className="grid gap-2">
              <span className="text-Subtle-Turquoise text-[13px] font-medium">
                Invoice Date
              </span>
              <strong>21 Aug 2021</strong>
            </div>

            <div className="grid gap-2">
              <span className="text-Subtle-Turquoise text-[13px] font-medium">
                Payment Due
              </span>
              <strong>20 Sep 2021</strong>
            </div>
          </div>

          <div className="grid gap-2">
            <span className="text-Subtle-Turquoise font-medium text-[13px]">
              Bill to
            </span>
            <strong>Alex Grim</strong>
            <p className="text-Subtle-Turquoise font-medium text-[13px]">
              84 Church Way <br /> Bradford <br />
              BD1 9PB <br /> United Kingdom
            </p>
          </div>

          <div className="grid gap-2">
            <span className="text-[13px] text-Subtle-Turquoise font-medium">
              Sent to
            </span>
            <strong>Alexgrim@gmail.com</strong>
          </div>
        </div>

        <div className="px-8 py-10">
          <table className="w-full">
            <tr>
              <th>item Name</th>
              <th>QTY.</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
            <tr>
              <td>Banner Design</td>
              <td>1</td>
              <td>$ 156.00</td>
              <td>$ 156.00</td>
            </tr>
            <tr>
              <td>Email Design</td>
              <td>2</td>
              <td>$ 200.00</td>
              <td>$ 400.00</td>
            </tr>
          
          </table>

          <div className="bg-Dusty-Aqua w-full h-20 px-8 flex justify-between items-center text-white text-[13px] rounded-b-md mt-8">
            <span>Amount Due</span>
            <strong className="text-2xl ">$ 556.00</strong>
          </div>

        </div>
      </div>
    </div>
  );
};
