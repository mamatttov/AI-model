import FileDisplay from "./components/FileDisplay";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import { useState, useEffect, useRef } from "react";
import Information from "./components/Information";
import Transcribing from "./components/Transcirbing";
import "./index.css";
function App() {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const isAudioAvailable = file || audioStream;
  const [output, setOutput] = useState(true);
  const [loading, setLoading] = useState(true);

  function handleAudioReset() {
    setFile(null);
    setAudioStream(null);
  }
  useEffect(() => {
    console.log(audioStream);
  }, [audioStream]);
  return (
    <div className="flex flex-col max-w-[1000px] mx-auto w-full">
      <section className="min-h-screen flex flex-col">
        <Header />
        {output ? (
          <Information output={output} />
        ) : loading ? (
          <Transcribing />
        ) : isAudioAvailable ? (
          <FileDisplay
            handleAudioReset={handleAudioReset}
            file={file}
            audioStream={audioStream}
          />
        ) : (
          <HomePage setFile={setFile} setAudioStream={setAudioStream} />
        )}
        <footer></footer>
      </section>
    </div>
  );
}

export default App;
