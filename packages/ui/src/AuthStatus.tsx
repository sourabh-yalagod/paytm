import { Button } from "./button";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthStatus() {
  const session: any = useSession();
  const isAuthenticated = session?.data?.user.id;
  return (
    <div className="w-full p-4 flex items-center justify-between">
      {isAuthenticated ? (
        <Button className="bg-red-500" onClick={() => signOut()}>
          Logout
        </Button>
      ) : (
        <Button onClick={() => signIn()}>LogIn</Button>
      )}
    </div>
  );
}
