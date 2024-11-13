import SideMenuItem from "@repo/ui/sideMenuItem";
import { Banknote, Home, PersonStanding } from "lucide-react";

export default function SideMenuBar() {
  return (
    <div className="w-36 hidden sm:block pt-5 rounded-tr-xl shadow-[0.1px_0.1px_10px_0.1px_black]">
      <div className="grid gap-3 px-2">
        <SideMenuItem label="Home" icon={<Home />} href="/" />
        <SideMenuItem label="transaction" icon={<Banknote />} href="/transaction" />
        <SideMenuItem label="P2P" icon={<PersonStanding />} href="/p2p" />
      </div>
    </div>
  );
}
