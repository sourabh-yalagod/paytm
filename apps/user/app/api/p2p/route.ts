import { NextRequest, NextResponse } from "next/server";
import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import NodeCache from "node-cache";

interface P2PProps {
  username: string;
  amount: number;
}
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

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
      const sender = await tx.user.findUnique({
        where: { id: userId },
      });
      const receiver = await tx.user.findUnique({
        where: { username },
      });
      if (!sender || !receiver) throw new Error("User not found");
      const senderBalance = await tx.balance.updateMany({
        where: { userId: sender.id },
        data: { amount: { decrement: amount } },
      });
      const receiverBalance = await tx.balance.updateMany({
        where: { userId: receiver.id },
        data: { amount: { increment: amount } },
      });
      await tx.onRampTransactions.create({
        data: {
          provider: "provider",
          amount: -amount,
          type: "P2P",
          startTime: new Date(),
          status: "Success",
          token: Math.random().toString(),
          userId: sender.id,
        },
      });
      await tx.onRampTransactions.create({
        data: {
          provider: "provider",
          amount: amount,
          type: "P2P",
          startTime: new Date(),
          status: "Success",
          token: Math.random().toString(),
          userId: receiver.id,
        },
      });
      return { sender, receiver };
    });

    return NextResponse.json(
      {
        success: true,
        message: "P2P transaction was successful.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Transaction error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Transaction failed.",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
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
  try {
    const cacheId = `P2P_${userId}`;
    const cachedP2pTransactions = cache.get(cacheId);
    if (cachedP2pTransactions) {
      console.log('from cache');
      return NextResponse.json(cachedP2pTransactions);
    }
    const p2pTransactions = await db.onRampTransactions.findMany({
      where: {
        userId,
        type: "P2P",
      },
    });
    const userBalance = await db.balance.findFirst({
      where: {
        userId,
      },
    });
    const p2pResponse: any = {
      transaction: p2pTransactions,
      userBalance,
      success: true,
      message: "p2p Transactions are fetched successfully.",
    };
    console.log('from DB');
    cache.set(cacheId, p2pResponse);
    return NextResponse.json(p2pResponse);

  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "p2p Transactions failed to fetch.",
    });
  }
}
