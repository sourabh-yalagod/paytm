"use client";

import AuthStatus from "@repo/ui/authStatus";
import { Button } from "@repo/ui/button";
import SideMenuItem from "@repo/ui/sideMenuItem";
import { Banknote, Home, Menu, X } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function AppBar() {
  const user = useSession().data?.user;
  const [menu, setMenu] = useState(false);
  return (
    <div className="w-full mb-6 shadow-[0.1px_0.1px_10px_0.1px_black] rounded-b-xl p-3 flex justify-between items-center px-5">
      <p className="hidden sm:block">PayTM</p>
      <div className="block sm:hidden">
        <div
          className="transition-all delay-500"
          onClick={() => setMenu((prev) => !prev)}
        >
          {menu ? <X /> : <Menu />}
        </div>
        <div
          onClick={() => setMenu(false)}
          className={`max-w-52 mx-auto absolute bg-white top-0 w-full h-screen transition-all ease-in-out ${menu ? "right-0" : "right-[-100%]"}`}
        >
          <AuthStatus />
          <div className="flex flex-col gap-4 px-5 mt-10 w-full">
            <SideMenuItem href="/home" icon={<Home />} label="Home" />
            <SideMenuItem href="/p2p" icon={<Banknote />} label="P2P" />
          </div>
        </div>
      </div>
      <div>
        {user ? (
          <Button className="bg-red-600 " onClick={signOut}>
            Logout
          </Button>
        ) : (
          <Button className="bg-blue-600 " onClick={signIn}>
            LogIn
          </Button>
        )}
      </div>
    </div>
  );
}
