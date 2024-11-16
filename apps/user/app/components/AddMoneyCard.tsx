import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState, useEffect } from "react";
import { TextInput } from "@repo/ui/textInputBox";
import { createOnRampTransaction } from "../lib/actions/createOnRampTransaction";
import { Loader2 } from "lucide-react";
import { usePendingTransaction } from "@repo/state-management";
import { useSession } from "next-auth/react";

const SUPPORTED_BANKS = [
  { name: "Select Bank", redirectUrl: "" },
  { name: "HDFC Bank", redirectUrl: "https://netbanking.hdfcbank.com" },
  { name: "Axis Bank", redirectUrl: "https://www.axisbank.com/" },
];

export const AddMoneyCard = () => {
  const session: any = useSession();
  const id: any = session.data?.user?.id;
  const { pendingTransaction, updateTransaction } = usePendingTransaction();
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [provider, setProvider] = useState<string>("Bank Provider");
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );

  const handleAddMoney = async () => {
    setLoading(true);
    try {
      updateTransaction({
        id: id || "",
        startTime: new Date(),
        amount: amount,
        status: "Pending",
        provider: provider,
      });
      await createOnRampTransaction(amount, provider);
    } catch (error) {
      console.error("Error creating transaction:", error);
    } finally {
      setLoading(false);
      console.log("pendingTransaction : ", pendingTransaction);
    }
  };
  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          onSelect={(value) => {
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            );
            setProvider(
              SUPPORTED_BANKS.find((x) => x.name === value)?.name ||
                "Bank Provider"
            );
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />

        <div className="flex justify-center pt-4">
          <Button onClick={handleAddMoney}>
            {!loading ? (
              "Add Money"
            ) : (
              <div className="flex gap-2">
                <p>Processing</p>
                <Loader2 className="animate-spin" />
              </div>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};
