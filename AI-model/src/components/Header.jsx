import React from "react";

export default function Header() {
  return (
    <header className="flex p-4 items-center justify-between gap-4">
      <h1 className=" font-medium">
        Free<span className="text-blue-400 font-bold">Helper</span>
      </h1>
      <button className="flex items-center text-sm gap-2 specialBtn px-2 py-1 rounded-lg text-blue-400">
        <p>New</p>
        <i className="fa-solid fa-plus"></i>
      </button>
    </header>
  );
}
