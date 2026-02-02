import React, { useState } from "react";

export default function Information() {
  const [tab, setTab] = useState("transcription");
  return (
    <main className="flex-1 flex flex-col justify-center text-center gap-3 sm:gap-4 pb-20  p-4 max-w-prose w-full mx-auto">
      <h1 className="font-semibold text-5xl sm:text-5xl md:text-6xl ">
        Your<span className="text-blue-400 bold">Transcription</span>
      </h1>
      <div className="grid grid-cols-2 items-center mx-auto bg-white   overflow-hidden rounded-full shadow ">
        <button
          onClick={() => {
            setTab("translation");
          }}
          className={
            "px-4 py-2 font-medium duration-500 " +
            (tab === "transcription"
              ? " bg-blue-400 text-white"
              : "text-blue-400 hover:text-blue-600 ")
          }
        >
          Transcription
        </button>
        <button
          onClick={() => {
            setTab("transcription");
          }}
          className={
            "px-4 py-2 font-medium duration-500" +
            (tab === "translation"
              ? " bg-blue-400 text-white"
              : " text-blue-400 hover:text-blue-600 ")
          }
        >
          Translation
        </button>
      </div>
    </main>
  );
}
