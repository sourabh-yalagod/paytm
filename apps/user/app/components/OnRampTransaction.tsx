"use client";
import { Card } from "@repo/ui/card";
import { Clock10 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export const OnRampTransactions = ({
  transactions = [], // Set a default empty array for transactions
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
  const [option, setOption] = useState("latest");
  const [sortedList, setSortedList] = useState(transactions);
  const router = useRouter();

  const sortArray = (array: any[], option: string) => {
    if (!array?.length) return; // Return if array is undefined or empty

    let sortedArray = [...array];
    switch (option) {
      case "latest":
        sortedArray.sort(
          (a, b) =>
            new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
        );
        break;
      case "earliest":
        sortedArray.sort(
          (a, b) =>
            new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        );
        break;
      case "amountAsc":
        sortedArray.sort((a, b) => a.amount - b.amount);
        break;
      case "amountDesc":
        sortedArray.sort((a, b) => b.amount - a.amount);
        break;
      case "failed":
        sortedArray = sortedArray.filter((a) => a.status === "Failed");
        break;
      case "success":
        sortedArray = sortedArray.filter((a) => a.status === "Success");
        console.log("sortArray : ",sortArray)

      default:
        break;
    }
    setSortedList(sortedArray);
  };

  useEffect(() => {
    if (transactions?.length) {
      sortArray(transactions, option);
    }
  }, [transactions, option]);

  return (
    <div className="space-y-3 border w-full p-2 max-h-[500px] overflow-scroll rounded-lg py-3">
      <div className="flex items-center gap-4">
        <Clock10 className="animate-spin" />
        <p className="font-bold text-2xl">Transaction History:</p>
      </div>
      <select
        className="px-2 py-1 rounded-lg bg-transparent border"
        value={option}
        onChange={(e) => setOption(e.target.value)}
      >
        <option value="latest">Latest</option>
        <option value="earliest">Earliest</option>
        <option value="amountAsc">Amount (Low to High)</option>
        <option value="amountDesc">Amount (High to Low)</option>
        <option value="success">Successfull</option>
        <option value="failed">Failed</option>
      </select>
      {sortedList?.length ? (
        sortedList.map((t: any, index) => (
          <div
            onClick={() => router.push(`/transactions/${t.id}`)}
            key={index}
            className={`flex 
              ${t.status === "Success" ? "bg-green-300" : ""} 
              ${t.status === "Failed" ? "bg-red-500" : ""} 
              p-2 flex-1 rounded-lg sm:col-span-3 border justify-between hover:scale-95 transition-all cursor-pointer`}
          >
            <div>
              <div className="text-sm">
                {type === "p2p" ? "Sent" : "Received"}
              </div>
              <div className="text-sm">Status: {t.status}</div>
              <div className="text-slate-600 text-xs">
                {new Date(t.startTime).toLocaleString("en-US")}
              </div>
            </div>
            <div className="flex justify-center items-center pr-5">
              {type === "p2p" ? `${t.amount}` : `+ ${t.amount}`}
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
