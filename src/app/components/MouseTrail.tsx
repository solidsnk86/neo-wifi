import { useState, useEffect } from "react";
import { useMousePosition } from "@/utils/mouse-follow";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface Trail {
  x: number;
  y: number;
  id: number;
}

const MouseTrail = () => {
  const { x, y } = useMousePosition();
  const [trails, setTrails] = useState<Trail[]>([]);
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  useEffect(() => {
    const newTrail: Trail = { x, y, id: Date.now() };

    setTrails((prev) => [...prev.slice(-18), newTrail]);

    const timeout = setTimeout(() => {
      setTrails((prev) => prev.filter((t) => t.id !== newTrail.id));
    }, 500);

    return () => clearTimeout(timeout);
  }, [setTrails, x, y]);

  if (!darkMode) return null;

  return (
    <>
      {trails.map(({ x, y ,id }) => (
        <div
          key={id}
          className="mouse-trail"
          style={{
            left: x,
            top: y,
            transform: "translate(-50%, -50%) scale(1.5)",
            animation: "fadeOut 0.5s ease-out forwards",
          }}
        />
      ))}
    </>
  );
};

export default MouseTrail;
