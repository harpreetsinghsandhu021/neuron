import { Avatar, DarkThemeToggle, Dropdown, Navbar } from "flowbite-react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function NavbarComponent() {
  return (
    <div className=" w-[82.5%]  border bg-white dark:bg-gray-800 p-2 pr-4">
      <div className="text-white flex justify-between items-center ">
        <DarkThemeToggle />
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
