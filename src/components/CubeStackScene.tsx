"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const COUNT_PER_SIDE = 4;
const TOTAL = COUNT_PER_SIDE * COUNT_PER_SIDE; // 16
const CUBE = 0.5;
const CYCLE_SEC = 18;
const STROKE_HEX = 0xc9bea9; // matches --rule

type Refs = {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  near: React.MutableRefObject<number>;
};

function Assembly({ refs }: { refs: Refs }) {
  const groupRef = useRef<THREE.Group>(null);
  const startRef = useRef(performance.now());

  // Three target positions per cube — united / split-into-4 / split-into-16.
  // The 16 cubes always exist; their positions interpolate between states.
  const positions = useMemo(() => {
    const united: THREE.Vector3[] = [];
    const four: THREE.Vector3[] = [];
    const sixteen: THREE.Vector3[] = [];

    const gap16 = 0.18;
    const gap4 = 0.55;
    const subGap = 0.04;

    for (let row = 0; row < COUNT_PER_SIDE; row++) {
      for (let col = 0; col < COUNT_PER_SIDE; col++) {
        united.push(new THREE.Vector3(0, 0, 0));

        const x16 = (col - 1.5) * (CUBE + gap16);
        const y16 = -(row - 1.5) * (CUBE + gap16);
        sixteen.push(new THREE.Vector3(x16, y16, 0));

        // Split-4: arrange in 2x2 macro clusters, each cluster a tight 2x2.
        const clusterCol = Math.floor(col / 2);
        const clusterRow = Math.floor(row / 2);
        const innerCol = col % 2;
        const innerRow = row % 2;
        const clusterX = (clusterCol - 0.5) * (2 * CUBE + gap4);
        const clusterY = -(clusterRow - 0.5) * (2 * CUBE + gap4);
        const innerX = (innerCol - 0.5) * (CUBE + subGap);
        const innerY = -(innerRow - 0.5) * (CUBE + subGap);
        four.push(
          new THREE.Vector3(clusterX + innerX, clusterY + innerY, 0)
        );
      }
    }
    return { united, four, sixteen };
  }, []);

  const geo = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(CUBE, CUBE, CUBE)),
    []
  );
  const mat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: STROKE_HEX,
        transparent: true,
        opacity: 0.6,
      }),
    []
  );

  useEffect(
    () => () => {
      geo.dispose();
      mat.dispose();
    },
    [geo, mat]
  );

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const elapsed = (performance.now() - startRef.current) / 1000;
    const phase = (elapsed % CYCLE_SEC) / CYCLE_SEC; // 0..1
    // Triangle wave: 0 → 2 → 0 across one cycle. State 0=united, 1=split-4,
    // 2=split-16.
    let stateT =
      phase < 0.5 ? phase * 4 : (1 - phase) * 4;
    // Cursor proximity pulls toward united.
    stateT = stateT * (1 - refs.near.current * 0.85);

    const children = groupRef.current.children;
    for (let i = 0; i < TOTAL; i++) {
      const child = children[i];
      if (!child) continue;
      let target: THREE.Vector3;
      if (stateT < 1) {
        target = positions.united[i]
          .clone()
          .lerp(positions.four[i], stateT);
      } else {
        target = positions.four[i]
          .clone()
          .lerp(positions.sixteen[i], stateT - 1);
      }
      child.position.lerp(target, Math.min(delta * 8, 1));
    }

    // Group rotation — base tilt + cursor parallax. Damp for smoothness.
    const m = refs.mouse.current;
    const targetX = 0.42 - m.y * 0.18;
    const targetY = m.x * 0.32;
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetX,
      3,
      delta
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetY,
      3,
      delta
    );
    groupRef.current.rotation.z = -0.12;
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: TOTAL }).map((_, i) => (
        <lineSegments key={i} geometry={geo} material={mat} />
      ))}
    </group>
  );
}

export default function CubeStackScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const nearRef = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const raw = { x: 0, y: 0, near: 0 };
    let smoothNear = 0;
    let smoothX = 0;
    let smoothY = 0;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      const c = canvasRef.current;
      if (!c) return;
      const r = c.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      raw.x = Math.max(
        -1,
        Math.min(1, (e.clientX - cx) / (r.width / 2))
      );
      raw.y = Math.max(
        -1,
        Math.min(1, (e.clientY - cy) / (r.height / 2))
      );
      const pad = 120;
      raw.near =
        e.clientX >= r.left - pad &&
        e.clientX <= r.right + pad &&
        e.clientY >= r.top - pad &&
        e.clientY <= r.bottom + pad
          ? 1
          : 0;
    };

    const onLeave = () => {
      raw.near = 0;
    };

    const tick = () => {
      smoothNear += (raw.near - smoothNear) * 0.06;
      smoothX += (raw.x - smoothX) * 0.09;
      smoothY += (raw.y - smoothY) * 0.09;
      mouseRef.current.x = smoothX;
      mouseRef.current.y = smoothY;
      nearRef.current = smoothNear;
      if (!reduced) rafId = requestAnimationFrame(tick);
    };

    if (!reduced) rafId = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <Canvas
      orthographic
      camera={{ zoom: 110, position: [0, 0, 5] }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      onCreated={({ gl }) => {
        canvasRef.current = gl.domElement;
        gl.setClearColor(0x000000, 0);
      }}
    >
      <Assembly refs={{ mouse: mouseRef, near: nearRef }} />
    </Canvas>
  );
}
