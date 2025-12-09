'use client';

import { useMemo, useState } from 'react';
import { Loader2, SendHorizontal, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VolusTetrisLoader } from './VolusTetrisLoader';
import { LockedTile } from '@/components/ui/locked-tile';
import { hasPlanAccess, PlanTier, planLabel } from '@/lib/plan-tiers';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const starterPrompts = [
  'Give me a launch checklist for a new TikTok Shop product',
  'Explain how pricing recommendations are generated',
  'What happens if I exceed my tracked product limit?',
  'How do I pull extra social proof using the request buttons?'
];

type MessageBlock =
  | { type: 'heading'; content: string }
  | { type: 'paragraph'; content: string }
  | { type: 'list'; content: string[] };

const normalizeAssistantText = (text: string) =>
  text
    .replace(/-\s+/g, '\n- ')
    .replace(/([.!?])\s*(\*\*)/g, '$1\n$2')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

const buildBlocks = (text: string): MessageBlock[] => {
  const normalized = normalizeAssistantText(text);
  const lines = normalized
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const blocks: MessageBlock[] = [];
  let currentList: string[] = [];

  lines.forEach((line) => {
    if (line.startsWith('- ')) {
      currentList.push(line.slice(2).trim());
      return;
    }

    if (currentList.length) {
      blocks.push({ type: 'list', content: currentList });
      currentList = [];
    }

    const headingMatch = line.match(/^\*\*(.+)\*\*$/);
    if (headingMatch) {
      blocks.push({ type: 'heading', content: headingMatch[1] });
    } else {
      blocks.push({ type: 'paragraph', content: line });
    }
  });

  if (currentList.length) {
    blocks.push({ type: 'list', content: currentList });
  }

  return blocks;
};

const renderInline = (text: string) =>
  text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((segment, index) => {
      if (segment.startsWith('**') && segment.endsWith('**')) {
        return (
          <span key={index} className="font-semibold text-white">
            {segment.slice(2, -2)}
          </span>
        );
      }
      return <span key={index}>{segment}</span>;
    });

function MessageContent({ text }: { text: string }) {
  const blocks = useMemo(() => buildBlocks(text), [text]);

  return (
    <div className="space-y-3 text-sm leading-relaxed text-gray-200">
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          return (
            <p key={`heading-${index}`} className="text-sm tracking-wide uppercase text-indigo-200">
              {renderInline(block.content)}
            </p>
          );
        }

        if (block.type === 'list') {
          return (
            <ul key={`list-${index}`} className="list-disc space-y-1 pl-5 text-slate-100">
              {block.content.map((item, itemIndex) => (
                <li key={`list-${index}-${itemIndex}`}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={`paragraph-${index}`}>{renderInline(block.content)}</p>
        );
      })}
    </div>
  );
}

type AssistantProps = {
  planTier?: PlanTier;
};

export function HelpAssistant({ planTier = 'starter' }: AssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hey! I'm the Volus AI help co-pilot. Ask me anything about plans, billing, product insights, or automation workflows.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const conversationHistory = useMemo(() => messages.slice(-8), [messages]);

  const unlockedPro = hasPlanAccess(planTier, 'pro');
  const unlockedEnterprise = hasPlanAccess(planTier, 'enterprise');
  const turnLimit = unlockedPro ? 30 : 6;
  const isCapped = messages.filter((m) => m.role === 'user').length >= turnLimit;
  const lockedLabel = unlockedPro ? 'Unlimited concierge' : 'Pro unlocks longer threads';

  const sendMessage = async (text?: string) => {
    const payload = (text ?? input).trim();
    if (!payload) return;

    setError('');
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: payload }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/help-center/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: payload,
          conversationHistory: [...conversationHistory, { role: 'user', content: payload }],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to reach help assistant');
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.reply ?? 'I could not find the answer in the help docs, please email support@volus.ai.',
        },
      ]);
    } catch (err) {
      console.error(err);
      setError('Unable to reach the help assistant. Please try again or email support@volus.ai.');
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'I hit an issue reaching the AI service. Please retry in a moment or email support@volus.ai.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mt-16 bg-gradient-to-b from-zinc-900/80 via-slate-950/70 to-black border border-white/5 rounded-3xl p-6 md:p-10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[480px] h-[480px] bg-indigo-600/20 blur-[120px]" />
      </div>
      <div className="relative z-10 flex flex-col lg:flex-row gap-10">
        <div className="lg:w-1/3 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs uppercase tracking-[0.3em] text-indigo-200/70 bg-indigo-500/10 rounded-full">
            <Sparkles className="w-4 h-4" />
            Live AI agent
          </div>
          <h3 className="text-3xl font-semibold text-white">Ask the Volus AI concierge</h3>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white">
            Plan: {planLabel(planTier)} {unlockedEnterprise ? '• priority routing' : ''}
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            The assistant runs on-prem and is grounded in the same documentation our success team uses. It can troubleshoot flows, explain features, or escalate to a human teammate.
          </p>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-gray-400">Sample prompts</p>
            <div className="grid gap-2">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="text-left cursor-pointer text-sm text-indigo-200 bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:border-indigo-400/40 hover:text-white transition"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
          <div className="text-sm text-gray-400 border border-white/5 rounded-xl p-4">
            <p className="font-medium text-white mb-1">Need a human?</p>
            <p>Email <a href="mailto:support@volus.ai" className="text-indigo-300 underline">support@volus.ai</a> or ping us inside the dashboard chat within your SLA.</p>
          </div>
        </div>

        <div className="lg:flex-1">
          <div className="bg-black/40 border border-white/5 rounded-2xl h-[520px] flex flex-col relative overflow-hidden">
            <div className="flex-1 overflow-y-auto space-y-4 p-5 relative z-10">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={message.role === 'assistant' ? 'text-white/90' : 'text-indigo-200'}
                >
                  <div className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-1">
                    {message.role === 'assistant' ? 'Volus AI' : 'You'}
                  </div>
                  <div
                    className={
                      message.role === 'assistant'
                        ? 'bg-white/5 border border-white/10 rounded-2xl p-4 shadow-[0_0_35px_rgba(99,102,241,0.18)]'
                        : 'bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-4'
                    }
                  >
                    {message.role === 'assistant' ? (
                      <MessageContent text={message.content} />
                    ) : (
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="absolute inset-0 rounded-2xl bg-black/80 backdrop-blur-md flex items-center justify-center">
                  <VolusTetrisLoader />
                </div>
              )}
            </div>
            {error && (
              <div className="px-5 pb-2 text-sm text-red-300">{error}</div>
            )}
            <LockedTile
              unlocked={!isCapped}
              label={lockedLabel}
              description={unlockedPro ? 'Enterprise gets priority SLA + human handoff' : 'Starter includes 6 turns per thread'}
              upgradeHref="/#pricing"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (isCapped) return;
                  sendMessage();
                }}
                className="border-t border-white/5 p-4 flex gap-2"
              >
                <input
                  className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  placeholder="Ask about plans, features, or troubleshooting..."
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  disabled={isLoading || isCapped}
                />
                <Button
                  type="submit"
                  disabled={isLoading || isCapped}
                  className="rounded-2xl cursor-pointer bg-indigo-500/20 border-2 border-indigo-500/40 hover:bg-indigo-500/30 hover:border-indigo-400/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 px-4 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20"
                  >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <SendHorizontal className="w-4 h-4" />}
                </Button>
              </form>
            </LockedTile>
          </div>
        </div>
      </div>
    </section>
  );
}
