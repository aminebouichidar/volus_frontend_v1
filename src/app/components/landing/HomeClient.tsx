"use client"


import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { ShoppingCart, MessageSquare, Youtube, Newspaper, Activity, Brain } from 'lucide-react';
import { HeroSection } from './HeroSection';
import RobotSection from './Robot';
import Footer from '../Footer';
import PricingSection from './PricingSection';
import { GradientCard } from './GradientCard';
import { HeroScrollImages } from '@/app/ui/scrolling/StickyScrollReveal';

// Predictive & Sentiment Analysis Scene
const Scene3D = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#8b5cf6" />
      <pointLight position={[5, 5, 0]} intensity={1} color="#06b6d4" />
      <pointLight position={[-5, -5, -2]} intensity={0.8} color="#4f46e5" />
      
      <Environment preset="city" />
    </>
  );
};


// Main Component
const ProductSentimentLanding = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-900/40 to-black"></div>
        
        {/* 3D Canvas Background */}
        <Canvas className="absolute inset-0 opacity-60" camera={{ position: [0, 0, 11], fov: 55 }}>
          <Suspense fallback={null}> 
            <Scene3D />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
          </Suspense>
        </Canvas>
        
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-transparent via-indigo-900/10 to-transparent"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        />
      </div>


      {/* Hero Section */}
        <HeroSection />


      <RobotSection />


      {/* Data Sources Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                The model That Understands Every Signal
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We ingest marketplace listings, creator chatter, search intent, community threads, and service telemetry to deliver fast answers and forward guidance.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-72 bg-gradient-to-b from-violet-600/20 via-indigo-500/10 to-transparent blur-3xl" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-cyan-400/20 via-indigo-500/10 to-transparent blur-3xl" />
            </div>
            <div
              className="absolute inset-0 -z-20 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(129, 140, 248, 0.25) 0, transparent 40%), radial-gradient(circle at 80% 0%, rgba(14, 165, 233, 0.2) 0, transparent 45%), linear-gradient(120deg, rgba(79, 70, 229, 0.08) 0%, transparent 55%)'
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Marketplace Radar',
                  description: 'Scrape and normalize product performance across Amazon, eBay, Target, and other marketplaces to expose velocity and stock health.',
                  icon: <ShoppingCart className="w-5 h-5" />
                },
                {
                  title: 'Social Pulse',
                  description: 'Monitor sentiment swings and creator impact across TikTok, Instagram, X, and emerging channels in near real time.',
                  icon: <MessageSquare className="w-5 h-5" />
                },
                {
                  title: 'Video & Search Lens',
                  description: 'Decode how audiences talk and search on YouTube, Google, and Pinterest to understand upstream demand drivers.',
                  icon: <Youtube className="w-5 h-5" />
                },
                {
                  title: 'Community & Press Watch',
                  description: 'Track Reddit threads, specialist forums, and news coverage to capture early warning signals and thought-leader narratives.',
                  icon: <Newspaper className="w-5 h-5" />
                },
                {
                  title: 'Experience Operations',
                  description: 'Blend returns, support tickets, and warranty activity to explain the operational story behind the sentiment curve.',
                  icon: <Activity className="w-5 h-5" />
                },
                {
                  title: 'Forecast Engine',
                  description: 'Project medium and long-term demand trajectories with our model tuned on historical signals and benchmarks.',
                  icon: <Brain className="w-5 h-5" />
                }
              ].map((item, index) => (
                <div key={item.title}>
                  <GradientCard {...item} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      <PricingSection />


       <HeroScrollImages
        title="Step into the Future"
        subtitle="Real-Time Analytics"
        meta="Q4 • 2025" 
        credits={
          <>
            <p>Powered by advanced AI models and multi-platform data aggregation</p>
          </>
        }
        scrollHeightVh={120}
        initialBoxSize={320}
        overlayRevealDelay={0.2}
        images={[
          {
            src: 'https://images.unsplash.com/photo-1713461983836-de0a45009424?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Product Forecasting',
            description: 'Visualize demand patterns and predict market trends with our AI model, analyzing historical signals across all major marketplaces and social platforms.',
            caption: '01 • FORECASTING'
          },
          {
            src: 'https://images.unsplash.com/photo-1665690399857-9de8bbbeb108?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Volus AI Engine',
            description: 'Deep learning architecture processing millions of data points in real-time, connecting sentiment analysis with product performance to deliver actionable insights.',
            caption: '02 • AI ENGINE'
          },
          {
            src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Sentiment Analysis',
            description: 'Monitor real-time sentiment across social media, YouTube, Reddit, Amazon and news sources. Track brand perception, product reception, and emerging narratives as they unfold.',
            caption: '03 • ANALYTICS'
          }
        ]}      
        />
      <section style={{ minHeight: "20vh" }} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductSentimentLanding;