"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatsCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  minDigits?: number;
  className?: string;
}

export function StatsCounter({
  value,
  duration = 1.5,
  prefix = "",
  suffix = "",
  decimals = 0,
  minDigits = 0,
  className,
}: StatsCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (reduce) {
      setDisplayValue(value);
      return;
    }
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue, reduce]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {displayValue.toFixed(decimals).padStart(minDigits, "0")}
      {suffix}
    </span>
  );
}

export default StatsCounter;
