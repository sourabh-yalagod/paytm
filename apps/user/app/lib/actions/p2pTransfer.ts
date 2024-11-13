"use server";
import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import axios from "axios";

export const p2pTransfer = async (username: string, amount: number) => {
  try {
    const response = await axios.post("http://localhost:3000/api/p2p", {
      username,
      amount,
    });
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("API error:", error);
    return { message: "API request failed.", success: false };
  }
};
