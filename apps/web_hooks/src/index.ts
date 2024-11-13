import express from "express";
import db from "@repo/db/client";
const app = express();

app.use(express.json());

app.post("/bankwebhook", async (req, res) => {
  const paymentInformation: {
    token: string;
    userId: string;
    amount: number;
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  try {
    const transaction = await db.$transaction([
      db.balance.updateMany({
        where: {
          userId: paymentInformation.userId,
        },
        data: {
          amount: {
            // You can also get this from your DB
            increment: paymentInformation.amount,
          },
        },
      }),
      db.onRampTransactions.updateMany({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    res.json({
      message: "Captured",
      transaction,
    });
  } catch (e) {
    console.error(e);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(3003);
