"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { MdFavorite } from "react-icons/md";

const NavBar = () => {
  const router = useRouter();
  return (
    <>
      <nav className="bg-yellow-400 border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            onClick={() => router.push("/")}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/star_wars_logo.png"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Star Wars
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <MdFavorite
              size={24}
              onClick={() => router.push("/favorite")}
              className="text-white"
            />
            {/* Favorites */}
            {/* </button> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
