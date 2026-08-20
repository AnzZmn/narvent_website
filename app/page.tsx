"use client";

import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Capabilities from "@/components/Capabilities";
import Features from "@/components/Features";
import Blend from "@/components/Blend";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useForceScrollPastSection from "@/lib/snapScroll";
import useForceScrollThroughSections from "@/lib/snapScroll";
import Footer from "@/components/Footer";

// ==================================================
// Small hook: detect mobile / low-power devices so we
// can dial back DPR + postprocessing cost automatically.
// Fixes: no mobile-adaptive quality path in the original.
// ==================================================

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

// --------------------------------------------------
// Deterministic pseudo-random function
// --------------------------------------------------

type SegmentProgress = { segment: number; t: number };

function useScrollProgress(sectionIds: string[]) {
  const state = useRef<SegmentProgress>({ segment: 0, t: 0 });

  useEffect(() => {
    if (sectionIds.length < 2) return;

    const els = sectionIds.map((id) => document.getElementById(id));
    if (els.some((el) => !el)) return;

    // Precompute the boundary [scrollStart, scrollEnd] for each
    // consecutive pair, using the same "top of A at top of
    // viewport" -> "bottom of B aligned with viewport bottom"
    // definition as before, just applied pairwise.
    const calcBoundaries = () => {
      const vh = window.innerHeight;
      const boundaries: { start: number; end: number }[] = [];

      for (let i = 0; i < els.length - 1; i++) {
        const startEl = els[i]!;
        const endEl = els[i + 1]!;

        const startRect = startEl.getBoundingClientRect();
        const endRect = endEl.getBoundingClientRect();

        const scrollStart = window.scrollY + startRect.top;
        const endElTop = window.scrollY + endRect.top;
        const endElHeight = endRect.height;
        const scrollEnd = endElTop - (vh - endElHeight);

        boundaries.push({ start: scrollStart, end: scrollEnd });
      }

      return boundaries;
    };

    let boundaries = calcBoundaries();

    const calc = () => {
      const current = window.scrollY;

      // Before the first boundary starts
      if (current <= boundaries[0].start) {
        state.current = { segment: 0, t: 0 };
        return;
      }

      // After the last boundary ends
      const lastIdx = boundaries.length - 1;
      if (current >= boundaries[lastIdx].end) {
        state.current = { segment: lastIdx, t: 1 };
        return;
      }

      // Find which segment we're currently in
      for (let i = 0; i < boundaries.length; i++) {
        const { start, end } = boundaries[i];
        if (current >= start && current <= end) {
          const raw = (current - start) / (end - start);
          state.current = {
            segment: i,
            t: THREE.MathUtils.clamp(raw, 0, 1),
          };
          return;
        }
        // Gap between this segment's end and the next one's
        // start (e.g. a tall section in between): hold at t=1
        // for the segment we just left until the next starts.
        if (i < boundaries.length - 1 && current < boundaries[i + 1].start) {
          state.current = { segment: i, t: 1 };
          return;
        }
      }
    };

    const onResize = () => {
      boundaries = calcBoundaries();
      calc();
    };

    calc();
    window.addEventListener("scroll", calc, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", calc);
      window.removeEventListener("resize", onResize);
    };
  }, [sectionIds.join("|")]);

  return state;
}

// --------------------------------------------------
// Piecewise-lerp a position out of an array of waypoints
// using the {segment, t} produced by useScrollProgress.
// positions.length must equal sectionIds.length.
// --------------------------------------------------

function getWaypointPosition(
  positions: THREE.Vector3[],
  { segment, t }: SegmentProgress,
  target = new THREE.Vector3(),
) {
  const from = positions[segment];
  const to = positions[Math.min(segment + 1, positions.length - 1)];
  return target.lerpVectors(from, to, t);
}

const SECTION_IDS = ["Hero", "workers", "features"]; // add/remove as needed
const WAYPOINTS = [
  new THREE.Vector3(0.3, 0, 20.5), // at "Hero"
  new THREE.Vector3(-1.2, 0, 20), // at "workers"
  new THREE.Vector3(0, 0.6, 19), // at "footer"
];

// --------------------------------------------------
// Model — the dodecahedron logo made of glass shards
// --------------------------------------------------
function Model({ reducedMotion }: { reducedMotion: boolean }) {
  const { scene } = useGLTF("/LogoBevel.glb");
  const groupRef = useRef<THREE.Group>(null);

  const scrollState = useScrollProgress(SECTION_IDS);
  const tmpPos = useRef(new THREE.Vector3());

  const objects = useMemo(() => {
    const meshes: THREE.Mesh[] = [];
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        meshes.push(child);
      }
    });
    return meshes;
  }, [scene]);

  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#ffffff"),
      metalness: 0,
      roughness: 0.02,
      transmission: 1,
      thickness: 1,
      ior: 1.5,
      clearcoat: 1,
      clearcoatRoughness: 0,
      emissiveIntensity: 10,
      attenuationColor: new THREE.Color("#f2ecff"),
      attenuationDistance: 2.5,
      transparent: true,
      opacity: 1,
      envMapIntensity: 2,
    });
  }, []);

  useEffect(() => {
    objects.forEach((mesh) => {
      mesh.material = glassMaterial;
    });
    return () => {
      glassMaterial.dispose();
    };
  }, [objects, glassMaterial]);

  // ------------------------------------------------
  // Scroll progress driving the group's position
  // between START_POS and END_POS (Hero -> workers)
  // ------------------------------------------------
  //
  useFrame(() => {
    if (!groupRef.current || reducedMotion) return;

    const pos = getWaypointPosition(
      WAYPOINTS,
      scrollState.current,
      tmpPos.current,
    );
    groupRef.current.position.copy(pos);
  });

  return (
    <group
      ref={groupRef}
      rotation={[Math.PI / 2, 0, 0.11]}
      position={WAYPOINTS[0].toArray()}
      scale={6}
    >
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/LogoBevel.glb");

// --------------------------------------------------
// Background plane
//
// Fixes:
// - was placed at z = -950 with the default camera far
//   plane at 1000 and camera at z = 16 → only ~34 units
//   of headroom before far-plane clipping, which is fragile
//   the moment anyone tweaks the camera. Pulled it much
//   closer and let the fog/gradient do the "infinite
//   backdrop" job instead.
// - had a stray pointLight nested inside the plane mesh
//   (so its position was relative to a mesh sitting almost
//   a kilometer away) lighting essentially nothing.
// - background color (#2E2910, an olive/brown) didn't match
//   the brand's lavender/purple palette or the glass shards.
// --------------------------------------------------

// --------------------------------------------------
// Scene wrapper — isolates all the 3D-specific setup
// (camera, lights, effects) from the page layout below.
// --------------------------------------------------

function Scene({
  isMobile,
  reducedMotion,
  frequency,
}: {
  isMobile: boolean;
  reducedMotion: boolean;
  frequency: number;
}) {
  return (
    <Canvas
      // Fix: capping DPR avoids rendering at full retina
      // resolution (2x, 3x) on phones, which is the single
      // biggest cost driver for transmission + bloom.
      dpr={isMobile ? [1, 1] : [1, 1.75]}
      camera={{ position: [0, 0, 22], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#A855F7"]} />
      <Blend
        colors={["#000000", "#A855F7", "#000000"]}
        speed={0.4}
        scale={0.6}
        frequency={frequency}
        warpStrength={1.2}
        mouseInfluence={2}
        intensity={1}
        bandWidth={0.7}
      />
      <ambientLight intensity={0.35} />
      <pointLight position={[-6, -3, 4]} intensity={0.1} color="" />

      <React.Suspense fallback={null}>
        <Model reducedMotion={reducedMotion} />
        <Environment preset="city" />
      </React.Suspense>

      {/*
        Fix: OrbitControls was unrestricted on a full-viewport
        fixed background canvas. On desktop, dragging the page
        would spin the whole scene instead of doing nothing;
        on mobile, a swipe-to-scroll gesture would get captured
        as a drag-to-rotate gesture and the page would stop
        scrolling — directly against this site's "scrolling"
        theme. Disabled all user interaction, kept the target
        locked, and let the scroll-driven animation in Model
        be the only thing that moves the camera-relevant content.
      */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />

      {!isMobile && (
        <EffectComposer>
          <Bloom
            intensity={0.8}
            luminanceThreshold={0.25}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}
gsap.registerPlugin(ScrollTrigger);

const MODEL_POSITION = new THREE.Vector3(16, 0, -29);

export function CameraRig() {
  const { camera } = useThree();

  // Derive the camera's *initial* spherical coords from its Canvas-defined
  // starting position [0, 0, 22], relative to the model.
  const spherical = useRef(
    new THREE.Spherical().setFromVector3(
      new THREE.Vector3(0, 0, 22).sub(MODEL_POSITION),
    ),
  );

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#Hero",
        start: "top top",
        end: "+=2500",
        scrub: 1,
        pin: false,
      },
    });

    const applySpherical = () => {
      const pos = new THREE.Vector3()
        .setFromSpherical(spherical.current)
        .add(MODEL_POSITION);
      camera.position.copy(pos);
      camera.lookAt(MODEL_POSITION);
    };

    // Phase 1 — zoom in: shrink radius only, angles untouched
    tl.to(spherical.current, {
      radius: 30, // tune: how close the camera gets
      ease: "power3.inOut",
      duration: 2,
      onUpdate: applySpherical,
    });
  }, []);

  return null;
}

// --------------------------------------------------
// Page
// --------------------------------------------------

export default function Home() {
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();

  const sections = useMemo(
    () => [
      { id: "Hero", frequency: 0.7 },
      { id: "workers", frequency: 0.6 },
      { id: "features", frequency: 0.5 }, // pick your value
    ],
    [],
  );

  const { frequency } = useForceScrollThroughSections(sections);

  return (
    <div className="relative w-full min-h-screen bg-[#0d0a1a]">
      {/* 3D background */}
      <div
        className="fixed inset-0 z-0"
        // Fix: pointer-events-none here (rather than on the
        // foreground wrapper) is what actually keeps the canvas
        // from swallowing touch/scroll input, now that
        // OrbitControls no longer needs to receive pointer
        // events at all.
        style={{ pointerEvents: "none" }}
      >
        <Scene
          isMobile={isMobile}
          reducedMotion={reducedMotion}
          frequency={frequency}
        />
      </div>

      <Nav />

      {/*
        Fix: the original wrapped Hero/Capabilities/Features in
        pointer-events-none with no corresponding pointer-events-auto
        anywhere inside, which silently disables every button, link,
        and input in those sections (pointer-events-none is inherited
        by children unless a child explicitly opts back in). Since
        the background no longer needs pointer capture, the
        foreground can stay fully interactive.
      */}

      <div className="relative z-10 overflow-y-scroll snap-y snap-mandatory">
        <Hero />
        <Capabilities />
        <Features />
        <Footer />
      </div>
    </div>
  );
}
