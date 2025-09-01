import { useState, useEffect } from "react";
import type { AbacusBallProps } from "../types";

function DraggableBall({
  position,
  ballSize,
  stickLength,
  onPositionChange,
  color = "red",
}: AbacusBallProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  // TODO: Pointer events instead of Mouse events, allowing for multitouch

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset(e.clientX - position); // Offset of mouse to ball center
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const newPosition = e.clientX - dragOffset;
      const ballRadius = ballSize / 2;
      const constrainedPosition = Math.max(
        ballRadius,
        Math.min(stickLength - ballRadius, newPosition)
      );

      onPositionChange(constrainedPosition);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragOffset, ballSize, stickLength, onPositionChange]);

  return (
    <div
      style={{
        position: "absolute",
        left: position - ballSize / 2, // Center ball on its position
        top: -(ballSize / 2) + 4, // Center on stick (stick height is 8px, temporary)
        width: ballSize,
        height: ballSize,
        backgroundColor: color,
        borderRadius: "50%",
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        boxShadow: isDragging
          ? "0 8px 16px rgba(0,0,0,0.3)"
          : "0 4px 8px rgba(0,0,0,0.2)",
        transform: isDragging ? "scale(1.1)" : "scale(1)",
        transition: isDragging ? "none" : "transform 0.2s ease",
      }}
      onMouseDown={handleMouseDown}
    />
  );
}

export default DraggableBall;
