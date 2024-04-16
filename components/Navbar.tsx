import Image from "next/image";
import { ModeToggle } from "./mode-toggle";
import { SignIn } from "./sign-in";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="py-3 bg-gray-200 dark:bg-gray-900 ">
      <div className="p-3 container flex items-center justify-between">
        <Link
          href="/"
          className="flex gap-2 items-center text-xl font-semibold"
        >
          <Image src="/logo.png" alt="logo" width="45" height="45" />

          <h1 className="md:flex hidden">Code-Together</h1>
        </Link>

        <div className="flex items-center gap-2">
          <SignIn />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
