import React, { useState, useEffect, useRef } from "react";
import Translation from "./Translation";
import Transcription from "./Transcription";
export default function Information(props) {
  const { output } = props;
  const [tab, setTab] = useState("transcription");
  const [translation, setTranslation] = useState(null);
  const [translating, setTranslating] = useState(null);
  const [toLanguage, setToLanguage] = useState("Select language");
  console.log(output);

  const worker = useRef();

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL("../utils/translate.worker.js", import.meta.url),
        {
          type: "module",
        },
      );
    }
    const onMessageReceived = async (e) => {
      switch (e.data.status) {
        case "initiate": {
          console.log("DOWNLOADING");
          break;
        }
        case "progress": {
          console.log("LOADING");
          break;
        }
        case "update": {
          setTranslation(e.data.output);
          console.log(e.data.output);
          break;
        }
        case "complete": {
          setTranslating(false);
          console.log("DONE");
          break;
        }
      }
    };
    worker.current.addEventListener("message", onMessageReceived);
    return () => {
      worker.current.removeEventListener("message", onMessageReceived);
    };
  }, []);

  function handleCopy() {
    navigator.clipboard.writeText(output.map((v) => v.text).join("\n"));
  }

  function handleDownload() {
    const element = document.createElement("a");
    const file = new Blob([], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download(`Freehelper_${new Date().toDateString()}.txt`);
    document.body.appendChild(element);
    element.click();
  }

  function generateTranslation() {
    if (!translating || toLanguage === "Select language") {
      return;
    }
    setTranslating(true);

    worker.current.postMessage({
      text: output.map((val) => val.text),
      src_lang: "eng_Latn",
      tgt_lang: toLanguage,
    });
  }

  const textElement =
    tab === "transcription"
      ? output.map((val) => val.text)
      : translation || "No translation";

  return (
    <main className="flex-1 flex flex-col justify-center text-center gap-3 sm:gap-4 pb-20  p-4 max-w-prose w-full mx-auto">
      <h1 className="font-semibold text-5xl sm:text-5xl md:text-6xl ">
        Your<span className="text-blue-400 bold">Transcription</span>
      </h1>
      <div className="grid grid-cols-2 items-center mx-auto bg-white   overflow-hidden rounded-full shadow ">
        <button
          onClick={() => {
            setTab("transcription");
          }}
          className={
            "px-4 py-2  duration-500 " +
            (tab === "transcription"
              ? " bg-blue-400 text-white"
              : "text-blue-400 hover:text-blue-600 ")
          }
        >
          Transcription
        </button>
        <button
          onClick={() => {
            setTab("translation");
          }}
          className={
            "px-4 py-2  duration-500" +
            (tab === "translation"
              ? " bg-blue-400 text-white"
              : " text-blue-400 hover:text-blue-600 ")
          }
        >
          Translation
        </button>
      </div>
      <div className="my-8 flex flex-col">
        {tab === "transcription" ? (
          <Transcription {...props} textElement={textElement} />
        ) : (
          <Translation
            {...props}
            textElement={textElement}
            toLanguage={toLanguage}
            setToLanguage={setToLanguage}
            translating={translating}
            generateTranslation={generateTranslation}
          />
        )}
      </div>
      <div className="flex items-center gap-4 mx-auto ">
        <button
          onClick={handleCopy}
          title="Copy"
          className="bg-white text-blue-400 hover:text-blue-600 duration-200  rounded-lg px-2 aspect-square grid place-items-center rounded"
        >
          <i className="fa-solid fa-copy"></i>
        </button>
        <button
          onClick={handleDownload}
          title="Download"
          className="bg-white text-blue-400  hover:text-blue-600 duration-200 rounded-lg px-2 aspect-square grid place-items-center rounded"
        >
          <i className="fa-solid fa-download"></i>
        </button>
      </div>
    </main>
  );
}
