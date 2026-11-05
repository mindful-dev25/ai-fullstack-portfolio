"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number; // Position in a -1..1 unit space, mapped onto the canvas each frame.
  y: number;
  r: number;
  phase: number;
  speed: number;
  hue: 0 | 1;
};

const DUST_COUNT = 520;
const NODE_COUNT = 42;
const LINK_DISTANCE = 0.42;

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

/** Animated particle network behind the hero text. Purely decorative. */
export function NeuralCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dust = makePoints(DUST_COUNT, 0.5, 1.3);
    const nodes = makePoints(NODE_COUNT, 2.5, 6);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let colors: [string, string] = ["#0e7490", "#7c3aed"];
    let width = 0;
    let height = 0;
    let frame = 0;
    let onScreen = true;
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const readColors = () => {
      const style = getComputedStyle(document.documentElement);
      colors = [style.getPropertyValue("--accent").trim(), style.getPropertyValue("--accent-2").trim()];
    };

    const place = (p: Point, time: number, parallax: number) => {
      const scale = Math.min(width, height * 1.25) * 0.5;
      return {
        x: width / 2 + (p.x + Math.sin(time * p.speed + p.phase) * 0.018) * scale + pointer.x * parallax,
        y: height / 2 + (p.y + Math.cos(time * p.speed + p.phase) * 0.018) * scale * 0.8 + pointer.y * parallax,
      };
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      pointer.x += (pointer.targetX - pointer.x) * 0.05;
      pointer.y += (pointer.targetY - pointer.y) * 0.05;

      const placed = nodes.map((node) => place(node, time, 16));
      const maxLink = LINK_DISTANCE * Math.min(width, height * 1.25) * 0.5;

      ctx.lineWidth = 1;
      for (let i = 0; i < placed.length; i++) {
        for (let j = i + 1; j < placed.length; j++) {
          const distance = Math.hypot(placed[i].x - placed[j].x, placed[i].y - placed[j].y);
          if (distance > maxLink) continue;
          ctx.globalAlpha = (1 - distance / maxLink) * 0.28;
          ctx.strokeStyle = colors[nodes[i].hue];
          ctx.beginPath();
          ctx.moveTo(placed[i].x, placed[i].y);
          ctx.lineTo(placed[j].x, placed[j].y);
          ctx.stroke();
        }
      }

      for (const point of dust) {
        const { x, y } = place(point, time, 8);
        ctx.globalAlpha = 0.28 + Math.sin(time + point.phase) * 0.14;
        ctx.fillStyle = colors[point.hue];
        ctx.beginPath();
        ctx.arc(x, y, point.r, 0, Math.PI * 2);
        ctx.fill();
      }

      nodes.forEach((node, i) => {
        const pulse = 1 + Math.sin(time * 1.4 + node.phase) * 0.18;
        ctx.globalAlpha = 0.42;
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
