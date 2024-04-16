"use server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { auth, signIn, signOut } from "@/utils/auth";
import { Button } from "./ui/button";

export const SignIn = async () => {
  const session = await auth();

  if (!session) {
    return (
      <>
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <Button type="submit" variant="outline">
            Signin
          </Button>
        </form>
      </>
    );
  } else {
    return (
      <div className="flex gap-3 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="link">
              <div className="flex gap-2 items-center">
                <Avatar>
                  <AvatarImage src={session?.user?.image ?? ""} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className="text-lg">{session?.user?.name}</h1>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button type="submit" variant="link">
                LogOut
              </Button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
};
