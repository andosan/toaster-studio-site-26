"use client";

import dynamic from "next/dynamic";
import styles from "./CubeStack.module.css";

// Three.js bundle (~150KB gz) only loads on the home page after hydration —
// not on /build, /adopt, /manifest. SSR is skipped because WebGL context
// requires a real DOM.
const CubeStackScene = dynamic(() => import("./CubeStackScene"), {
  ssr: false,
});

export function CubeStack() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <CubeStackScene />
    </div>
  );
}
