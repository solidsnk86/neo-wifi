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

    setTrails((prev) => [...prev.slice(-15), newTrail]);

    const timeout = setTimeout(() => {
      setTrails((prev) => prev.filter((t) => t.id !== newTrail.id));
    }, 500);

    return () => clearTimeout(timeout);
  }, [x, y]);

  return (
    <>
      {darkMode
        ? trails.map((trail) => (
            <div
              key={trail.id}
              className="mouse-trail"
              style={{
                left: trail.x,
                top: trail.y,
                transform: "translate(-50%, -50%) scale(1.5)",
                animation: "fadeOut 0.5s ease-out forwards",
              }}
            />
          ))
        : null}
    </>
  );
};

export default MouseTrail;
