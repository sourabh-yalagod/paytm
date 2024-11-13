"use client";

import { Button } from "@repo/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AppBar() {
  const user = useSession().data?.user;
  return (
    <div className="w-full mb-6 shadow-[0.1px_0.1px_10px_0.1px_black] rounded-b-xl p-3 flex justify-between items-center px-5">
      <p>PayTM</p>
      <div>
        {user ? (
          <Button className="bg-red-600 " onClick={signOut}>Logout</Button>
        ) : (
          <Button className="bg-blue-600 " onClick={signIn}>LogIn</Button>
        )}
      </div>
    </div>
  );
}
