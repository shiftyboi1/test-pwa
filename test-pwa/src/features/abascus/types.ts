export interface AbacusBallProps {
  position: number; // Pixel position along stick
  ballSize: number; // Size in pixels
  stickLength: number; // Stick length in pixels
  onPositionChange: (newPosition: number) => void;
  color?: string;
}

export interface AbacusProps {
  numberOfBalls?: number;
  ballSize?: number;
}
