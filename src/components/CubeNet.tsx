"use client";

import { useEffect, useRef } from "react";
import styles from "./CubeNet.module.css";

const PARTS = [
  { roman: "i", label: "Client" },
  { roman: "ii", label: "Audience" },
  { roman: "iii", label: "Work" },
  { roman: "iv", label: "People" },
] as const;

const VIEWBOX = 600;
const CENTER = VIEWBOX / 2;
const SQUARE = 110;
const GAP = 32;
const CYCLE_SEC = 28;

// Expanded — 2x2 grid centered on CENTER. (top-left corner of each square)
const EXPANDED: ReadonlyArray<readonly [number, number]> = [
  [CENTER - SQUARE - GAP / 2, CENTER - SQUARE - GAP / 2],
  [CENTER + GAP / 2, CENTER - SQUARE - GAP / 2],
  [CENTER - SQUARE - GAP / 2, CENTER + GAP / 2],
  [CENTER + GAP / 2, CENTER + GAP / 2],
];

// Merged — vertical stack near center. Combined with the parent rotateX tilt
// this reads as 4 layers receding into space, not 4 squares overlapping flat.
const STACK_PITCH = 6;
const MERGED: ReadonlyArray<readonly [number, number]> = PARTS.map((_, i) => {
  const offsetIndex = i - (PARTS.length - 1) / 2; // -1.5, -0.5, 0.5, 1.5
  return [CENTER - SQUARE / 2, CENTER - SQUARE / 2 + offsetIndex * STACK_PITCH];
});

// Mouse-driven tilt range (degrees). Subtle.
const MAX_TILT_X = 6;
const MAX_TILT_Y = 8;
const BASE_TILT_X = 18;
const BASE_TILT_Z = -8;

export function CubeNet() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const tileRefs = useRef<Array<SVGGElement | null>>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let rafId = 0;
    let visible = true;
    const startTime = performance.now();
    let lastFrame = startTime;

    // Cursor inputs (raw)
    let mouseNX = 0; // normalised -1..1 from wrap centre
    let mouseNY = 0;
    let cursorNear = 0; // 0/1 target
    // Smoothed
    let smoothCursor = 0;
    let smoothNX = 0;
    let smoothNY = 0;

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      mouseNX = Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width / 2)));
      mouseNY = Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height / 2)));

      const pad = 100;
      cursorNear =
        e.clientX >= r.left - pad &&
        e.clientX <= r.right + pad &&
        e.clientY >= r.top - pad &&
        e.clientY <= r.bottom + pad
          ? 1
          : 0;
    };

    const onLeave = () => {
      cursorNear = 0;
    };

    const renderStatic = (t: number) => {
      for (let i = 0; i < PARTS.length; i++) {
        const g = tileRefs.current[i];
        if (!g) continue;
        const [ex, ey] = EXPANDED[i];
        const [mx, my] = MERGED[i];
        const x = mx + (ex - mx) * t;
        const y = my + (ey - my) * t;
        g.setAttribute("transform", `translate(${x}, ${y})`);
        g.style.opacity = String(0.55 + 0.45 * t);
      }
    };

    const tick = (now: number) => {
      const dt = Math.min((now - lastFrame) / 1000, 0.1);
      lastFrame = now;

      // Smooth cursor inputs
      smoothCursor += (cursorNear - smoothCursor) * Math.min(dt * 1.4, 1);
      smoothNX += (mouseNX - smoothNX) * Math.min(dt * 3, 1);
      smoothNY += (mouseNY - smoothNY) * Math.min(dt * 3, 1);

      // Natural breath: 0 (merged) → 1 (expanded) → 0
      const elapsed = (now - startTime) / 1000;
      const breath =
        0.5 - 0.5 * Math.cos((elapsed / CYCLE_SEC) * Math.PI * 2);
      // Cursor near pulls toward merged.
      const t = breath * (1 - smoothCursor * 0.85);

      renderStatic(t);

      const tiltX = BASE_TILT_X - smoothNY * MAX_TILT_X;
      const tiltY = smoothNX * MAX_TILT_Y;
      wrap.style.setProperty("--tilt-x", `${tiltX}deg`);
      wrap.style.setProperty("--tilt-y", `${tiltY}deg`);
      wrap.style.setProperty("--tilt-z", `${BASE_TILT_Z}deg`);

      if (visible && !reduced) rafId = requestAnimationFrame(tick);
    };

    if (reduced) {
      // Static expanded view, base tilt only.
      wrap.style.setProperty("--tilt-x", `${BASE_TILT_X}deg`);
      wrap.style.setProperty("--tilt-y", `0deg`);
      wrap.style.setProperty("--tilt-z", `${BASE_TILT_Z}deg`);
      renderStatic(1);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = visible;
        visible = entry.isIntersecting;
        if (visible && !wasVisible) {
          lastFrame = performance.now();
          rafId = requestAnimationFrame(tick);
        } else if (!visible) {
          cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(wrap);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className={styles.wrap} aria-hidden="true">
      <svg
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
        className={styles.svg}
        preserveAspectRatio="xMidYMid meet"
      >
        {PARTS.map((part, i) => (
          <g
            key={part.label}
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            className={styles.tile}
          >
            <rect
              width={SQUARE}
              height={SQUARE}
              fill="none"
              stroke="var(--rule)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
            <text x={10} y={20} className={styles.roman}>
              {part.roman}.
            </text>
            <text x={10} y={SQUARE - 12} className={styles.label}>
              {part.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
