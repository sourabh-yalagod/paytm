"use client";
import axios from "axios";
import { AddMoneyCard } from "../../components/AddMoneyCard";
import { BalanceCard } from "../../components/BalanceCard";
import { OnRampTransactions } from "../../components/OnRampTransaction";
import { useEffect, useState } from "react";

const page = () => {
  const [response, setResponse] = useState<any>();
  useEffect(() => {
    async function fetchTransaction() {
      const res = await axios.get(
        `http://localhost:3000/api/bank-transactions`
      );
      setResponse(res.data);
    }

    fetchTransaction();
  }, []);
  return (
    <div className="w-full">
      <div className="w-full grid gap-4 md:flex items-center p-2">
        <AddMoneyCard />
        <BalanceCard
          amount={response?.balance?.amount}
          locked={response?.balance?.locked}
          key={Math.random()}
        />
      </div>
      <div>
        <OnRampTransactions transactions={response?.transactions} />
      </div>
    </div>
  );
};

export default page;
