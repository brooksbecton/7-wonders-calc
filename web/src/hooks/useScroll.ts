import { useEffect, useState } from "react";

interface IScrollPositions {
  x: number;
  y: number;
}

export function useScroll() {
  const defaultScrollPositions: IScrollPositions = {
    x: window.scrollX,
    y: window.scrollY,
  };
  const [scrollPositions, setScrollPositions] = useState(
    defaultScrollPositions
  );
  const handleScrollChange = () => {
    setScrollPositions({ x: window.scrollX, y: window.scrollY });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScrollChange);

    return () => {
      window.removeEventListener("scroll", handleScrollChange);
    };
  });
  return scrollPositions;
}
