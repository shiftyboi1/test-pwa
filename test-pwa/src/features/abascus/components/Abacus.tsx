import { useState, useEffect, useRef } from "react";
import DraggableBall from "../components/DraggableBall";
import type { AbacusProps } from "../types";

function Abacus({ numberOfBalls = 5, ballSize = 50 }: AbacusProps) {
  const stickRef = useRef<HTMLDivElement>(null);
  const [stickWidth, setStickWidth] = useState<number>(0);
  const [ballPositions, setBallPositions] = useState<number[]>([]);

  // TODO: When resizing, store ball positions and move them to approprate location

  // Handle stick width changes
  useEffect(() => {
    const updateWidth = () => {
      if (stickRef.current) {
        setStickWidth(stickRef.current.offsetWidth);
      }
    };

    updateWidth(); // Initial width

    let observer: ResizeObserver | null = null;
    const stickElem = stickRef.current;
    if (stickElem) {
      observer = new window.ResizeObserver(updateWidth);
      observer.observe(stickElem);
    }

    window.addEventListener("resize", updateWidth);

    // Note: Cleanup function
    return () => {
      if (observer && stickElem) observer.unobserve(stickElem);
      window.removeEventListener("resize", updateWidth);
    };
  }, []); // Note: Empty dependency array means this runs once on mount and cleanup on unmount

  useEffect(() => {
    if (stickWidth > 0) {
      setBallPositions(
        Array.from(
          { length: numberOfBalls },
          (_, i) => (i + 1) * (stickWidth / (numberOfBalls + 1))
        )
      );
      console.log(`Stick width from ref: ${stickWidth}`);
    }
  }, [stickWidth, numberOfBalls]); // Note: Runs when stickWidth or numberOfBalls changes

  const updateBallPosition = (ballIndex: number, newPosition: number) => {
    const constrainedPosition = constrainPosition(ballIndex, newPosition);

    setBallPositions((prev) =>
      prev.map((pos, i) => (i === ballIndex ? constrainedPosition : pos))
    );
  };

  const constrainPosition = (
    ballIndex: number,
    newPosition: number
  ): number => {
    const ballRadius = ballSize / 2;
    let constrained = newPosition;

    // Stick boundaries
    constrained = Math.max(
      ballRadius,
      Math.min(stickWidth - ballRadius, constrained)
    );

    // Collision
    if (ballIndex > 0) {
      const leftNeighbor = ballPositions[ballIndex - 1];
      constrained = Math.max(leftNeighbor + ballSize, constrained);
    }

    if (ballIndex < ballPositions.length - 1) {
      const rightNeighbor = ballPositions[ballIndex + 1];
      constrained = Math.min(rightNeighbor - ballSize, constrained);
    }

    return constrained;
  };

  return (
    <div style={{ position: "relative", padding: "50px" }}>
      {/* Stick */}
      <div
        ref={stickRef}
        style={{
          height: 8,
          backgroundColor: "#7a7a7aff",
          borderRadius: 4,
          position: "relative",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }}
      >
        {/* Ends */}
        <div
          style={{
            position: "absolute",
            left: -10,
            top: -6,
            width: 20,
            height: 20,
            backgroundColor: "#363636ff",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -10,
            top: -6,
            width: 20,
            height: 20,
            backgroundColor: "#363636ff",
            borderRadius: "50%",
          }}
        />

        {/* Balls */}
        {ballPositions.map((position: number, index: number) => (
          <DraggableBall
            key={index}
            position={position}
            ballSize={ballSize}
            stickLength={stickWidth}
            onPositionChange={(newPos: number) =>
              updateBallPosition(index, newPos)
            }
            color={`red`}
          />
        ))}
      </div>

      {/* Info */}
      <div style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}>
        <p>
          Balls: {numberOfBalls} | Stick: {stickWidth}px | Ball size: {ballSize}
          px
        </p>
        <p>
          Positions: {ballPositions.map((pos) => Math.round(pos)).join(", ")}
        </p>
      </div>
    </div>
  );
}

export default Abacus;
