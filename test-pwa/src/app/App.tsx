import "../App.css";
import Abacus from "../features/abascus/components/Abacus";

function App() {
  // console.log("App rendered");
  // const [count, setCount] = useState<number>(0);
  // const [running, setIsRunning] = useState<boolean>(false);

  // const randomiseCount = useCallback(() => {
  //   if (!running) return;
  //   setCount(Math.floor(Math.random() * 100));
  // }, [running]);

  // const toggleRunning = useCallback(() => {
  //   setIsRunning((prev) => !prev);
  // }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     randomiseCount();
  //   }, 100);

  //   // Tzv cleanup funkcia, toto je moja poznámka
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [randomiseCount]);

  // TODO: Make stick length be based on the CSS and not set in code.
  return (
    <>
      <h1>Skušobná PWA app</h1>
      <Abacus numberOfBalls={4} stickLength={600} ballSize={40} />
      <Abacus numberOfBalls={4} stickLength={600} ballSize={40} />
    </>
  );
}

export default App;
