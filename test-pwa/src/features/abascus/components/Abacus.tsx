import { useState } from "react";
import DraggableBall from "../components/DraggableBall";
import type { AbacusProps } from "../types";

function Abacus({
  numberOfBalls = 5,
  stickLength = 600,
  ballSize = 50,
}: AbacusProps) {
  const [ballPositions, setBallPositions] = useState<number[]>(
    Array.from(
      { length: numberOfBalls },
      (_, i) => (i + 1) * (stickLength / (numberOfBalls + 1))
    )
  );

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
      Math.min(stickLength - ballRadius, constrained)
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
        style={{
          width: stickLength,
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
            stickLength={stickLength}
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
          Balls: {numberOfBalls} | Stick: {stickLength}px | Ball size:{" "}
          {ballSize}px
        </p>
        <p>
          Positions: {ballPositions.map((pos) => Math.round(pos)).join(", ")}
        </p>
      </div>
    </div>
  );
}

export default Abacus;
