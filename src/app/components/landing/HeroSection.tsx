"use client"

import Image from 'next/image';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { lazy } from 'react'
import { Sparkles } from './Particles';
import DotLoaderMain from '../loading/DotLoaderMain';
const Spline = lazy(() => import('@splinetool/react-spline'))
import { FaAws, FaGooglePlus, FaHubspot } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { SiteNavbar } from '@/components/navigation/SiteNavbar';


function HeroSplineBackground() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      pointerEvents: 'auto',
      overflow: 'hidden',
    }}>
    <Suspense fallback={<DotLoaderMain />}>
      <Spline
        style={{
          width: '100%',
          height: '100vh',
          pointerEvents: 'auto',
        }}
        scene="https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode"
      />
    </Suspense>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: `
            linear-gradient(to right, rgba(0, 0, 0, 0.7), transparent 30%, transparent 70%, rgba(0, 0, 0, 0.7)),
            linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.85))
          `,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: 'rgba(6, 5, 22, 0.35)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}


function ScreenshotSection({ screenshotRef }: { screenshotRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <section className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 mt-11 md:mt-12">
      <div ref={screenshotRef} className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-700/50 w-full md:w-[80%] lg:w-[80%] mx-auto">
        <div>
    <Image
      src="https://cdn.sanity.io/images/s6lu43cv/production-v4/13b6177b537aee0fc311a867ea938f16416e8670-3840x2160.jpg?w=3840&h=2160&q=10&auto=format&fm=jpg"
      alt="Volus ai sentiment dashboard"
            width={1920}
            height={1080}
            className="w-full h-auto block rounded-lg mx-auto"
            />
        </div>
      </div>
    </section>
  );
}

function HeroContent() {
  const [productName, setProductName] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const confirmationTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  useEffect(() => {
    return () => {
      if (confirmationTimeout.current) {
        clearTimeout(confirmationTimeout.current);
      }
    };
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = productName.trim();

    if (!trimmedName) {
      setShowConfirmation(false);
      return;
    }

    if (productName !== trimmedName) {
      setProductName(trimmedName);
    }

    setShowConfirmation(true);

    if (confirmationTimeout.current) {
      clearTimeout(confirmationTimeout.current);
    }

    confirmationTimeout.current = setTimeout(() => {
      setShowConfirmation(false);
      confirmationTimeout.current = null;
    }, 3200);

    router.push(`/insights?query=${encodeURIComponent(trimmedName)}`);
  };

  return (
    <div className="text-left text-white mb-20 pt-10 sm:pt-16 md:pt-24 px-4 max-w-3xl">
      <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight tracking-wide">
        We Transform Market Chaos Into <br className="sm:hidden " /> <span className='text-indigo-300'>Predictable Trends</span>
      </h1>
      <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-80 max-w-xl">
        Real-time insights from Amazon, eBay, social media, YouTube, Google, Reddit, and news with AI powered predictions for what happens next.
      </p>

      <form onSubmit={handleSubmit} className="pointer-events-auto max-w-xl space-y-3 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
            placeholder="Enter product name ..."
            className="flex-1 bg-[#0009] border border-gray-600/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 text-gray-100 rounded-full px-5 py-3 outline-none transition"
            aria-label="Product name"
          />
          <button
            type="submit"
            className="bg-gradient-to-r cursor-pointer from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-full transition duration-300 flex items-center justify-center whitespace-nowrap"
          >
            Get Insights
          </button>
        </div>
        {showConfirmation && (
          <div className="text-sm text-indigo-200 bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-3">
            Scanning multi-channel data for <span className="font-medium text-white">{productName}</span>...
          </div>
        )}
      </form>

      <div className="flex pointer-events-auto flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-3">
        <button className="bg-[#8200DB29] cursor-pointer hover:bg-black/50 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-full transition duration-300 w-full sm:w-auto border border-[#322D36]" style={{ backdropFilter: 'blur(8px)' }}>
          View Demo
        </button>
        <button className="pointer-events-auto cursor-pointer bg-[#0009] border border-gray-600 hover:border-gray-400 text-gray-200 hover:text-white font-medium py-2 sm:py-3 px-6 sm:px-8 rounded-full transition duration-300 flex items-center justify-center w-full sm:w-auto">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          Sample Report
        </button>
      </div>
    </div>
  );
}


// logos

const Bandys = () => (
  <Image 
    src='/logo-bandys-white.svg'
    alt='bandys cars official logo'
    width='90'
    height='60'
  />
)

const Aws = () => (
  <FaAws className='h-10 w-10'/>
)

const Kuai = () => (
  <Image 
    src='/kuai-03.webp'
    alt='Kuai sourcing logo' 
    width='60'
    height='50'
  />
)

const GooglePlus = () => (
  <FaGooglePlus className='h-10 w-10' />
)

const Raycast = () => (
  <FaHubspot className='h-10 w-10' />
)

export const HeroSection = () => {
  const screenshotRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (screenshotRef.current && heroContentRef.current) {
        requestAnimationFrame(() => {
          const scrollPosition = window.pageYOffset;
          if (screenshotRef.current) {
            screenshotRef.current.style.transform = `translateY(-${scrollPosition * 0.5}px)`;
          }

          const maxScroll = 400;
          const opacity = 1 - Math.min(scrollPosition / maxScroll, 1);
          if (heroContentRef.current) {
            heroContentRef.current.style.opacity = opacity.toString();
          }
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      <SiteNavbar variant="marketing" />

      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <HeroSplineBackground />
        </div>

        <div ref={heroContentRef} style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh',
          display: 'flex', justifyContent: 'flex-start', alignItems: 'center', zIndex: 10, pointerEvents: 'none'
        }}>
          <div className="container mx-auto">
            <HeroContent />
          </div>
        </div>
      </div>

      <div className="bg-black relative z-10" style={{ marginTop: '-15vh' }}>
        <ScreenshotSection screenshotRef={screenshotRef} />
        
    {/* Additional content sections for scrolling */}
    <div className="h-screen w-full overflow-hidden">
      <div className="mx-auto  w-full max-w-2xl">
        <div className="text-center text-3xl text-foreground">
          <span className="text-indigo-200">
            Trusted by fast growing companies.
          </span>

          <br />

          <span className='text-gray-500'>worldwide.</span>
        </div>

        <div className="mt-14 grid grid-cols-5 text-white">
          <Aws />
          <Raycast />
          <Bandys />
          <Kuai />
          <GooglePlus />
        </div>
      </div>

      <div className="relative -mt-32 h-72 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#8350e8,transparent_70%)] before:opacity-40" />
        <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%] border-t border-white/20 bg-zinc-900" />
        <Sparkles
          density={1200} 
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
          color={"#ffffff"}
        />
      </div>
    </div>
    </div>


    </div>
  );
};