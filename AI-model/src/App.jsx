import Header from "./components/Header";
import HomePage from "./components/HomePage";
import {useState} from 'react'

function App() {
  const [file, setFile] =useState(null)
  const [audio, setAudio] =useState(null)
  return (
    <div className="flex flex-col max-w-[1000px] mx-auto w-full">
      <section className="min-h-screen flex flex-col">
        <Header />
        {boolCheck ? () : (<HomePage />)}
        <footer></footer>
      </section>
    </div>
  );
}

export default App;
