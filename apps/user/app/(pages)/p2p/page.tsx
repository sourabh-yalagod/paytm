"use client";
import axios from "axios";
import { OnRampTransactions } from "../../components/OnRampTransaction";
import { P2P } from "../../components/P2P";
import { useEffect, useState } from "react";
import { BalanceCard } from "../../components/BalanceCard";
interface UserBalance {
  amount: number;
  locked: number;
}
const Page = () => {
  const [transactions, setTransactions] = useState<any>([]);
  const [userBalace, setUserBalance] = useState<UserBalance>({
    amount: 0,
    locked: 0,
  });
  const [error, setError] = useState<string | null>(null);

  const p2pTransactions = async () => {
    try {
      const { data }: any = await axios.get("http://localhost:3000/api/p2p");
      setTransactions(data?.transaction);
      setUserBalance(data?.userBalance);
    } catch (err) {
      setError("Failed to fetch transactions");
      console.error(err);
    }
  };

  useEffect(() => {
    p2pTransactions();
  }, []);

  return (
    <div className="w-full">
      <div className="w-full grid gap-4 md:flex items-center p-2">
        <P2P />
        <BalanceCard amount={userBalace?.amount} locked={userBalace.locked} />
      </div>
      <div className="w-full p-4">
        {error && <p className="text-red-500">{error}</p>}
        <OnRampTransactions type="p2p" transactions={transactions} />
      </div>
    </div>
  );
};

export default Page;
