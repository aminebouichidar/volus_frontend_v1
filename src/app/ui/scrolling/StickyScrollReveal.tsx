'use client'

import React, { CSSProperties, ReactNode, useEffect, useMemo, useRef } from "react";
import Image from "next/image";

/* =========================
   Types
========================= */

export type ImageSlide = {
  src: string;
  title: string;
  description: string;
  caption?: string;
};

type Eases = {
  container?: string; // e.g. "expo.out"
  overlay?: string;   // e.g. "expo.out"
  text?: string;      // e.g. "power3.inOut"
};

export type HeroScrollImagesProps = {
  // Top headline area
  title?: ReactNode;
  subtitle?: ReactNode;
  meta?: ReactNode;          // e.g., date or small label
  credits?: ReactNode;

  // Images data
  images: ImageSlide[];      // Array of up to 4 images with their content

  // Layout and animation tuning
  initialBoxSize?: number;   // px, starting square size (default 360)
  targetSize?: { widthVw: number; heightVh: number; borderRadius?: number } | "fullscreen";
  scrollHeightVh?: number;   // scroll height for each sticky section (default 280)
  showHeroExitAnimation?: boolean; // headline roll-away (default true)
  sticky?: boolean;          // keep media sticky (default true)
  overlayBlur?: number;      // px blur for overlay content at start (default 10)
  overlayRevealDelay?: number; // seconds offset inside main timeline (default 0.35)
  eases?: Eases;

  // Smooth scrolling
  smoothScroll?: boolean;    // initialize Lenis (default true)
  lenisOptions?: Record<string, unknown>;

  className?: string;
  style?: CSSProperties;
};

/* =========================
   Defaults
========================= */

const DEFAULTS = {
  initialBoxSize: 360,
  targetSize: "fullscreen" as const,
  scrollHeightVh: 150,
  overlayBlur: 10,
  overlayRevealDelay: 0.2,
  eases: {
    container: "expo.out",
    overlay: "expo.out",
    text: "power3.inOut",
  } as Eases,
};

/* =========================
   Component
========================= */

export const HeroScrollImages: React.FC<HeroScrollImagesProps> = ({ 
  title = "",
  subtitle = "",
  meta = "Since 2015",
  credits = (
    <>
      <p>With passion, trust, and solutions tailored to every budget.</p>
    </>
  ),

  images = [],

  initialBoxSize = DEFAULTS.initialBoxSize,
  targetSize = DEFAULTS.targetSize,
  scrollHeightVh = DEFAULTS.scrollHeightVh,
  showHeroExitAnimation = true,
  sticky = true,
  overlayBlur = DEFAULTS.overlayBlur,
  overlayRevealDelay = DEFAULTS.overlayRevealDelay,
  eases = DEFAULTS.eases,

  smoothScroll = true,
  lenisOptions,

  className,
  style,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  const isClient = typeof window !== "undefined";

  // Inline CSS variables for tuning (non-theme)
  const cssVars: CSSProperties = useMemo(
    () => ({
      '--initial-size': `${initialBoxSize}px`,
      '--overlay-blur': `${overlayBlur}px`,
    } as CSSProperties),
    [initialBoxSize, overlayBlur]
  );

  // Ensure we have valid images data
  const validImages = images.slice(0, 4); // Max 4 images
  const imageCount = validImages.length;

  // Scroll + GSAP wiring
  useEffect(() => {
    if (!isClient || imageCount === 0) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let gsap: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ScrollTrigger: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let CustomEase: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let LenisCtor: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let lenis: any;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let heroTl: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sectionTimelines: any[] = [];

    let rafCb: ((t: number) => void) | null = null;

    let cancelled = false;
    
    const rootElement = rootRef.current;

    (async () => {
      const gsapPkg = await import("gsap");
      gsap = gsapPkg.default || gsapPkg;

      const ScrollTriggerPkg =
        (await import("gsap/ScrollTrigger").catch(() =>
          import("gsap/dist/ScrollTrigger")
        )) || {};
      ScrollTrigger =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (ScrollTriggerPkg as any).default ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (ScrollTriggerPkg as any).ScrollTrigger ||
        ScrollTriggerPkg;

      const CustomEasePkg =
        (await import("gsap/CustomEase").catch(() =>
          import("gsap/dist/CustomEase")
        )) || {};
      CustomEase =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (CustomEasePkg as any).default ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (CustomEasePkg as any).CustomEase ||
        CustomEasePkg;

      gsap.registerPlugin(ScrollTrigger, CustomEase);

      if (cancelled) return;

      if (smoothScroll) {
        const try1 = await import("lenis").catch(() => null);
        const try2 = try1;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        LenisCtor = try2?.default || (try2 as any)?.Lenis;
        if (LenisCtor) {
          lenis = new LenisCtor({
            duration: 0.8,
            smoothWheel: true,
            gestureOrientation: "vertical",
            ...lenisOptions,
          });
          rafCb = (time: number) => lenis?.raf(time * 1000);
          gsap.ticker.add(rafCb);
          gsap.ticker.lagSmoothing(0);
          lenis?.on?.("scroll", ScrollTrigger.update);
        }
      }

      const containerEase = eases.container ?? "expo.out";
      const overlayEase = eases.overlay ?? "expo.out";
      const textEase = eases.text ?? "power3.inOut";
      const headline = headlineRef.current!;

      // Headline roll-away
      if (showHeroExitAnimation && headline) {
        heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: headline,
            start: "top top",
            end: "top+=420 top",
            scrub: 1.1,
          },
        });

        headline
          .querySelectorAll<HTMLElement>(".hsi-headline > *")
          .forEach((el, i) => {
            heroTl.to(
              el,
              {
                rotationX: 80,
                y: -36,
                scale: 0.86,
                opacity: 0,
                filter: "blur(4px)",
                transformOrigin: "center top",
                ease: textEase,
              },
              i * 0.08
            );
          });
      }

      // Create animation for each section
      sectionsRef.current.forEach((section) => {
        if (!section) return;

        const container = section.querySelector('.hsi-media') as HTMLElement;
        const overlayEl = section.querySelector('.hsi-overlay') as HTMLElement;
        const overlayCaption = section.querySelector('.hsi-caption') as HTMLElement;
        const overlayContent = section.querySelector('.hsi-overlay-content') as HTMLElement;

        if (!container || !overlayEl) return;

        // Create darkening overlay for this section
        const overlayDarkenEl = document.createElement("div");
        overlayDarkenEl.setAttribute("data-auto-darken", "true");
        overlayDarkenEl.style.position = "absolute";
        overlayDarkenEl.style.inset = "0";
        overlayDarkenEl.style.background = "rgba(0,0,0,0)";
        overlayDarkenEl.style.pointerEvents = "none";
        overlayDarkenEl.style.zIndex = "1";
        container.appendChild(overlayDarkenEl);

        // Target size - full width on mobile, slightly padded on desktop
        const isMobile = window.innerWidth <= 768;
        const target = (() => {
          if (targetSize === "fullscreen") {
            return { 
              width: isMobile ? "100vw" : "92vw", 
              height: isMobile ? "100vh" : "92vh", 
              borderRadius: 0
            };
          }
          return {
            width: isMobile ? "100vw" : `${targetSize.widthVw ?? 92}vw`,
            height: isMobile ? "100vh" : `${targetSize.heightVh ?? 92}vh`,
            borderRadius: isMobile ? 0 : (targetSize.borderRadius ?? 0),
          };
        })();

        // Initial states for this section - smaller starting size on mobile for better scaling effect
        const responsiveInitialSize = isMobile ? Math.min(initialBoxSize * 0.85, window.innerWidth * 0.75) : initialBoxSize;
        
        gsap.set(container, {
          width: responsiveInitialSize,
          height: responsiveInitialSize,
          borderRadius: isMobile ? 12 : 20,
          filter: "none",
          clipPath: "inset(0 0 0 0)",
        });
        gsap.set(overlayEl, { clipPath: "inset(100% 0 0 0)" });
        gsap.set(overlayContent, {
          filter: `blur(var(--overlay-blur))`,
          scale: 1.05,
          opacity: 0,
        });
        gsap.set(overlayCaption, { y: isMobile ? 15 : 20, opacity: 0 });

        // Create timeline for this section - faster on mobile for better feel
        const sectionTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: isMobile ? 1.2 : 1.5,
            pin: true,
            pinSpacing: false,
          },
        });

        // Animate the container to expand
        sectionTl
          .to(
            container,
            {
              width: target.width,
              height: target.height,
              borderRadius: target.borderRadius,
              ease: containerEase,
              duration: isMobile ? 0.45 : 0.5,
            },
            0
          )
          // Darken as it expands
          .to(
            overlayDarkenEl,
            {
              backgroundColor: isMobile ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.4)",
              ease: "power2.out",
            },
            0
          )
          // Reveal overlay panel
          .to(
            overlayEl,
            {
              clipPath: "inset(0% 0 0 0)",
              backdropFilter: `blur(${overlayBlur}px)`,
              ease: overlayEase,
            },
            isMobile ? 0.12 : 0.15
          )
          // Content slides in and unblurs
          .to(overlayCaption, { y: 0, opacity: 1, ease: overlayEase, duration: isMobile ? 0.4 : 0.5 }, isMobile ? 0.18 : 0.2)
          .to(
            overlayContent,
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              scale: 1,
              ease: overlayEase,
              duration: isMobile ? 0.5 : 0.6,
            },
            isMobile ? 0.22 : 0.25
          )
          // HOLD period - content stays visible for reading (slightly longer on mobile)
          .to({}, { duration: isMobile ? 0.35 : 0.3 }, 0.5);

        sectionTimelines.push(sectionTl);
      });
    })();

    return () => {
      cancelled = true;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (heroTl as any)?.kill?.();
        sectionTimelines.forEach(tl => tl?.kill?.());
      } catch {
        // ignore
      }
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((ScrollTrigger as any)?.getAll && rootElement) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (ScrollTrigger as any)
            .getAll()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .forEach((t: any) => rootElement.contains(t.trigger) && t.kill(true));
        }
      } catch {
        // ignore
      }
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (rafCb && (gsap as any)?.ticker) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (gsap as any).ticker.remove(rafCb);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (gsap as any).ticker.lagSmoothing(1000, 16);
        }
      } catch {
        // ignore
      }
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (lenis as any)?.off?.("scroll", (ScrollTrigger as any)?.update);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (lenis as any)?.destroy?.();
      } catch {
        // ignore
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isClient,
    initialBoxSize,
    imageCount,
    targetSize,
    scrollHeightVh,
    overlayBlur,
    overlayRevealDelay,
    eases.container,
    eases.overlay,
    eases.text,
    showHeroExitAnimation,
    sticky,
    smoothScroll,
  ]);

  return (
    <div
      ref={rootRef}
      className={["hsi-root", className].filter(Boolean).join(" ")}
      style={{ ...cssVars, ...style }}
    >
      {/* Headline/hero area */}
      <div className="hsi-container" ref={headlineRef}>
        <div className="hsi-headline">
          <h1 className="hsi-title">{title}</h1>
          {subtitle ? <h2 className="hsi-subtitle">{subtitle}</h2> : null}
          {meta ? <div className="hsi-meta">{meta}</div> : null}
          {credits ? <div className="hsi-credits">{credits}</div> : null}
        </div>
      </div>

      {/* Multiple sticky scroll sections */}
      {validImages.map((image, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) sectionsRef.current[index] = el;
          }}
          className="hsi-scroll"
          data-sticky-scroll
          style={{ height: `${Math.max(150, scrollHeightVh)}vh` }}
        >
          <div className="hsi-sticky">
            <div className="hsi-media">
              <Image
                src={image.src}
                alt={image.title}
                fill
                style={{ 
                  objectFit: "cover" 
                }}
                priority={index === 0}
              />

              {/* overlay that reveals */}
              <div className="hsi-overlay">
                <div className="hsi-caption">
                  {image.caption}
                </div>
                <div className="hsi-overlay-content">
                  <h3>{image.title}</h3>
                  <p>{image.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Styles (scoped) */}
      <style>{`
        /* System theme: define light defaults, override in dark */
        .hsi-root {
          /* Light */
          --bg: #000000;
          --text: #e5e7eb;
          --muted: #9ca3af;
          --muted-bg: rgba(139, 92, 246, 0.08);
          --muted-border: rgba(139, 92, 246, 0.2);
          --overlay-bg: rgba(10, 10, 14, 0.75);
          --overlay-text: #ffffff;
          --accent: #8b5cf6;    /* purple/violet */
          --accent-2: #22d3ee;  /* cyan */
          --accent-3: #6366f1;  /* indigo */
          --shadow: 0 10px 40px rgba(139, 92, 246, 0.15);

          color-scheme: light dark;
          background: var(--bg);
          color: var(--text);
          font-family: Inter, Inter var, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
          overflow-x: clip;
          width: 100%;
          min-height: 100vh;
        }
        @media (prefers-color-scheme: dark) {
          .hsi-root {
            --bg: #000000;
            --text: #e5e7eb;
            --muted: #9ca3af;
            --muted-bg: rgba(139, 92, 246, 0.1);
            --muted-border: rgba(139, 92, 246, 0.25);
            --overlay-bg: rgba(8, 8, 12, 0.8);
            --overlay-text: #ffffff;
            --accent: #8b5cf6;
            --accent-2: #22d3ee;
            --accent-3: #6366f1;
            --shadow: 0 12px 50px rgba(139, 92, 246, 0.25);
          }
        }

        .hsi-container {
          height: 100vh;
          display: grid;
          place-items: center;
          padding: clamp(16px, 3vw, 40px);
          perspective: 900px;
        }

        .hsi-headline { 
          text-align: center;
          transform-style: preserve-3d;
          max-width: min(100%, 1100px);
        }
        .hsi-headline > * {
          transform-style: preserve-3d;
          backface-visibility: hidden;
          transform-origin: center top;
        }

         .hsi-title {
          margin: 0 0 .6rem 0;
          font-size: clamp(32px, 8vw, 96px);
          line-height: 0.98;
          font-weight: 900;
          letter-spacing: -0.02em;
          text-wrap: balance;
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #22d3ee 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.3));
        }
        .hsi-subtitle {
          margin: 0 0 1.25rem 0;
          font-size: clamp(16px, 3.5vw, 28px);
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .hsi-meta {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          padding: .4rem .7rem;
          border-radius: 999px;
          font-size: .9rem;
          font-weight: 600;
          letter-spacing: .02em;
          background: var(--muted-bg);
          border: 1px solid var(--muted-border);
          box-shadow: var(--shadow);
          color: var(--text);
          margin: 1rem 0 0 0;
        }
        .hsi-meta::before {
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--accent), var(--accent-2));
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
          display: inline-block;
        }
        .hsi-credits {
          margin-top: 1.1rem;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono","Courier New", monospace;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted);
        }

        .hsi-scroll { 
          position: relative; 
        }
        .hsi-sticky.is-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: grid;
          place-items: center;
        }
        .hsi-sticky {
          position: ${sticky ? 'sticky' : 'relative'};
          top: ${sticky ? '0' : 'auto'};
          height: 100vh;
          display: grid;
          place-items: center;
        }

        .hsi-media {
          position: relative;
          width: var(--initial-size);
          height: var(--initial-size);
          border-radius: 20px;
          overflow: hidden;
          background: #000;
          display: grid;
          place-items: center;
          transition: border-radius 0.3s ease;
          box-shadow: 
            var(--shadow),
            0 0 0 1px rgba(139, 92, 246, 0.1),
            0 0 40px rgba(139, 92, 246, 0.15);
        }

        .hsi-overlay {
          position: absolute;
          inset: 0;
          background: var(--overlay-bg);
          color: var(--overlay-text);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: clamp(12px, 4vw, 40px);
          clip-path: inset(100% 0 0 0);
          backdrop-filter: blur(var(--overlay-blur));
          z-index: 2;
        }

        .hsi-caption {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono","Courier New", monospace;
          font-size: clamp(0.75rem, 2vw, 0.85rem);
          text-transform: uppercase;
          letter-spacing: 0.14em;
          margin-bottom: 1rem;
        }

        .hsi-overlay-content {
          margin-top: 0;
          max-width: 68ch;
          display: grid;
          gap: 0.9rem;
          width: 100%;
          padding: 0 clamp(8px, 2vw, 16px);
        }
        .hsi-overlay-content h3 {
          font-size: clamp(22px, 5vw, 50px);
          line-height: 1.02;
          margin: 0;
          font-weight: 900;
          letter-spacing: -0.01em;
          background: linear-gradient(90deg, #fff 0%, #fff 40%, var(--accent-2) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-wrap: balance;
          position: relative;
        }
        .hsi-overlay-content h3::after {
          content: "";
          display: block;
          width: clamp(48px, 15vw, 72px);
          height: 3px;
          border-radius: 999px;
          margin: 10px auto 0 auto;
          background: linear-gradient(90deg, var(--accent), var(--accent-3), var(--accent-2));
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.6);
          opacity: 0.9;
        }
        .hsi-overlay-content p {
          font-size: clamp(14px, 2.1vw, 19px);
          line-height: 1.75;
          margin: 0;
          color: #f3f4f6; /* better contrast over images */
          opacity: 0.95;
        }

        /* Mobile specific adjustments */
        @media (max-width: 768px) {
          .hsi-root {
            overflow-x: hidden;
            margin-left: calc(-50vw + 50%);
            margin-right: calc(-50vw + 50%);
            width: 100vw;
            -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
          }
          
          .hsi-container {
            padding: 16px;
            height: 100vh;
            height: 100dvh; /* Use dynamic viewport height on mobile */
          }
          
          .hsi-sticky.is-sticky {
            height: 100vh;
            height: 100dvh; /* Use dynamic viewport height on mobile */
          }
          
          .hsi-media {
            max-width: 100vw;
            max-height: 100vh;
            max-height: 100dvh;
            border-radius: 12px; /* Slightly more rounded on mobile at start */
            box-shadow: 
              0 10px 40px rgba(0, 0, 0, 0.4),
              0 0 0 1px rgba(139, 92, 246, 0.15),
              0 0 30px rgba(139, 92, 246, 0.2);
          }
          
          .hsi-overlay {
            padding: 16px 12px;
            background: rgba(0,0,0,0.85) !important; /* Darker for better readability */
            z-index: 10 !important;
          }

          .hsi-media img {
            z-index: 1 !important;
          }
          
          .hsi-overlay-content { 
            max-width: 100%;
            padding: 0 8px;
            gap: 0.6rem;
          }
          
          .hsi-caption {
            font-size: 0.7rem;
            letter-spacing: 0.12em;
            margin-bottom: 0.8rem;
          }
          
          .hsi-overlay-content h3 {
            font-size: clamp(20px, 7vw, 32px);
            line-height: 1.1;
          }
          
          .hsi-overlay-content h3::after {
            width: clamp(40px, 12vw, 60px);
            height: 2.5px;
            margin: 8px auto 0 auto;
          }
          
          .hsi-overlay-content p {
            font-size: clamp(13px, 3.5vw, 16px);
            line-height: 1.6;
          }
        }

        @media (max-width: 900px) and (min-width: 769px) {
          .hsi-overlay-content { max-width: 40ch; }
        }
      `}</style>
    </div>
  );
};