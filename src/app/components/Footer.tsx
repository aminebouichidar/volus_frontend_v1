"use client"

import Image from 'next/image';
import { Mail, MapPin, Twitter, Linkedin, Github, Youtube, Instagram } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { TextHoverEffect, FooterBackgroundGradient } from '@/components/ui/hover-footer';
import { PlaceholdersAndVanishInput } from '@/app/ui/random/placeholders-and-vanish-input';

const Footer = () => {
  const [subscribed, setSubscribed] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSubscribe = (submittedEmail: string) => {
    if (!submittedEmail) {
      return;
    }
    setSubscribed(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setSubscribed(false);
      timeoutRef.current = null;
    }, 3200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const newsletterPlaceholders = useMemo(
    () => [
      'Enter your work email',
      'insights@company.com',
      'growth@volus.ai',
    ],
    [],
  );

  const platformLinks = [
    { label: 'Sentiment Analysis', href: '/sentiment' },
    { label: 'Predictive Forecasting', href: '/forecasting' },
    { label: 'Market Intelligence', href: '/intelligence' },
    { label: 'Multi-Channel Monitoring', href: '/monitoring' },
  ];

  const solutionsLinks = [
    { label: 'E-commerce Analytics', href: '/ecommerce' },
    { label: 'Brand Monitoring', href: '/brand' },
    { label: 'Competitor Analysis', href: '/competitor' },
    { label: 'Demand Forecasting', href: '/demand' },
  ];

  const resourcesLinks = [
    { label: 'Documentation', href: '/docs' },
    { label: 'Case Studies', href: '/cases' },
    { label: 'Blog', href: '/blog' },
    { label: 'Help Center', href: '/help' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Security', href: '/security' },
  ];

  const footerLinks = {
    platform: platformLinks,
    solutions: solutionsLinks,
    resources: resourcesLinks,
    legal: legalLinks,
  };

  return (
    <footer className="relative border-t border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 relative z-10">
        {/* Top Section - Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/volus_logo.svg"
                alt="Volus AI Logo"
                width={72}
                height={52}
              />
          
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
                VOLUS AI reads the market for you, tracking sentiment, analysing behaviour, and predicting what customers will care about next.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-indigo-400" />
                <a href="mailto:hello@volus.ai">hello@volus.ai</a>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span>Singapore</span>
              </div>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-8">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
              <div className="pointer-events-none absolute inset-0 opacity-90">
                <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,rgba(129,140,248,0.32),transparent_55%)]" />
              </div>
              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-xl space-y-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.35em] text-indigo-100">
                    Insights
                  </span>
                  <h3 className="text-xl font-semibold text-white">
                    Stay Ahead of Market Shifts
                  </h3>
                  <p className="text-sm text-gray-300">
                    Weekly intelligence on sentiment, demand signals, and competitor moves delivered to your inbox.
                  </p>
                </div>
                <div className="w-full max-w-sm">
                  <PlaceholdersAndVanishInput
                    placeholders={newsletterPlaceholders}
                    onChange={() => {
                      if (subscribed) {
                        setSubscribed(false);
                        if (timeoutRef.current) {
                          clearTimeout(timeoutRef.current);
                          timeoutRef.current = null;
                        }
                      }
                    }}
                    onSubmit={handleSubscribe}
                    className="w-full"
                  />
                  {subscribed && (
                    <p className="mt-2 flex items-center gap-2 text-xs font-medium text-emerald-300">
                      <span className="text-base leading-none">✓</span>
                      Subscribed! Check your inbox.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-12">
          {/* Platform */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Solutions
            </h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 gap-6 relative z-30">
          {/* Copyright */}
          <div className="text-gray-400 text-sm">
            <p>&copy; 2025 Volus AI. All rights reserved.</p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
             <a
              href="#"
              className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
              aria-label="Youtube"
            >
              <Youtube className="w-4 h-4" />
            </a>
             <a
              href="#"
              className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Text hover effect - Large "VOLUS" text - Must be on top for hover to work */}
      <div className="flex h-[22rem] md:h-[35rem] -mt-16 md:-mt-28 -mb-16 md:-mb-28 relative z-20 pointer-events-none">
        <div className="w-full h-full pointer-events-auto">
          <TextHoverEffect text="VOLUS" />
        </div>
      </div>

      {/* Background Gradient */}
      <FooterBackgroundGradient />
    </footer>
  );
};

export default Footer;
