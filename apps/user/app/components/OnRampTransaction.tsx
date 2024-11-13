import { Card } from "@repo/ui/card";
import { Clock10 } from "lucide-react";
import { useState } from "react";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    startTime: Date;
    amount: number;
    status: string;
    provider: string;
  }[];
}) => {
  if (!transactions?.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  const [option, setOption] = useState("");
  const [sortedList, setSortedList] = useState([]);
  const sortArray = (array: any, option: string) => {
    let sortedArray = [];
    switch (option) {
      case "latest":
        sortedArray = array.sort((a:any, b:any) => a?.startTime - b?.startTime);
        break;
      default:
        break;
    }

    setSortedList(sortedArray);
  };
  console.log(option);

  return (
    <div className="space-y-3 w-full">
      <div className="flex items-center gap-4">
        <Clock10 className="animate-spin" />
        <p className="font-bold text-2xl">Transaction History : </p>
      </div>
      <select className="px-2 py-1 rounded-lg bg-transparent border-[2px] border-gray-400">
        <option defaultValue="Filter" value="">
          Filter
        </option>
        <option
          onClick={(e: any) => {
            setOption(e.target.value);
            sortArray(transactions, option);
          }}
          value="latest"
        >
          latest
        </option>
      </select>
      {transactions?.map((t) => (
        <div
          key={Math.random()}
          className={`flex 
            ${t.status == "Success" ? "bg-green-300" : ""} 
            ${t.status == "Failed" ? "bg-red-500" : ""} 
          p-2 flex-1 rounded-lg sm:col-span-3 shadow-[0.1px_0.1px_5px_0.2px_black] border justify-between`}
        >
          <div className="">
            <div className="text-sm">Received INR</div>
            <div className="text-sm">Status : {t?.status}</div>
            <div className="text-slate-600 text-xs">
              {new Date(t?.startTime).toLocaleString("en-US")}
            </div>
          </div>
          <div className="flex justify-center items-center pr-5">
            + Rs {t.amount}
          </div>
        </div>
      ))}
    </div>
  );
};
