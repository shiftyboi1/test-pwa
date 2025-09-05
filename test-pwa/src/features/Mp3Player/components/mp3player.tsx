import { useRef, useState } from "react";

const Mp3Player = ({ src }: { src: string }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSrc, setCurrentSrc] = useState(src);

  const play = () => audioRef.current?.play();
  const pause = () => audioRef.current?.pause();
  // const setVolume = (v: number) => {
  //   if (audioRef.current) audioRef.current.volume = v;
  // };
  const backToStart = () => {
    if (audioRef.current) audioRef.current.currentTime = 0;
  };

  return (
    <div>
      <label>File source: </label>
      <input
        type="text"
        value={currentSrc}
        onChange={(e) => setCurrentSrc(e.target.value)}
        placeholder="Enter MP3 URL"
        style={{ width: "80%", marginBottom: 8 }}
      />
      <audio ref={audioRef} src={currentSrc} />{" "}
      {/* Do Audio môžem dať ovládacie čudlíky propom "controls" */}
      <p>controls:</p>
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
      <button onClick={backToStart}>To Start</button>
      {/* <button onClick={() => setVolume(0.5)}>Set Volume 50%</button> */}
    </div>
  );
};

export default Mp3Player;
