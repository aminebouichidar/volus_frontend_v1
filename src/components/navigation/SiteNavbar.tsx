'use client';

import { Button } from "@/components/ui/button";
import { useScroll } from "@/components/ui/use-scroll";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { MenuToggleIcon } from "@/app/ui/random/menu-toggle-icon";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSession, signOut } from "next-auth/react";

const platformLinks = [
  { label: "Sentiment Analysis", href: "/sentiment", description: "Track customer emotions across platforms" },
  { label: "Predictive Forecasting", href: "/forecasting", description: "AI-powered demand predictions" },
  { label: "Market Intelligence", href: "/intelligence", description: "Real-time competitive insights" },
  { label: "Multi-Channel Monitoring", href: "/monitoring", description: "Amazon, eBay, Social & more" },
];

const solutionsLinks = [
  { label: "E-commerce Analytics", href: "/ecommerce", description: "Optimize your online sales" },
  { label: "Brand Monitoring", href: "/brand", description: "Protect your reputation" },
  { label: "Competitor Analysis", href: "/competitor", description: "Stay ahead of the market" },
  { label: "Demand Forecasting", href: "/demand", description: "Plan inventory effectively" },
];

const resourcesLinks = [
  { label: "Documentation", href: "/docs", description: "API guides and tutorials" },
  { label: "Case Studies", href: "/cases", description: "Success stories" },
  { label: "Blog", href: "/blog", description: "Latest insights" },
  { label: "Help Center", href: "/help", description: "Get support" },
];

const dropdownSections = [
  { title: "Platform", links: platformLinks },
  { title: "Solutions", links: solutionsLinks },
  { title: "Resources", links: resourcesLinks },
];

function Avatar({ name, image }: { name?: string | null; image?: string | null }) {
  const initials = useMemo(() => {
    if (!name) return "V";
    return name
      .split(" ")
      .map((part) => part[0]?.toUpperCase())
      .slice(0, 2)
      .join("")
      .trim() || "V";
  }, [name]);

  if (image) {
    return (
      <Image
        src={image}
        alt={name ?? "User avatar"}
        width={36}
        height={36}
        className="h-9 w-9 rounded-xl object-cover"
      />
    );
  }

  return (
    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-sm font-semibold text-white flex items-center justify-center">
      {initials}
    </div>
  );
}

export type NavbarVariant = "marketing" | "dashboard";

interface SiteNavbarProps {
  variant?: NavbarVariant;
  planBadge?: {
    title: string;
    description?: string;
  };
}

export function SiteNavbar({ variant = "marketing", planBadge }: SiteNavbarProps) {
  const scrolled = useScroll(10);
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isAuthenticated = Boolean(session?.user);
  const user = session?.user;

  useEffect(() => {
    if (typeof document !== "undefined") {
      setMenuAnchor(document.body);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuOpen]);

  const desktopActions = isAuthenticated ? (
    <div className="flex items-center gap-3">
      {planBadge && (
        <div className="hidden md:flex flex-col rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-left">
          <p className="text-[11px] uppercase tracking-[0.35em] text-gray-400">{planBadge.title}</p>
          {planBadge.description && <p className="text-sm text-white">{planBadge.description}</p>}
        </div>
      )}
      {variant === "marketing" && (
        <Link href="/user-dashboard" className="hidden md:block">
          <Button className="text-[13px] cursor-pointer font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-0 px-5 h-9 rounded-lg shadow-lg shadow-indigo-500/25">
            Open dashboard
          </Button>
        </Link>
      )}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setUserMenuOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-2 py-1 pr-3"
        >
          <Avatar name={user?.name} image={user?.image ?? undefined} />
          <div className="hidden sm:block text-left">
            <p className="text-xs text-gray-400">{variant === "dashboard" ? "Control room" : "Signed in"}</p>
            <p className="text-sm font-semibold text-white">{user?.name ?? user?.email ?? "You"}</p>
          </div>
        </button>
        {userMenuOpen && (
          <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-white/10 bg-zinc-950/95 backdrop-blur-xl shadow-2xl shadow-black/40 p-2">
            {variant === "marketing" && (
              <Link
                href="/user-dashboard"
                className="block cursor-pointer rounded-xl px-3 py-2 text-sm text-gray-200 hover:bg-white/5"
                onClick={() => setUserMenuOpen(false)}
              >
                Open dashboard
              </Link>
            )}
            <Link
              href="/user-dashboard/profile"
              className="block cursor-pointer rounded-xl px-3 py-2 text-sm text-gray-200 hover:bg-white/5"
              onClick={() => setUserMenuOpen(false)}
            >
              Profile & settings
            </Link>
            <button
              className="block cursor-pointer w-full rounded-xl px-3 py-2 text-left text-sm text-rose-200 hover:bg-white/5"
              onClick={() => {
                setUserMenuOpen(false);
                signOut({ callbackUrl: "/" });
              }}
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="hidden md:flex items-center gap-3">
      <Link href="/signin">
        <Button
          variant="ghost"
          className="text-[13px] cursor-pointer font-medium text-gray-400 hover:text-white hover:bg-white/5 border-0 px-4 h-9 rounded-lg"
        >
          Sign In
        </Button>
      </Link>
      <Link href="/signup">
        <Button className="text-[13px] cursor-pointer  font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-0 px-5 h-9 rounded-lg shadow-lg shadow-indigo-500/25">
          Start Free Trial
        </Button>
      </Link>
    </div>
  );

  const baseNavClass = cn(
    "fixed top-0 left-0 right-0 z-50 mx-auto w-full transition-all duration-500 ease-out",
    variant === "marketing" ? (scrolled ? "mt-4 max-w-6xl" : "max-w-7xl") : "max-w-7xl"
  );

  const navInnerClass = cn(
    "flex h-16 items-center justify-between px-6 transition-all duration-500 ease-out",
    scrolled || variant === "dashboard"
      ? "bg-zinc-950/85 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] mx-4"
      : "bg-transparent"
  );

  return (
    <header className={baseNavClass}>
      <nav className={navInnerClass}>
        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative">
            <Image src="/volus_logo.svg" alt="Volus" width={72} height={52} priority />
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-0.5">
          {dropdownSections.map((section) => (
            <div className="relative group" key={section.title}>
              <button className="px-3.5 py-2 text-[13px] font-medium text-gray-400 hover:text-white rounded-lg transition-colors duration-200 flex items-center gap-1.5">
                {section.title}
                <svg
                  className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 top-full mt-3 w-80 bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
                <div className="p-2">
                  {section.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="block p-3.5 rounded-xl hover:bg-white/5 transition-all duration-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white">{link.label}</p>
                          <p className="text-xs text-gray-400">{link.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="px-4 py-3 bg-white/5 border-t border-white/10">
                  <Link
                    href={section.title === "Platform" ? "/demo" : section.links[0]?.href || "/"}
                    className="text-xs text-indigo-300 hover:text-indigo-200 font-medium flex items-center gap-1"
                  >
                    View all {section.title.toLowerCase()}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          <a
            href="#pricing"
            className="px-3.5 py-2 text-[13px] font-medium text-gray-400 hover:text-white rounded-lg transition-colors duration-200"
          >
            Pricing
          </a>
        </div>

        {desktopActions}

        <Button
          size="icon"
          variant="outline"
          onClick={() => setOpen((prev) => !prev)}
          className="md:hidden border-white/20 hover:bg-white/5"
          aria-label="Toggle menu"
        >
          <MenuToggleIcon open={open} className="size-5 text-gray-300" duration={300} />
        </Button>
      </nav>

      {open && menuAnchor &&
        createPortal(
          <div className="fixed inset-0 top-16 z-40 md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
            <div className="h-full w-full flex flex-col">
              <div className="flex-1 p-6 pb-4 overflow-y-auto">
                <div className="grid gap-6">
                  {dropdownSections.map((section) => (
                    <div className="space-y-2" key={`mobile-${section.title}`}>
                      <h3 className="text-xs font-semibold text-cyan-400/80 uppercase tracking-wider mb-3 px-1">
                        {section.title}
                      </h3>
                      <div className="space-y-1.5">
                        {section.links.map((link) => (
                          <Link
                            key={link.label}
                            href={link.href}
                            className="block rounded-xl p-3 hover:bg-white/5"
                            onClick={() => setOpen(false)}
                          >
                            <p className="text-sm font-semibold text-white">{link.label}</p>
                            <p className="text-xs text-gray-400">{link.description}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Link
                    href="#pricing"
                    className="block rounded-xl p-3 hover:bg-white/5"
                    onClick={() => setOpen(false)}
                  >
                    <p className="text-sm font-semibold text-white">Pricing</p>
                    <p className="text-xs text-gray-400">Compare plans</p>
                  </Link>
                </div>
              </div>
              <div className="flex-shrink-0 p-6 pt-4 border-t border-white/10 bg-black/40">
                {isAuthenticated ? (
                  <div className="flex flex-col gap-3">
                    <Link href="/user-dashboard" onClick={() => setOpen(false)}>
                      <Button className="w-full cursor-pointer  bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                        Open dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full border-white/20 text-white"
                      onClick={() => {
                        setOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                    >
                      Sign out
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link href="/signin" onClick={() => setOpen(false)}>
                      <Button variant="outline" className="w-full border-white/20 text-white">
                        Sign in
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={() => setOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                        Start free trial
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>,
          menuAnchor
        )}
    </header>
  );
}
