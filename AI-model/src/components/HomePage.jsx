import React from "react";

export default function HomePage(props) {
  const { setFile, setAudioStream } = props;
  return (
    <main className="flex-1 flex flex-col justify-center text-center gap-3 sm:gap-4 pb-20 md:gap-5  p-4">
      <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl ">
        Free<span className="text-blue-400 bold">Helper</span>
      </h1>
      <h3 className="font-medium md:text-large">
        Record<span className="text-blue-400"> &rarr;</span>
        Transcribe<span className="text-blue-400"> &rarr;</span>
        Translate
      </h3>
      <button className="flex border-2 specialBtn rounded-xl px-2 border-slate-500 cursor-pointer items-center justify-between mx-auto py-2 text-base gap-4 w-72 max-w-full">
        <p className="text-blue-400">Record</p>
        <i className="fa-solid fa-microphone"></i>
      </button>
      <p className="text-base">
        or{" "}
        <label className="text-blue-400 cursor-pointer hover:text-blue-600 duration-200">
          upload
          <input
            onChange={(e) => {
              const tempFile = e.target.files[0];
              setFile(tempFile);
            }}
            className="hidden"
            type="file"
            accept=".mp3, .wave"
          />
        </label>{" "}
        a mp3 file
      </p>
      <p className="italic text-slate-500">Free now, free forever</p>
    </main>
  );
}
