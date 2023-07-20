import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const SideNav = () => {
  const session = useSession();
  const user = session.data?.user;
  return (
    <nav className="sticky top-0 px-2 py-2">
      <ul className="space-y-4 py-8 font-bold">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        {user && (
          <li>
            <Link href={`/profiles/${user.id}`}>Profile</Link>
          </li>
        )}
        {user == null ? (
          <li>
            <button onClick={() => void signIn()}>SignIn</button>
          </li>
        ) : (
          <li>
            <button onClick={() => void signOut()}>LogOut</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default SideNav;
