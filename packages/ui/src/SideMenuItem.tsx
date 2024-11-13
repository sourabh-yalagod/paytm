"use client";
import { useRouter } from "next/navigation";

export default function SideMenuItem({
  label,
  href,
  icon,
}: {
  label: string;
  href: string;
  icon: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(href)}
      className="flex gap-5 items-center hover:text-white hover:scale-95 transition-all p-1 hover:bg-blue-500 w-full rounded-lg cursor-pointer"
    >
      <p className="">{icon}</p>
      <p className="">{label}</p>
    </div>
  );
}
