import { atom, useRecoilState } from "recoil";

// Define the type for a single transaction object
type OnrampTransaction = {
  id: string;
  startTime: Date;
  amount: number;
  status: string;
  provider: string;
};

// Atom for managing a single pending transaction
export const pendingOnrampTransactionState = atom<OnrampTransaction>({
  key: "pendingOnrampTransactionState",
  default: {
    id: "",
    startTime: new Date(),
    amount: 0,
    status: "Pending",
    provider: "Provider",
  },
});

// Custom hook for using and updating the Recoil transaction state
export const usePendingTransaction = () => {
  const [pendingTransaction, setPendingTransaction] = useRecoilState(
    pendingOnrampTransactionState
  );

  // Function to update the transaction data
  const updateTransaction = (transaction: OnrampTransaction) => {
    setPendingTransaction(transaction);
  };

  return { pendingTransaction, updateTransaction };
};
