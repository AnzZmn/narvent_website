"use client";

import Image from "next/image";

export default function Navigation() {
  return (
    <div className="flex flex-row justify-around align-middle items-center w-full h-25 my-3 gap-10 bg-transparent">
      <div className="flex basis-1/3 justify-center items-center">
        <div
          className="w-[100px] h-[100px] bg-violet-600"
          style={{
            WebkitMask:
              "url('/NarventLogoOnly.png') center / contain no-repeat",
            mask: "url('/NarventLogoOnly.png') center / contain no-repeat",
          }}
        />
      </div>
      <div className="flex basis-1/3 justify-around gap-1 px-10 font-display text-center ">
        <p className=""> For Business </p>
        <p className=""> For Jobs </p>
        <p className=""> Blog</p>
      </div>
      <div className="flex basis-1/3 justify-center">
        <p>Contact us</p>
      </div>
    </div>
  );
}
