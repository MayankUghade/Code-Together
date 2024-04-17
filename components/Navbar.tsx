"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();
  const isLoggedIn = !!session;

  return (
    <header className="bg-gray-100 py-2 dark:bg-gray-900 z-10 relative">
      <div className="container mx-auto flex justify-between items-centern p-3">
        <Link
          href="/"
          className="flex gap-2 items-center text-xl hover:underline"
        >
          <Image
            src="/logo.png"
            width="60"
            height="60"
            alt="the application icon of a magnifying glass"
          />
          <h1 className="sm:flex hidden font-semibold">Dev-union</h1>
        </Link>

        <div className="flex items-center gap-4">
          {isLoggedIn && (
            <div className="flex gap-3 items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="link">
                    <div className="flex gap-2 items-center">
                      <Avatar>
                        <AvatarImage
                          src={session?.user?.image ?? ""}
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <h1 className="text-lg">{session?.user?.name}</h1>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Button
                    type="submit"
                    variant="link"
                    onClick={() => signOut()}
                  >
                    LogOut
                  </Button>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          {!isLoggedIn && (
            <Button onClick={() => signIn("google")} variant="outline">
              Sign In
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
