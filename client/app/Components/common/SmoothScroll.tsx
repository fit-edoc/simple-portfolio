"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
    useEffect(() => {
        // On touch / mobile devices, native hardware-accelerated momentum scrolling
        // is far smoother, avoids scroll jank, and saves significant CPU/battery.
        const isTouch =
            typeof window !== "undefined" &&
            ("ontouchstart" in window ||
                navigator.maxTouchPoints > 0 ||
                window.innerWidth < 768);

        if (isTouch) {
            return;
        }

        const lenis = new Lenis({
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1,
        });

        (window as any).lenis = lenis;

        let animId: number;
        function raf(time: number) {
            lenis.raf(time);
            animId = requestAnimationFrame(raf);
        }

        animId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(animId);
            lenis.destroy();
            delete (window as any).lenis;
        };
    }, []);

    return null;
}
