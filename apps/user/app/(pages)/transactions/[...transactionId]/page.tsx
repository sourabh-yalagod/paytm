"use client";
import { useParams } from "next/navigation";
import Transaction from "../../../components/Transaction";
import { useEffect, useState } from "react";
import axios from "axios";

const page = () => {
  const id: any = useParams();
  const transactionId = id.transactionId[0];
  const [transaction, setResponse] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const emptyTransaction = {
    id: "",
    type: "",
    startTime: "",
    provider: "",
    amount: 0,
    status: "",
    token: "",
    userId: "",
  };

  const transactions = async () => {
    try {
      const { data }: any = await axios.get(
        `http://localhost:3000/api/transaction/${transactionId}`
      );
      setResponse(data?.transaction);
      console.log(data);
    } catch (error: any) {
      setError(error?.data?.message);
    }
  };
  console.log(transaction);

  useEffect(() => {
    transactions();
  }, [transactionId, useParams]);
  console.log(transaction);

  return (
    <div>
      <Transaction transaction={transaction || emptyTransaction} />
    </div>
  );
};

export default page;
