import React from "react";

export default function Transcribing(props) {
  const { downloading } = props;
  return (
    <div className="flex flex-col items-center justify-center gap-10 md:gap-14 py-24">
      <div className="flex flex-col gap-2 sm:gap-4">
        <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl text-blue-400 bold ">
          Transcribing
        </h1>
        <p>
          {!downloading ? "warming up the cylinders" : "core cylinders engaged"}
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:gap-4 max-w-[500px] mx-auto w-full">
        {[0, 1, 2, 3].map((val) => {
          return (
            <div
              className={
                "rouneded-full h-2 sm:h3 bg-slate-400 loading" +
                ` loading${val}`
              }
            ></div>
          );
        })}
      </div>
    </div>
  );
}
