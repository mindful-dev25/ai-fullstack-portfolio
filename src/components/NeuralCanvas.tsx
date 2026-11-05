"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number; // Position in a -1..1 unit space, mapped onto the cloud each frame.
  y: number;
  r: number;
  phase: number;
  speed: number;
  hue: 0 | 1;
};

type Orb = {
  angle: number;
  radius: number; // Orbit radius as a fraction of the hero's base size.
  r: number;
  speed: number;
  color: 0 | 1 | 2;
  alpha: number;
};

const DUST_COUNT = 1500;
const NODE_COUNT = 32;
const ORB_COUNT = 18;
const LINK_DISTANCE = 0.46; // In unit space, so links scale with the cloud.
const PINK = "#f472b6";

function randomInCloud(): { x: number; y: number } {
  // Rejection-sample an uneven, two-lobed cloud so it reads as a neural mass.
  while (true) {
    const x = Math.random() * 2 - 1;
    const y = Math.random() * 2 - 1;
    const lobes = Math.min(
      Math.hypot((x + 0.36) / 0.68, (y + 0.05) / 0.86),
      Math.hypot((x - 0.36) / 0.68, (y + 0.05) / 0.86),
    );
    if (lobes <= 1) return { x, y };
  }
}

function makePoints(count: number, minR: number, maxR: number): Point[] {
  return Array.from({ length: count }, () => ({
    ...randomInCloud(),
    r: minR + Math.random() * (maxR - minR),
    phase: Math.random() * Math.PI * 2,
    speed: 0.25 + Math.random() * 0.5,
    hue: Math.random() > 0.5 ? 1 : 0,
  }));
}

function makeOrbs(): Orb[] {
  return Array.from({ length: ORB_COUNT }, () => ({
    angle: Math.random() * Math.PI * 2,
    radius: 0.3 + Math.random() * 0.55,
    r: 5 + Math.random() * 13,
    speed: (0.012 + Math.random() * 0.02) * (Math.random() > 0.5 ? 1 : -1),
    color: Math.floor(Math.random() * 3) as Orb["color"],
    alpha: 0.3 + Math.random() * 0.3,
  }));
}

/** Animated particle cloud and floating orbs behind the hero text. Purely decorative. */
export function NeuralCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dust = makePoints(DUST_COUNT, 1.5, 3.2);
    const nodes = makePoints(NODE_COUNT, 3, 6.5);
    const orbs = makeOrbs();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let colors = ["#0891b2", "#7c3aed", PINK];
    let width = 0;
    let height = 0;
    let base = 0; // Must match the ring size set in Hero.tsx.
    let frame = 0;
    let onScreen = true;
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const readColors = () => {
      const style = getComputedStyle(document.documentElement);
      colors = [style.getPropertyValue("--accent").trim(), style.getPropertyValue("--accent-2").trim(), PINK];
    };

    const place = (p: Point, time: number, parallax: number) => ({
      x: width / 2 + (p.x + Math.sin(time * p.speed + p.phase) * 0.02) * base * 0.255 + pointer.x * parallax,
      y: height / 2 + base * 0.03 + (p.y + Math.cos(time * p.speed + p.phase) * 0.02) * base * 0.19 + pointer.y * parallax,
    });

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      pointer.x += (pointer.targetX - pointer.x) * 0.05;
      pointer.y += (pointer.targetY - pointer.y) * 0.05;

      for (const orb of orbs) {
        const angle = orb.angle + time * orb.speed;
        ctx.globalAlpha = orb.alpha;
        ctx.fillStyle = colors[orb.color];
        ctx.beginPath();
        ctx.arc(
          width / 2 + Math.cos(angle) * orb.radius * base + pointer.x * 24,
          height / 2 + Math.sin(angle) * orb.radius * base * 0.42 + pointer.y * 24,
          orb.r,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }

      const placed = nodes.map((node) => place(node, time, 12));

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const distance = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (distance > LINK_DISTANCE) continue;
          ctx.globalAlpha = (1 - distance / LINK_DISTANCE) * 0.4;
          ctx.strokeStyle = colors[nodes[i].hue];
          ctx.beginPath();
          ctx.moveTo(placed[i].x, placed[i].y);
          ctx.lineTo(placed[j].x, placed[j].y);
          ctx.stroke();
        }
      }

      for (const point of dust) {
        const { x, y } = place(point, time, 6);
        ctx.globalAlpha = 0.8 + Math.sin(time + point.phase) * 0.2;
        ctx.fillStyle = colors[point.hue];
        ctx.fillRect(x, y, point.r, point.r);
      }

      nodes.forEach((node, i) => {
        const pulse = 1 + Math.sin(time * 1.4 + node.phase) * 0.18;
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = colors[node.hue];
        ctx.beginPath();
        ctx.arc(placed[i].x, placed[i].y, node.r * pulse, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };

    const tick = (now: number) => {
      draw(now / 1000);
      frame = requestAnimationFrame(tick);
    };

    const syncLoop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (reducedMotion.matches) draw(0);
      else if (onScreen && !document.hidden) frame = requestAnimationFrame(tick);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      base = Math.min(width * 1.25, window.innerHeight * 1.02);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      syncLoop();
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.targetY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    readColors();
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Stop drawing when the hero is scrolled away or the tab is in the background.
    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      syncLoop();
    });
    visibility.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      readColors();
      syncLoop();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    document.addEventListener("visibilitychange", syncLoop);
    reducedMotion.addEventListener("change", syncLoop);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibility.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", syncLoop);
      reducedMotion.removeEventListener("change", syncLoop);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
