'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type PlaceholdersAndVanishInputProps = {
  placeholders: string[];
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
};

type PixelPoint = {
  x: number;
  y: number;
  r: number;
  color: string;
};

export function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  onSubmit,
  className,
  inputClassName,
  buttonClassName,
}: PlaceholdersAndVanishInputProps) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [value, setValue] = useState('');
  const [animating, setAnimating] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const newDataRef = useRef<PixelPoint[]>([]);

  const clearIntervalRef = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startPlaceholderRotation = useCallback(() => {
    if (!placeholders.length) return;
    clearIntervalRef();
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3200);
  }, [clearIntervalRef, placeholders]);

  useEffect(() => {
    startPlaceholderRotation();
    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'visible') {
        clearIntervalRef();
      } else {
        startPlaceholderRotation();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      clearIntervalRef();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [clearIntervalRef, startPlaceholderRotation]);

  const draw = useCallback((text?: string) => {
    const canvas = canvasRef.current;
    const input = inputRef.current;
    if (!canvas || !input) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 200;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const computedStyles = getComputedStyle(input);
    const fontSize = parseFloat(computedStyles.getPropertyValue('font-size'));
    ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
    ctx.fillStyle = '#FFFFFF';
    const renderText = text ?? value;
    ctx.fillText(renderText, 24, 72);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixelData = imageData.data;
    const points: PixelPoint[] = [];

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const index = (y * canvas.width + x) * 4;
        const r = pixelData[index];
        const g = pixelData[index + 1];
        const b = pixelData[index + 2];
        const a = pixelData[index + 3];
        if (a !== 0 && (r !== 0 || g !== 0 || b !== 0)) {
          points.push({
            x,
            y,
            r: 1,
            color: `rgba(${r}, ${g}, ${b}, ${a / 255})`,
          });
        }
      }
    }

    newDataRef.current = points;
  }, [value]);

  useEffect(() => {
    draw();
  }, [draw]);

  const animate = (start: number) => {
    const animateFrame = (position = start) => {
      requestAnimationFrame(() => {
        const nextPoints: PixelPoint[] = [];
        for (let i = 0; i < newDataRef.current.length; i++) {
          const point = newDataRef.current[i];
          if (point.x < position) {
            nextPoints.push(point);
          } else {
            if (point.r <= 0) continue;
            point.x += Math.random() > 0.5 ? 1 : -1;
            point.y += Math.random() > 0.5 ? 1 : -1;
            point.r -= 0.05 * Math.random();
            nextPoints.push(point);
          }
        }
        newDataRef.current = nextPoints;
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
          ctx.clearRect(position, 0, 800, 200);
          newDataRef.current.forEach(({ x, y, r, color }) => {
            if (x > position) {
              ctx.beginPath();
              ctx.rect(x, y, r, r);
              ctx.fillStyle = color;
              ctx.fill();
            }
          });
        }
        if (newDataRef.current.length > 0) {
          animateFrame(position - 6);
        } else {
          setValue('');
          onChange?.('');
          setAnimating(false);
        }
      });
    };
    animateFrame(start);
  };

  const vanishAndSubmit = (text: string) => {
    if (!inputRef.current) return;
    setAnimating(true);
    draw(text);

    const submittedValue = text;
    if (submittedValue) {
      const maxX = newDataRef.current.reduce((prev, current) => (current.x > prev ? current.x : prev), 0);
      animate(maxX);
    } else {
      setAnimating(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !animating) {
      event.preventDefault();
      submitCurrentValue();
    }
  };

  const submitCurrentValue = () => {
    if (animating) return;
    const submittedValue = inputRef.current?.value.trim() ?? '';
    if (!submittedValue) return;
    if (inputRef.current) {
      inputRef.current.value = submittedValue;
    }
    setValue(submittedValue);
    onSubmit?.(submittedValue);
    vanishAndSubmit(submittedValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitCurrentValue();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'relative h-12 w-full overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] px-3 shadow-[0_20px_40px_-24px_rgba(15,23,42,0.75)] backdrop-blur-sm transition-colors duration-200',
        value && 'border-indigo-400/60 bg-white/[0.08]',
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        className={cn(
          'pointer-events-none absolute left-3 top-1/2 h-24 w-[500px] -translate-y-1/2 scale-50 transform text-sm opacity-0 filter invert',
          animating && 'opacity-100',
        )}
      />
      <input
        ref={inputRef}
        type="email"
        value={value}
        onChange={(event) => {
          if (animating) return;
          const nextValue = event.target.value;
          setValue(nextValue);
          onChange?.(nextValue);
        }}
        onKeyDown={handleKeyDown}
        className={cn(
          'h-full w-full bg-transparent text-sm text-white placeholder-transparent outline-none transition-all sm:text-base',
          animating && 'text-transparent',
          inputClassName,
        )}
        autoComplete="email"
        aria-label="Email address"
      />
      <button
        type="submit"
        disabled={!value || animating}
        className={cn(
          'absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white transition hover:from-indigo-600 hover:to-blue-600 disabled:cursor-not-allowed disabled:opacity-40',
          buttonClassName,
        )}
        aria-label="Submit email"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <motion.path
            d="M5 12h14"
            initial={{ strokeDasharray: '50%', strokeDashoffset: '50%' }}
            animate={{ strokeDashoffset: !value ? '50%' : 0 }}
            transition={{ duration: 0.3, ease: 'linear' }}
          />
          <path d="M13 18l6-6" />
          <path d="M13 6l6 6" />
        </motion.svg>
      </button>
      <div className="pointer-events-none absolute inset-0 flex items-center rounded-full px-4">
        <AnimatePresence mode="wait">
          {!value && placeholders.length > 0 && (
            <motion.p
              key={`placeholder-${currentPlaceholder}`}
              initial={{ y: 6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'linear' }}
              className="w-[calc(100%-3rem)] truncate text-sm text-gray-400 sm:text-base"
            >
              {placeholders[currentPlaceholder]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
