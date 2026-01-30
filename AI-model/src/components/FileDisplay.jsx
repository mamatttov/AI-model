import React from "react";

export default function FileDisplay(props) {
  const { file, audioStream, handleAudioReset } = props;
  return (
    <main className="flex-1 flex flex-col justify-center text-center gap-3 sm:gap-4 pb-20 md:gap-5  p-4  w-fit max-w-full mx-auto">
      <h1 className="font-semibold text-5xl sm:text-5xl md:text-6xl ">
        Your <span className="text-blue-400 bold">file</span>
      </h1>
      <div className="flex flex-col text-left mx-auto my-4">
        <h3 className="font-semibold">Name:</h3>
        <p>{file.name}</p>
      </div>
      <div className="flex justify-between items-center gap-4">
        <button
          onClick={handleAudioReset}
          className=" hover:text-blue-600 duration-200 text-blue-400 px-4 py-4 rounded-lg"
        >
          Reset
        </button>
        <button className="specialBtn p-2 rounded-lg font-medium text-blue-400 flex gap-2 items-center">
          <p>Transcribe</p>
          <i className="fa-solid fa-file-pen"></i>
        </button>
      </div>
    </main>
  );
}
