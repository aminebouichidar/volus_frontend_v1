"use client"

import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { lazy } from 'react'
import { Sparkles } from './Particles';
import DotLoaderMain from '../loading/DotLoaderMain';
const Spline = lazy(() => import('@splinetool/react-spline'))
import { FaAws, FaGooglePlus, FaHubspot } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/app/ui/random/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';


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

export function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScroll(10);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [open]);

  const platformLinks = [
    { label: 'Sentiment Analysis', href: '/sentiment', description: 'Track customer emotions across platforms' },
    { label: 'Predictive Forecasting', href: '/forecasting', description: 'AI-powered demand predictions' },
    { label: 'Market Intelligence', href: '/intelligence', description: 'Real-time competitive insights' },
    { label: 'Multi-Channel Monitoring', href: '/monitoring', description: 'Amazon, eBay, Social & more' },
  ];

  const solutionsLinks = [
    { label: 'E-commerce Analytics', href: '/ecommerce', description: 'Optimize your online sales' },
    { label: 'Brand Monitoring', href: '/brand', description: 'Protect your reputation' },
    { label: 'Competitor Analysis', href: '/competitor', description: 'Stay ahead of the market' },
    { label: 'Demand Forecasting', href: '/demand', description: 'Plan inventory effectively' },
  ];

  const resourcesLinks = [
    { label: 'Documentation', href: '/docs', description: 'API guides and tutorials' },
    { label: 'Case Studies', href: '/cases', description: 'Success stories' },
    { label: 'Blog', href: '/blog', description: 'Latest insights' },
    { label: 'Help Center', href: '/help', description: 'Get support' },
  ];

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 mx-auto w-full transition-all duration-500 ease-out',
        {
          'mt-4 max-w-6xl': scrolled,
          'max-w-7xl': !scrolled,
        }
      )}
    >
      <nav 
        className={cn(
          'flex h-16 items-center justify-between px-6 transition-all duration-500 ease-out',
          {
            'bg-zinc-900/80 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] mx-4': scrolled,
            'bg-transparent': !scrolled,
          }
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group relative z-10">
          <div className="relative">
            <Image
              src="/volus_logo.svg"
              alt="Volus AI Official Logo"
              width={72}
              height={52}
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-0.5">
          {/* Platform Dropdown */}
          <div className="relative group">
            <button className="px-3.5 py-2 text-[13px] font-medium text-gray-400 hover:text-white rounded-lg transition-colors duration-200 flex items-center gap-1.5">
              Platform
              <svg className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 top-full mt-3 w-80 bg-zinc-900/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
              <div className="p-2">
                <a
                  href="/sentiment"
                  className="block p-3.5 rounded-xl hover:bg-white/[0.05] transition-all duration-200 group/item"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 group-hover/item:border-indigo-500/40 transition-colors">
                      <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white text-sm group-hover/item:text-indigo-400 transition-colors">Sentiment Analysis</div>
                      <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">Track customer emotions across platforms</div>
                    </div>
                  </div>
                </a>
                <a
                  href="/forecasting"
                  className="block p-3.5 rounded-xl hover:bg-white/[0.05] transition-all duration-200 group/item"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 group-hover/item:border-indigo-500/40 transition-colors">
                      <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white text-sm group-hover/item:text-indigo-400 transition-colors">Predictive Forecasting</div>
                      <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">AI-powered demand predictions</div>
                    </div>
                  </div>
                </a>
                <a
                  href="/intelligence"
                  className="block p-3.5 rounded-xl hover:bg-white/[0.05] transition-all duration-200 group/item"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 group-hover/item:border-indigo-500/40 transition-colors">
                      <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white text-sm group-hover/item:text-indigo-400 transition-colors">Market Intelligence</div>
                      <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">Real-time competitive insights</div>
                    </div>
                  </div>
                </a>
                <a
                  href="/monitoring"
                  className="block p-3.5 rounded-xl hover:bg-white/[0.05] transition-all duration-200 group/item"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 group-hover/item:border-indigo-500/40 transition-colors">
                      <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white text-sm group-hover/item:text-indigo-400 transition-colors">Multi-Channel Monitoring</div>
                      <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">Amazon, eBay, Social & more</div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="px-4 py-3 bg-white/[0.02] border-t border-white/[0.05]">
                <a href="/demo" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition-colors">
                  View all features
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Solutions Dropdown */}
          <div className="relative group">
            <button className="px-3.5 py-2 text-[13px] font-medium text-gray-400 hover:text-white rounded-lg transition-colors duration-200 flex items-center gap-1.5">
              Solutions
              <svg className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 top-full mt-3 w-80 bg-zinc-900/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
              <div className="p-2">
                <a
                  href="/ecommerce"
                  className="block p-3.5 rounded-xl hover:bg-white/[0.05] transition-all duration-200 group/item"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover/item:border-purple-500/40 transition-colors">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white text-sm group-hover/item:text-purple-400 transition-colors">E-commerce Analytics</div>
                      <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">Optimize your online sales</div>
                    </div>
                  </div>
                </a>
                <a
                  href="/brand"
                  className="block p-3.5 rounded-xl hover:bg-white/[0.05] transition-all duration-200 group/item"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover/item:border-purple-500/40 transition-colors">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white text-sm group-hover/item:text-purple-400 transition-colors">Brand Monitoring</div>
                      <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">Protect your reputation</div>
                    </div>
                  </div>
                </a>
                <a
                  href="/competitor"
                  className="block p-3.5 rounded-xl hover:bg-white/[0.05] transition-all duration-200 group/item"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover/item:border-purple-500/40 transition-colors">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white text-sm group-hover/item:text-purple-400 transition-colors">Competitor Analysis</div>
                      <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">Stay ahead of the market</div>
                    </div>
                  </div>
                </a>
                <a
                  href="/demand"
                  className="block p-3.5 rounded-xl hover:bg-white/[0.05] transition-all duration-200 group/item"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover/item:border-purple-500/40 transition-colors">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white text-sm group-hover/item:text-purple-400 transition-colors">Demand Forecasting</div>
                      <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">Plan inventory effectively</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Resources Dropdown */}
          <div className="relative group">
            <button className="px-3.5 py-2 text-[13px] font-medium text-gray-400 hover:text-white rounded-lg transition-colors duration-200 flex items-center gap-1.5">
              Resources
              <svg className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 top-full mt-3 w-80 bg-zinc-900/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
              <div className="p-2">
                <a
                  href="/docs"
                  className="block p-3.5 rounded-xl hover:bg-white/[0.05] transition-all duration-200 group/item"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover/item:border-cyan-500/40 transition-colors">
                      <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white text-sm group-hover/item:text-cyan-400 transition-colors">Documentation</div>
                      <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">API guides and tutorials</div>
                    </div>
                  </div>
                </a>
                <a
                  href="/cases"
                  className="block p-3.5 rounded-xl hover:bg-white/[0.05] transition-all duration-200 group/item"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover/item:border-cyan-500/40 transition-colors">
                      <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white text-sm group-hover/item:text-cyan-400 transition-colors">Case Studies</div>
                      <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">Success stories</div>
                    </div>
                  </div>
                </a>
                <a
                  href="/blog"
                  className="block p-3.5 rounded-xl hover:bg-white/[0.05] transition-all duration-200 group/item"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover/item:border-cyan-500/40 transition-colors">
                      <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white text-sm group-hover/item:text-cyan-400 transition-colors">Blog</div>
                      <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">Latest insights</div>
                    </div>
                  </div>
                </a>
                <a
                  href="/help"
                  className="block p-3.5 rounded-xl hover:bg-white/[0.05] transition-all duration-200 group/item"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover/item:border-cyan-500/40 transition-colors">
                      <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white text-sm group-hover/item:text-cyan-400 transition-colors">Help Center</div>
                      <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">Get support</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Pricing Link */}
          <a
            href="#pricing"
            className="px-3.5 py-2 text-[13px] font-medium text-gray-400 hover:text-white rounded-lg transition-colors duration-200"
          >
            Pricing
          </a>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/signin">
            <Button 
              variant="ghost" 
              className="text-[13px] cursor-pointer font-medium text-gray-400 hover:text-white hover:bg-white/[0.05] border-0 px-4 h-9 rounded-lg transition-all duration-200"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="relative text-[13px] cursor-pointer font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-0 px-5 h-9 rounded-lg shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 overflow-hidden group">
              <span className="relative z-10">Start Free Trial</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          size="icon"
          variant="outline"
          onClick={() => setOpen(!open)}
          className="md:hidden border-white/20 hover:bg-white/5"
          aria-label="Toggle menu"
        >
          <MenuToggleIcon open={open} className="size-5 text-gray-700" duration={300} />
        </Button>
      </nav>

      {/* Mobile Menu */}
      {open && typeof window !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 top-16 z-40 md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
          style={{ 
            position: 'fixed',
            top: '64px',
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden'
          }}
        >
          <div 
            className="h-full w-full flex flex-col"
            style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            {/* Scrollable Content Area */}
            <div
              className="flex-1 p-6 pb-4"
              style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                WebkitOverflowScrolling: 'touch',
                msOverflowStyle: '-ms-autohiding-scrollbar'
              }}
            >
              <div className="grid gap-5">
                {/* Platform Section */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-cyan-400/80 uppercase tracking-wider mb-3 px-1">Platform</h3>
                  <div className="space-y-1.5">
                    {platformLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="block p-3 rounded-xl hover:bg-white/[0.05] transition-all duration-200 group"
                        onClick={() => setOpen(false)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:border-cyan-500/40 transition-colors">
                            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-white text-sm group-hover:text-cyan-400 transition-colors">{link.label}</div>
                            <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{link.description}</div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Solutions Section */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-cyan-400/80 uppercase tracking-wider mb-3 px-1">Solutions</h3>
                  <div className="space-y-1.5">
                    {solutionsLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="block p-3 rounded-xl hover:bg-white/[0.05] transition-all duration-200 group"
                        onClick={() => setOpen(false)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:border-cyan-500/40 transition-colors">
                            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-white text-sm group-hover:text-cyan-400 transition-colors">{link.label}</div>
                            <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{link.description}</div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Resources Section */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-cyan-400/80 uppercase tracking-wider mb-3 px-1">Resources</h3>
                  <div className="space-y-1.5">
                    {resourcesLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="block p-3 rounded-xl hover:bg-white/[0.05] transition-all duration-200 group"
                        onClick={() => setOpen(false)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:border-cyan-500/40 transition-colors">
                            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-white text-sm group-hover:text-cyan-400 transition-colors">{link.label}</div>
                            <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{link.description}</div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Pricing Link */}
                <a
                  href="#pricing"
                  className="block p-3 rounded-xl hover:bg-white/[0.05] transition-all duration-200 group"
                  onClick={() => setOpen(false)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:border-cyan-500/40 transition-colors">
                      <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white text-sm group-hover:text-cyan-400 transition-colors">Pricing</div>
                      <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">View plans</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Bottom Actions */}
            <div 
              className="flex-shrink-0 p-6 pt-4 border-t border-white/5 bg-black/40 backdrop-blur-sm"
              style={{ flexShrink: 0 }}
            >
              <div className="flex flex-col gap-3">
                <Link href="/signin" onClick={() => setOpen(false)}>
                  <Button 
                    variant="outline" 
                    className="w-full border-white/20 hover:bg-white/5 text-black md:text-gray-300 hover:text-white transition-all duration-200"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300">
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
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
      <Navbar />

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