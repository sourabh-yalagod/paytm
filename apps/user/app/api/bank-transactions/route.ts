export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const onRampTransactions = await db.onRampTransactions.findMany({
      where: { userId, type: "Deposite" },
    });
    const userBalance = await db.balance.findFirst({
      where: { userId },
    });

    return NextResponse.json({
      transactions: onRampTransactions,
      balance: userBalance,
    });
  } catch (error) {
    console.error("Error fetching on-ramp transactions:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
