"use client";

import { useEffect, useRef } from "react";

/**
 * Abstract "digital landscape": a perspective wireframe terrain drawn on a 2D canvas.
 * Much lighter than WebGL, pauses when offscreen, and renders a single static frame
 * for reduced motion. Colours follow the active theme.
 */
export function HeroBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Lighter mesh + lower frame rate on small screens to keep the main thread free.
    const small = window.matchMedia("(max-width: 767px)").matches;
    const frameInterval = small ? 1000 / 30 : 0;
    let lastFrame = 0;
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let visible = true;
    let color = "124,124,255";
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const readColor = () => {
      const hex = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
      const m = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex);
      if (m) color = `${parseInt(m[1], 16)},${parseInt(m[2], 16)},${parseInt(m[3], 16)}`;
    };

    const resize = () => {
      const dpr = small ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const COLS = small ? 26 : 46;
    const ROWS = small ? 18 : 30;
    const height = (x: number, z: number, t: number) =>
      Math.sin(x * 0.35 + t * 0.4) * 0.6 +
      Math.sin(z * 0.28 - t * 0.25 + x * 0.12) * 0.9 +
      Math.cos(x * 0.9 + z * 0.5) * 0.25 +
      Math.pow(Math.abs(x) / (COLS / 2), 2) * 3.2; // valleys rise into "mountains" at the sides

    const draw = (time: number) => {
      const t = time * 0.001;
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      ctx.clearRect(0, 0, w, h);
      const horizon = h * 0.28 + mouse.y * 10;
      const cx = w * 0.62 + mouse.x * 24;
      const fov = Math.max(w, 700) * 0.55;
      const cam = 3.2;
      const drift = (t * 0.6) % 1;

      for (let r = ROWS; r >= 1; r--) {
        const z = r - drift + 0.6;
        const depth = 1 - r / ROWS;
        const alpha = Math.pow(depth, 1.6) * 0.55;
        ctx.beginPath();
        for (let c = 0; c <= COLS; c++) {
          const x = c - COLS / 2;
          const y = height(x, z + t * 0.6, t);
          const sx = cx + (x * fov * 0.9) / z;
          const sy = horizon + ((cam - y) * fov * 0.22) / z;
          c === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = `rgba(${color},${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // sparse vertical ribs for a subtle mesh feel
      for (let c = 0; c <= COLS; c += 3) {
        const x = c - COLS / 2;
        ctx.beginPath();
        for (let r = 1; r <= ROWS; r++) {
          const z = r - drift + 0.6;
          const y = height(x, z + t * 0.6, t);
          const sx = cx + (x * fov * 0.9) / z;
          const sy = horizon + ((cam - y) * fov * 0.22) / z;
          r === 1 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = `rgba(${color},0.07)`;
        ctx.stroke();
      }
    };

    const loop = (time: number) => {
      if (time - lastFrame >= frameInterval) {
        lastFrame = time;
        draw(time);
      }
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    readColor();
    resize();
    draw(0);
    // Start animating once the page is idle, so first paint and hydration win.
    let idle = 0;
    const kick = () => {
      idle = 0;
      start();
    };
    if ("requestIdleCallback" in window) idle = window.requestIdleCallback(kick, { timeout: 2000 });
    else idle = setTimeout(kick, 1200) as unknown as number;

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (!visible) stop();
      else if (!idle) start();
    });
    io.observe(canvas);

    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth - 0.5;
      mouse.ty = e.clientY / window.innerHeight - 0.5;
    };
    const onVis = () => (document.hidden ? stop() : !idle && start());
    const onResize = () => {
      resize();
      if (!running) draw(0);
    };
    const onTheme = () => {
      readColor();
      if (!running) draw(0);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("themechange", onTheme);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop();
      if (idle && "cancelIdleCallback" in window) window.cancelIdleCallback(idle);
      else if (idle) clearTimeout(idle);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("themechange", onTheme);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
