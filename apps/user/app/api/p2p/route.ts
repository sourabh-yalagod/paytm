import { NextRequest, NextResponse } from "next/server";
import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

interface P2PProps {
  username: string;
  amount: number;
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!session || !userId) {
    return NextResponse.json(
      {
        success: false,
        message: "User unauthorized",
      },
      { status: 401 }
    );
  }

  const { amount, username } = (await req.json()) as P2PProps;

  if (!amount || !username) {
    return NextResponse.json(
      {
        success: false,
        message: "Amount and username are required.",
      },
      { status: 400 }
    );
  }

  try {
    const result = await db.$transaction(async (tx) => {
      // Perform the first operation: find the sender by userId
      const sender = await tx.user.findUnique({
        where: { id: userId },
      });
      console.log("sender : ",sender);
      
      // Perform the second operation: find the receiver by username
      const receiver = await tx.user.findUnique({
        where: { username },
      });
      
      console.log("receiver : ",receiver);
      // Check if the sender and receiver exist and the sender has enough funds
      if (!sender || !receiver) throw new Error("User not found");
      
      // Update sender's balance
      const senderBalance = await tx.balance.update({
        where: { userId: sender.id },
        data: { amount: { decrement: amount } },
      });
      console.log("senderBalance : ",senderBalance);
      
      // Update receiver's balance
      const receiverBalance = await tx.balance.updateMany({
        where: { userId: receiver.id },
        data: { amount: { increment: amount } },
      });
      console.log("receiverBalance : ",receiverBalance);
    
      return { sender, receiver };
    });
    

    return NextResponse.json(
      {
        success: true,
        message: "P2P transaction was successful.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Transaction error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Transaction failed.",
      },
      { status: 500 }
    );
  }
}
