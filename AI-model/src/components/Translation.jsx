import React from "react";
import { LANGUAGES } from "../utils/presets";

export default function Translation(props) {
  const {
    translation,
    textElemen,
    toLanguage,
    setTranslating,
    setTranslation,
    setToLanguage,
    translating,
  } = props;
  return (
    <div className="flex flex-col gap-2 max-w-[400px] w-full mx-auto">
      <div className="flex items-stretch gap-2">
        <select
          className="flex-1 bg-white border-blue-200 border-solid border hover:border-blue-500 duration-200 focus:outline-none outline-none rounded p-2"
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
      </div>
    </div>
  );
}
