import { NextRequest, NextResponse } from "next/server";
import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const totalBalance = await db.onRampTransactions.aggregate({
      where: { userId },
      _sum: { amount: true },
    });

    console.log("Total Balance:", totalBalance);

    return NextResponse.json({ totalBalance: totalBalance});
  } catch (error) {
    console.error("Error fetching total balance:", error);
    return NextResponse.json(
      { message: "Error fetching balance", success: false },
      { status: 500 }
    );
  }
}
