"use client";

import { useEffect, useState } from "react";
import { AddMoneyCard } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import axios from "axios";

const Page = ({ params }: { params: string }) => {
  const [response, setResponse] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const fetchTransactions = async () => {
    try {
      const { data }: any = await axios.get("/api/bank-deposite");
      setResponse(data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleTransactionCreated = async () => {
    await fetchTransactions();
  };

  return (
    <div className="w-full px-4">
      <div className="w-full py-5 space-y-4 h-full gap-5">
        <div className="grid sm:flex w-full justify-around sm:p-5 gap-5">
          <AddMoneyCard onTransactionCreated={handleTransactionCreated} />
          <BalanceCard
            amount={response?.balance?.amount}
            locked={0}
            key={Math.random()}
          />
        </div>
        <div>
          {loading ? (
            <p>Loading transactions...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <OnRampTransactions
              transactions={response?.transactions}
              key={Math.random()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
