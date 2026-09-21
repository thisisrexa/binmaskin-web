"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = (stagger: number, delay: number) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

const item = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 0.7, ease: EASE },
  },
};

export function StaggerText({
  children,
  delay = 0,
  divideBy = "word",
  className,
}: {
  children: ReactNode;
  delay?: number;
  divideBy?: "word" | "letter";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const text =
    typeof children === "string" || typeof children === "number"
      ? String(children)
      : null;

  if (!text) return <>{children}</>;
  if (reduce) return <span className={className}>{text}</span>;

  const parts = divideBy === "letter" ? text.split("") : text.split(" ");
  const stagger = divideBy === "letter" ? 0.02 : 0.05;

  return (
    <motion.span
      variants={container(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={cn("inline-block", className)}
    >
      {parts.map((part, i) => (
        <span key={i} className="relative inline-block overflow-hidden align-top">
          <motion.span variants={item} className="inline-block will-change-transform">
            {divideBy === "letter"
              ? part === " "
                ? "\u00A0"
                : part
              : `${part}\u00A0`}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export default StaggerText;
