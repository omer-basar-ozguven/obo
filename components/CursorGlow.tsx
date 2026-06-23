"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CursorGlow() {
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);

  const x = useSpring(mouseX, { stiffness: 80, damping: 20, mass: 0.5 });
  const y = useSpring(mouseY, { stiffness: 80, damping: 20, mass: 0.5 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 hidden md:block"
      aria-hidden
    >
      <motion.div
        style={{
          position: "absolute",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 8%, transparent) 0%, transparent 70%)",
          translateX: "-50%",
          translateY: "-50%",
          left: x,
          top: y,
        }}
      />
    </motion.div>
  );
}
