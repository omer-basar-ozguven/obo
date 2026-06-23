"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSET = 48;

function getVariants(direction: Direction): Variants {
  const offset = {
    up:    { y: OFFSET },
    down:  { y: -OFFSET },
    left:  { x: OFFSET },
    right: { x: -OFFSET },
    none:  {},
  }[direction];

  return {
    hidden:  { opacity: 0, ...offset },
    visible: { opacity: 1, x: 0, y: 0 },
  };
}

const spring = {
  type: "spring" as const,
  stiffness: 70,
  damping: 18,
  mass: 0.9,
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={getVariants(direction)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ ...spring, delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.1,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
}) {
  return (
    <motion.div
      className={className}
      variants={getVariants(direction)}
      transition={spring}
    >
      {children}
    </motion.div>
  );
}
