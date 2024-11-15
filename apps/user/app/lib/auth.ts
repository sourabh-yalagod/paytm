import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          type: "username",
          placeholder: "username",
          required: true,
        },
        password: {
          label: "Password",
          type: "password",
          required: true,
          placeholder: "password",
        },
      },
      async authorize(credentials: any) {
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const existingUser = await db.user.findFirst({
          where: {
            username: credentials.username,
          },
        });

        if (existingUser) {
          return {
            id: existingUser.id,
            username: existingUser.username,
          };
        }

        try {
          const user = await db.user.create({
            data: {
              username: credentials.username,
              password: hashedPassword,
              phonenumber: Math.random().toString().slice(10),
            },
          });
          const userBalaceAccount = await db.balance.create({
            data: {
              amount: 0,
              locked: 0,
              userId: user.id,
            },
          });
          return {
            id: user.id,
            username: user.username,
          };
        } catch (e) {
          console.error(e);
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "NEXTAUTH_SECRET",
  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub;

      return session;
    },
  },
};
