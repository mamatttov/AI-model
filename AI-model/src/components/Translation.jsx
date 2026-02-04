import React from "react";
import { LANGUAGES } from "../utils/presets";

export default function Translation(props) {
  const {
    textElement,
    toLanguage,
    setToLanguage,
    translating,
    generateTranslation,
  } = props;
  return (
    <div className="flex flex-col gap-2 max-w-[400px] w-full mx-auto">
      {!translating && (
        <div className="flex flex-col gap-1">
          <p className="text-xs sm:text-sm font-medium text-slate-500 mr-auto">
            to language
          </p>
          <div className="flex items-stretch gap-2">
            <select
              className="flex-1 bg-white border-blue-200 border-solid border hover:border-blue-500 duration-200 focus:outline-none outline-none px-3 rounded p-2"
              value={toLanguage}
              onChange={(e) => setToLanguage(e.target.value)}
            >
              <option value={"Select language"}>Select language</option>
              {Object.entries(LANGUAGES).map(([key, value]) => {
                return (
                  <option value={value} key={key}>
                    {key}
                  </option>
                );
              })}
            </select>
            <button
              onClick={generateTranslation}
              className="specialBtn px-3 py-2 rounded-lg text-blue-400 hover:text-blue-600 duration-200"
            >
              Translate
            </button>
          </div>
        </div>
      )}
      {textElement && !translating && <p>{textElement}</p>}
      {translating && (
        <div className="grid p[lace-items-center">
          <i className="fa-solid fa-spinner animate-spin"></i>
        </div>
      )}
    </div>
  );
}
