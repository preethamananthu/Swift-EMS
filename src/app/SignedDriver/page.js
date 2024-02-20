"use client"
import MapDriver from "../MapDriver";
import React from "react";
import { signOut } from "firebase/auth/cordova";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();

  const handleClick = () => {
    signOut(auth).then((val) => {
      console.log(val, "val");
      router.push("/");
    });
  };

  return React.createElement(
    "div",
    { className: "splash min-h-screen justify-center items-center flex custom-background" },
    React.createElement(
      "div",
      { className: "container min-h-[600px]  lg:w-[1290px] bg-[rgba(255,255,255,0.8)] flex flex-col rounded-xl lg:flex-row lg:justify-around items-center p-6 md:p-20 m-4 relative" },
      React.createElement(MapDriver, null),
      React.createElement(
        "button",
        {
          onClick: handleClick,
          className: "border-2 border-black hover:bg-neutral-600 hover:text-white text-center font-semibold py-2 px-4 rounded-full absolute top-5 right-5",
        },
        "Sign out"
      )
    ),
    React.createElement(
      "p",
      { className: "text-white text-xs absolute bottom-0 tracking-widest" },
      "Copyright \xA9 2023 | Preetham Ananthu | All Rights Reserved"
    )
  );
}

export default page;
