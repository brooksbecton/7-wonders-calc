import { useEffect, useState } from "react";

interface IScrollPositions {
  x: number;
  y: number;
}

export function useScroll() {
  const defaultScrollPositions: IScrollPositions = { x: 0, y: 0 };

  const [scrollPositions, setScrollPositions] = useState(
    defaultScrollPositions
  );

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollPositions({ x: window.scrollX, y: window.scrollY });
    });
  });
  return [scrollPositions, setScrollPositions];
}

