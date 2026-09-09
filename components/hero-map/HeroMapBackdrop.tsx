"use client";

import React, { useEffect } from "react";

/** Animated worker-map behind the hero. The map itself is a self-registering
 *  custom element (shadow DOM + inline SVG) in ./narvent-map-bg.js — the two
 *  gradient layers on top keep the copy legible. */
export function HeroMapBackdrop() {
  useEffect(() => {
    void import("./narvent-map-bg.js");
  }, []);

  const MapBackground = "narvent-map-bg";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {React.createElement(MapBackground, {
        workers: "9",
        pace: "0.75",
        labels: "off",
        bubbles: "off",
      })}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,249,253,0.2)_0%,rgba(250,249,253,0.5)_26%,rgba(250,249,253,0.66)_50%,rgba(250,249,253,0.74)_74%,rgba(250,249,253,0.8)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(84%_34%_at_50%_32%,rgba(250,249,253,0.52),transparent_70%),radial-gradient(96%_42%_at_50%_0%,rgba(109,86,255,0.12),transparent_72%)]" />
    </div>
  );
}
