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
  const [activePointerId, setActivePointerId] = useState<number | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Note: Only start drag for primary button (touch, pen, left mouse)
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragOffset(e.clientX - position);
    setActivePointerId(e.pointerId);
    // Note: Capture pointer so we continue to receive events even if pointer leaves the element
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging || e.pointerId !== activePointerId) return;
      const newPosition = e.clientX - dragOffset;
      const ballRadius = ballSize / 2;
      const constrainedPosition = Math.max(
        ballRadius,
        Math.min(stickLength - ballRadius, newPosition)
      );
      onPositionChange(constrainedPosition);
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (e.pointerId !== activePointerId) return;
      setIsDragging(false);
      setActivePointerId(null);
    };

    if (isDragging && activePointerId !== null) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("pointercancel", handlePointerUp);
      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
        window.removeEventListener("pointercancel", handlePointerUp);
      };
    }
  }, [
    isDragging,
    dragOffset,
    ballSize,
    stickLength,
    onPositionChange,
    activePointerId,
  ]);

  // Stuff here would be calculated based on height eventually
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
      onPointerDown={handlePointerDown}
    />
  );
}

export default DraggableBall;
