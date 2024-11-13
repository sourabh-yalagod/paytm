"use client";
import AppBar from "./AppBar";
import SideMenuBar from "./SideMenuBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <AppBar />
      <SideMenuBar />
      {children}
    </div>
  );
}
