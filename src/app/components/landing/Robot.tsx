import React, { Suspense, useEffect, useState } from 'react';
import { lazy } from 'react'; 
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Sparkles, BarChart3, Calendar } from 'lucide-react';
import DotLoaderMain from '../loading/DotLoaderMain';
import SmoothCounter from './SmoothCounter';

// Change this line to match the working pattern
const Spline = lazy(() => import('@splinetool/react-spline'));



const RealTimePredictionsCounter = () => {
  // Always start with default value to avoid hydration errors
  const [predictions, setPredictions] = useState(100);
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage after component mounts
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('predictionsCounterValue');
    if (stored) {
      setPredictions(parseInt(stored, 10));
    }
  }, []);

  // Store value in localStorage whenever predictions changes (only after mounted)
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('predictionsCounterValue', predictions.toString());
    }
  }, [predictions, mounted]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPredictions(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 1200); // Slower updates

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute -bottom-4 right-4 bg-gray-900/80 border border-gray-700 rounded-lg p-4 px-6 backdrop-blur-sm">
      <div className="text-xs text-gray-400 flex items-center gap-1">
        Forecast Updates
        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
      </div>
      <div className="text-xl font-bold text-indigo-300 font-mono tracking-wider">
        <SmoothCounter targetValue={predictions} duration={800} />
      </div>
    </div>
  );
};



export default function RobotSection() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const timeframeOptions = [
    { value: '1-week', label: 'Next Week', description: '7 days forecast' },
    { value: '3-weeks', label: 'Next 3 Weeks', description: '21 days analysis' },
    { value: '1-month', label: 'Next Month', description: '30 days projection' },
    { value: '3-months', label: 'Next Quarter', description: '90 days trend' },
    { value: '6-months', label: 'Next 6 Months', description: 'Long-term outlook' }
  ];

  const handleGenerateReport = async () => {
    if (!selectedTimeframe) return;
    
    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    
    // Here you would typically trigger your actual report generation
  console.log(`Generating forecast window: ${selectedTimeframe}`);
  };

  return (
    <div className="min-h-screen -mt-[530px] md:-mt-44 bg-black relative overflow-hidden">
    {/* Animated background elements */}
    <div className="absolute inset-0 bg-gradient-to-r from-black via-purple-900/20  to-black" />
     <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20  to-black" />

      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-screen">
          
          {/* Left side - Controls */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="border-purple-500 text-purple-300 bg-purple-500/10 backdrop-blur-sm">
                <Sparkles className="w-3 h-3 mr-1" />
                Forecast Studio
              </Badge>

              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-indigo-300 bg-clip-text text-transparent leading-tight">
                Plan With Confidence
                <br />
                <span className="text-purple-400">Before The Market Shifts</span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed max-w-md">
                Our AI model unifies historical orders, live sentiment, competitor velocity, and macro signals to deliver forecasts from next week to the next two quarters.
              </p>
            </div>

            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Select Forecast Horizon
                  </label>
                  
                  <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                    <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white focus:border-purple-500 focus:ring-purple-500/20">
                      <SelectValue placeholder="Choose your forecast period" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      {timeframeOptions.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                          className="focus:bg-purple-900/50 focus:text-white text-gray-300"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{option.label}</span>
                            <span className="text-xs text-gray-400">{option.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleGenerateReport}
                  disabled={!selectedTimeframe || isGenerating}
                  className="w-full bg-gradient-to-r cursor-pointer from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isGenerating ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Generating Forecast...
                    </div>
                  ) : (
                    <div className="flex cursor-pointer items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Generate Forecast
                    </div>
                  )}
                </Button>

                {selectedTimeframe && (
                  <div className="p-4 bg-purple-900/20 border border-purple-700/30 rounded-lg">
                    <div className="flex items-center gap-2 text-purple-300">
                      <BarChart3 className="w-4 h-4" />
                      <span className="text-sm font-medium">Selected: {timeframeOptions.find(opt => opt.value === selectedTimeframe)?.label}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {timeframeOptions.find(opt => opt.value === selectedTimeframe)?.description}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Prediction Engine Active
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  Signal Streams Live
                </div>
              </div>
              <div className="rounded-lg border border-purple-700/40 bg-purple-900/10 p-4 text-sm text-purple-100 leading-relaxed">
                <div className="flex items-start gap-3">
                  <BarChart3 className="mt-1 h-4 w-4 text-purple-300" />
                  <span>Forecast output ships with channel level demand curves, anomaly alerts, and recommended interventions so revenue, supply, and support stay coordinated.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - 3D Robot */}
          <div className="relative">
            <div className="relative h-[600px] lg:h-[700px] rounded-2xl overflow-hidden border border-gray-800/50 bg-gradient-to-br from-gray-900/50 to-purple-900/20 backdrop-blur-sm">
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 z-20">
                <Badge className="bg-green-500/20 text-green-300 border-green-500/50">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 animate-pulse" />
                  Online
                </Badge>
              </div>
              

              {/* Spline Robot - Updated with inline styles like the working version */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                pointerEvents: 'auto',
                overflow: 'hidden',
              }}>
            <Suspense fallback={<DotLoaderMain />}>
                <Spline 
                  style={{
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'auto',
                  }}
                  scene="https://prod.spline.design/bLnha4wTcF8HSDDh/scene.splinecode"
                />
            </Suspense>
              </div>

              {/* Overlay gradient for better integration */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating stats */}
            <div className="absolute  -top-6 -left-3 bg-gray-900/80 border border-gray-700 rounded-lg p-3 backdrop-blur-sm">
              <div className="text-xs text-gray-400">Signal Confidence</div>
              <div className="text-xl font-bold text-purple-300">96.7%</div>
            </div>

            <RealTimePredictionsCounter />
          </div>
        </div>
      </div>
    </div>
  );
}