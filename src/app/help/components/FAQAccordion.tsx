'use client';

import { useState } from 'react';
import { HelpFAQ } from '@/data/help-center';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQAccordionProps {
  faqs: HelpFAQ[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const grouped = faqs.reduce<Record<string, HelpFAQ[]>>((acc, faq) => {
    acc[faq.category] = acc[faq.category] ?? [];
    acc[faq.category].push(faq);
    return acc;
  }, {});

  const [open, setOpen] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="bg-zinc-900/70 border border-white/5 rounded-2xl shadow-lg shadow-black/20">
          <div className="px-6 py-4 border-b border-white/5">
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-300/70">{category}</p>
          </div>
          <div className="divide-y divide-white/5">
            {items.map((faq) => {
              const isOpen = open === faq.id;
              return (
                <div key={faq.id} className="px-2">
                  <button
                    onClick={() => setOpen(isOpen ? null : faq.id)}
                    className="w-full text-left px-4 py-4 focus:outline-none flex items-center justify-between gap-4"
                    aria-expanded={isOpen}
                    aria-controls={`${faq.id}-content`}
                  >
                    <p className="font-medium text-white">{faq.question}</p>
                    <ChevronDown
                      className={cn('h-5 w-5 text-gray-400 transition-transform', isOpen ? 'rotate-180' : '')}
                    />
                  </button>
                  <div
                    id={`${faq.id}-content`}
                    className={cn(
                      'px-4 pb-4 text-sm text-gray-300 transition-[max-height] duration-300 ease-out overflow-hidden',
                      isOpen ? 'max-h-96' : 'max-h-0'
                    )}
                    aria-hidden={!isOpen}
                  >
                    <p>{faq.answer}</p>
                    {faq.linkHref && faq.linkLabel && (
                      <a
                        href={faq.linkHref}
                        className="inline-flex items-center text-indigo-300 hover:text-indigo-100 text-sm mt-3"
                      >
                        {faq.linkLabel}
                        <svg
                          viewBox="0 0 20 20"
                          fill="none"
                          className="w-4 h-4 ml-1"
                        >
                          <path
                            d="M5 10h10m0 0-4-4m4 4-4 4"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
