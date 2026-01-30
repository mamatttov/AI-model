import { useState, useRef, useEffect } from "react";

export default function HomePage(props) {
  const { setFile, setAudioStream } = props;
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [duration, setDuration] = useState(0);

  const mediaRecorder = useRef(null);
  const mimeType = "audio/webm";

  async function startRecording() {
    let tempStream;
    console.log("Start recording");

    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      tempStream = streamData;
    } catch (err) {
      console.log(err.message);
      return;
    }
    setRecordingStatus("recording");

    //create new Media recorder instance using the stream
    const media = new MediaRecorder(tempStream, { type: mimeType });
    mediaRecorder.current = media;

    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") {
        return;
      }
      if (event.data.size === 0) {
        return;
      }
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  }

  async function stopRecording() {
    setRecordingStatus("inactive");
    console.log("Stop recording");

    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      setAudioStream(audioBlob);
      setAudioChunks([]);
      setDuration(0);
    };
  }

  useEffect(() => {
    if (recordingStatus === "inactive") {
      return;
    }

    const interval = setInterval(() => {
      setDuration((curr) => curr + 1);
    }, 1000);

    return () => clearInterval(interval);
  });
  return (
    <main className="flex-1  p-4 flex flex-col gap-3 text-center sm:gap-4  justify-center pb-20">
      <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl ">
        Free<span className="text-blue-400 bold">Helper</span>
      </h1>
      <h3 className="font-medium md:text-large">
        Record<span className="text-blue-400"> &rarr;</span>
        Transcribe<span className="text-blue-400"> &rarr;</span>
        Translate
      </h3>
      <button
        onClick={
          recordingStatus === "recording" ? stopRecording : startRecording
        }
        className="flex border-2 specialBtn rounded-xl px-4 py-2 border-slate-500 cursor-pointer items-center justify-between mx-auto py-2 text-base gap-4 w-72 max-w-full"
      >
        <p className="text-blue-400">
          {recordingStatus === "inactive" ? "Record" : "Stop Recording"}
        </p>
        <div className="flex items-center ">
          {duration !== 0 && (
            <p className="text-blue-400 text-sm mx-auto">{duration}s</p>
          )}
        </div>
        <i
          className={
            "fa-solid fa-microphone duration-200" +
            (recordingStatus === "recording" ? " text-rose-300" : "")
          }
        ></i>
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
