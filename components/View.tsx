"use client";

import * as THREE from "three";
import { useEffect, useMemo } from "react";
import { RoundedBoxGeometry } from "three-stdlib";
import { Html } from "@react-three/drei";

type ViewBlockProps = {
  borderColor?: string;
  /**
   * Pass true on small viewports. Narrower FOV coverage on
   * portrait screens means a fixed world-space position/scale
   * that looks right on desktop can drift toward the frame edge
   * or read as oversized on mobile — this scales/repositions it
   * to compensate instead of hardcoding one layout for both.
   */
  isMobile?: boolean;
};

export function ViewBlock({
  borderColor = "#c4b5fd",
  isMobile = false,
}: ViewBlockProps) {
  // Fix: radius (5th arg) must be <= min(width, height, depth) / 2.
  // Depth here is 0.05, so the valid max radius is 0.025 — the
  // original passed 0.08, more than 3x that, which pinches/warps
  // the rounded corners on a panel this thin instead of giving a
  // clean rounded edge.
  const geometry = useMemo(
    () => new RoundedBoxGeometry(1, 0.25, 0.01, 4, 0.02),
    [],
  );

  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: "#ffffff",
      metalness: 0,
      roughness: 0.02,
      transmission: 1,
      thickness: 0.4,
      ior: 1.5,
      transparent: true,
      opacity: 0.2,
      envMapIntensity: 1.5,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      specularIntensity: 1,
      attenuationColor: "#ffffff",
      attenuationDistance: 0.5,
      side: THREE.DoubleSide,
    });
  }, []);

  const edgesGeometry = useMemo(
    () => new THREE.EdgesGeometry(geometry, 15),
    [geometry],
  );

  // Fix: geometry/edgesGeometry/glassMaterial are built with `new`
  // inside useMemo, so R3F doesn't know to dispose them — it only
  // auto-cleans objects it creates itself from JSX (the
  // <lineBasicMaterial> elements below are fine as-is). Dispose
  // manually on unmount to avoid leaking GPU resources.
  useEffect(() => {
    return () => {
      geometry.dispose();
      edgesGeometry.dispose();
      glassMaterial.dispose();
    };
  }, [geometry, edgesGeometry, glassMaterial]);

  // Fix: original position [-0.5, 0, 15] sat ~1 unit from a camera
  // at z=16 — right on top of the near clip plane, so the card
  // would fill almost the entire viewport instead of reading as a
  // small floating accent next to the logo. Moved into the same
  // depth range as the logo/model, offset to the side.
  const position: [number, number, number] = isMobile
    ? [0, 1.7, 1]
    : [0.5, -0.44, 20];

  const scale = isMobile ? 0.7 : 1;

  return (
    <group position={position} scale={scale}>
      <mesh geometry={geometry} material={glassMaterial}></mesh>

      {/* Core bright line */}
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial
          color={borderColor}
          toneMapped={false} // critical: lets the color exceed 1.0 for bloom to pick up
          transparent
          opacity={1}
        />
      </lineSegments>

      {/* Slightly thicker/duller halo pass underneath for extra glow width */}
      <lineSegments geometry={edgesGeometry} scale={1.01}>
        <lineBasicMaterial
          color={borderColor}
          toneMapped={false}
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}
