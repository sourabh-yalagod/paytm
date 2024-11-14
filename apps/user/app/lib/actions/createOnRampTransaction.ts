"use server";

import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export const createOnRampTransaction = async (
  amount: number,
  provider: string
) => {
  if (!amount || !provider) {
    return { message: "Amount and provider are required." };
  }

  const token = Math.random().toString();
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  try {
    if (!userId) {
      return { message: "User not authenticated.", success: false };
    }
    let onRampTransactionl = null;
    const onRampTransactions = await db.$transaction(async (tx) => {
      // await tx.onRampTransactions.create({
      //   data: {
      //     provider,
      //     startTime: new Date(),
      //     status: "Pending",
      //     token,
      //     userId,
      //     amount,
      //   },
      // });
      await tx.balance.updateMany({
        where: {
          userId: userId,
        },
        data: {
          amount: { increment: amount },
        },
      });
      await tx.onRampTransactions.create({
        data: {
          provider,
          startTime: new Date(),
          status: "Success",
          type: "Deposite",
          token,
          userId,
          amount,
        },
      });
    });
    return {
      transaction: onRampTransactions,
      message: "Transaction is in process",
      success: true,
    };
  } catch (error) {
    await db.onRampTransactions.create({
      data: {
        provider,
        startTime: new Date(),
        status: "Failed",
        type: "Deposite",
        token,
        userId: userId,
        amount,
      },
    });
    console.error("Error creating transaction:", error);
    return {
      message: "Internal server error. Please try again.",
      success: false,
    };
  }
};
