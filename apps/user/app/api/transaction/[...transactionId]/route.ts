import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../lib/auth";
import db from "@repo/db/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { transactionId: string } }
) {
  const transactionId  = params.transactionId[0];
  const session = await getServerSession(authOptions);
    console.log(transactionId);
    
  // Check if user is authenticated
  if (!session || !session.user) {
    return NextResponse.json({
      message: "User is not authenticated. Please log in.",
      success: false,
    });
  }

  // Check if transaction ID is provided
  if (!transactionId) {
    return NextResponse.json({
      message: "Transaction not found. Please try again.",
      success: false,
    });
  }

  try {
    // Fetch transaction from database
    const transaction = await db.onRampTransactions.findUnique({
      where: { id: transactionId },
    });

    if (!transaction) {
      return NextResponse.json({
        message: "Transaction not found.",
        success: false,
      });
    }

    // Success response
    return NextResponse.json({
      transaction,
      message: `Transaction fetched successfully at ${new Date().toLocaleDateString()}`,
      success: true,
    });
  } catch (error: any) {
    // Error response
    return NextResponse.json({
      message: "Fetching transaction failed.",
      success: false,
      error: error.message,
    });
  }
}
