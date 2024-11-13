import { getServerSession } from "next-auth";
import { Button } from "./button";
import { signIn, signOut } from "next-auth/react";

export default function AppBar() {
  const session = getServerSession();
  const isAuthenticated = session?.user?.id;
  return (
    <div className="w-full p-4 flex items-center justify-between">
      <div>Paytm</div>
      <div>
        {isAuthenticated ? (
          <Button onClick={signOut}>Logout</Button>
        ) : (
          <Button onClick={signIn}>LogIn</Button>
        )}
      </div>
    </div>
  );
}
