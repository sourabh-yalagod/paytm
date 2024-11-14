"use client";
import { Button } from "@repo/ui/button";
import { redirect, useRouter } from "next/navigation";
import React from "react";

type Transaction = {
  id: string;
  type: string;
  startTime: any;
  provider: string;
  amount: number;
  status: string;
  token: string;
  userId: string;
};

const Transaction = ({ transaction }: any) => {
  const formattedStartTime = new Date(transaction?.startTime).toLocaleString();
  const router = useRouter();
  return (
    <div>
      <div className="p-4 bg-gray-100 rounded-lg hover:scale-110 transition-all mt-5 shadow-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Transaction Details
        </h2>
        <div className="space-y-4 w-full">
          <div className="flex gap-5 text-xs sm:text-[15px] md:text-[17px] justify-between">
            <span className="font-semibold">ID:</span>
            <span>{transaction.id}</span>
          </div>
          <div className="flex gap-5 text-xs sm:text-[15px] md:text-[17px] justify-between">
            <span className="font-semibold">Type:</span>
            <span>{transaction.type}</span>
          </div>
          <div className="flex gap-5 text-xs sm:text-[15px] md:text-[17px] justify-between">
            <span className="font-semibold">Start Time:</span>
            <span>{formattedStartTime}</span>
          </div>
          <div className="flex gap-5 text-xs sm:text-[15px] md:text-[17px] justify-between">
            <span className="font-semibold">Provider:</span>
            <span>{transaction.provider}</span>
          </div>
          <div className="flex gap-5 text-xs sm:text-[15px] md:text-[17px] justify-between">
            <span className="font-semibold">Amount:</span>
            <span>${transaction.amount}</span>
          </div>
          <div className="flex gap-5 text-xs sm:text-[15px] md:text-[17px] justify-between">
            <span className="font-semibold">Status:</span>
            <span
              className={`${
                transaction.status === "Success"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {transaction.status}
            </span>
          </div>
          <div className="flex gap-5 text-xs sm:text-[15px] md:text-[17px] justify-between">
            <span className="font-semibold">Token:</span>
            <span>{transaction.token}</span>
          </div>
          <div className="flex gap-5 text-xs sm:text-[15px] md:text-[17px] justify-between">
            <span className="font-semibold">User ID:</span>
            <span>{transaction.userId}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-3 w-full justify-around py-5">
        <Button onClick={() => router.back()}>Back</Button>
        <Button className="bg-green-600" onClick={() => router.refresh()}>
          Refresh
        </Button>
        <Button className="bg-blue-800" onClick={() => router.push(`/p2p`)}>
          P2P
        </Button>
        <Button className="bg-pink-600" onClick={() => router.push(`/home`)}>
          Home
        </Button>
      </div>
    </div>
  );
};

export default Transaction;
