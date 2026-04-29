"use client";

import { useEffect, useRef } from "react";
import styles from "./OscillatorField.module.css";

// Four oscillators with irrationally-related periods so true phase-sync is rare
// (~once per several minutes). Periods in seconds. Live data hook: pass
// `frequencyMultiplier` once Supabase exposes active-engagement count — slower
// rhythm when busier. Default 1 = nominal rhythm.
const PERIODS_SEC = [28, 36, 47, 61] as const;
const SPATIAL_CYCLES = [1.4, 1.7, 2.1, 2.4] as const;
const BASELINES = [0.28, 0.46, 0.62, 0.78] as const;
const AMPLITUDE_RATIO = 0.045;
const STROKE = "rgba(201, 190, 169, 0.55)"; // --rule at low alpha

type Props = {
  className?: string;
  frequencyMultiplier?: number;
};

export function OscillatorField({
  className,
  frequencyMultiplier = 1,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let rafId = 0;
    let visible = true;
    const startTime = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      const elapsed = (now - startTime) / 1000;
      const samples = 200;
      const ampMax = Math.min(width, height) * AMPLITUDE_RATIO;
      ctx.lineWidth = 1;
      ctx.strokeStyle = STROKE;
      ctx.lineCap = "round";

      for (let i = 0; i < PERIODS_SEC.length; i++) {
        const period = PERIODS_SEC[i] / frequencyMultiplier;
        const baselineY = height * BASELINES[i];
        const phase = (elapsed / period) * Math.PI * 2;
        const cycles = SPATIAL_CYCLES[i];

        ctx.beginPath();
        for (let s = 0; s <= samples; s++) {
          const t = s / samples;
          // Soft bell envelope so lines feel like marks, not full-bleed waves.
          const env = Math.exp(-Math.pow((t - 0.5) * 2.4, 2));
          const wave =
            Math.sin(t * Math.PI * 2 * cycles + phase) * ampMax * env;
          const x = t * width;
          const y = baselineY + wave;
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      if (visible && !reduced) rafId = requestAnimationFrame(draw);
    };

    resize();
    draw(performance.now());

    if (reduced) return;

    const onResize = () => {
      cancelAnimationFrame(rafId);
      resize();
      rafId = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = visible;
        visible = entry.isIntersecting;
        if (visible && !wasVisible) {
          rafId = requestAnimationFrame(draw);
        } else if (!visible) {
          cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);
    window.addEventListener("resize", onResize);
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [frequencyMultiplier]);

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.canvas} ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}
