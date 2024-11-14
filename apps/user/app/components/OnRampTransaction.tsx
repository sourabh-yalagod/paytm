"use client";
import { Card } from "@repo/ui/card";
import { Clock10 } from "lucide-react";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { useState } from "react";

export const OnRampTransactions = ({
  transactions,
  type = "Deposite",
}: {
  transactions: {
    startTime: Date;
    amount: number;
    status: string;
    provider: string;
  }[];
  type?: string;
}) => {
  const [option, setOption] = useState("");
  const [sortedList, setSortedList] = useState([]);
  const router = useRouter();

  const sortArray = (array: any, option: string) => {
    let sortedArray = [];
    switch (option) {
      case "latest":
        sortedArray = array.sort(
          (a: any, b: any) => a?.startTime - b?.startTime
        );
        break;
      default:
        break;
    }

    setSortedList(sortedArray);
  };

  return (
    <div className="space-y-3 border w-full p-2 max-h-[500px] overflow-scroll rounded-lg py-3">
      <div className="flex items-center gap-4">
        <Clock10 className="animate-spin" />
        <p className="font-bold text-2xl">Transaction History : </p>
      </div>
      <select className="px-2 py-1 rounded-lg bg-transparent border">
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
      {transactions?.length ? (
        transactions?.map((t: any) => (
          <div
            onClick={() => router.push(`/transactions/${t?.id}`)}
            key={Math.random()}
            className={`flex 
            ${t.status == "Success" ? "bg-green-300" : ""} 
            ${t.status == "Failed" ? "bg-red-500" : ""} 
          p-2 flex-1 rounded-lg sm:col-span-3 border justify-between hover:scale-95 transition-all cursor-pointer`}
          >
            <div className="">
              <div className="text-sm">
                {type == "p2p" ? "Sent" : "Received"}
              </div>
              <div className="text-sm">Status : {t?.status}</div>
              <div className="text-slate-600 text-xs">
                {new Date(t?.startTime).toLocaleString("en-US")}
              </div>
            </div>
            <div className="flex justify-center items-center pr-5">
              {type == "p2p" ? `${t.amount}` : `+ ${t.amount}`}
            </div>
          </div>
        ))
      ) : (
        <Card title="Recent Transactions">
          <div className="text-center pb-8 pt-8">No Recent transactions</div>
        </Card>
      )}
    </div>
  );
};
