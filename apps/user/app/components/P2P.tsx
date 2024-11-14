"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textInputBox";
import { useState } from "react";
import axios from "axios";

export function P2P() {
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);

  const makeP2PTransaction = async ({
    username,
    amount,
  }: {
    username: string;
    amount: number;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const { data }: any = await axios.post(`http://localhost:3000/api/p2p`, {
        username,
        amount,
      });
      console.log(data);
      setResponse(data?.message);
    } catch (error: any) {
      setError(error?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Send">
      <div className="pt-2">
        <TextInput
          placeholder="Username"
          label="Username"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(event.target.value)
          }
        />
        <TextInput
          placeholder="Amount"
          label="Amount"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setAmount(event.target.value)
          }
        />
        <div className="pt-4 flex justify-center">
          <Button
            onClick={() =>
              makeP2PTransaction({
                username,
                amount: Number(amount),
              })
            }
            // disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </Button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {response && <p className="text-green-500 mt-2">{response}</p>}
      </div>
    </Card>
  );
}
