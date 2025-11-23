'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useMemo } from 'react';
import { Button } from '@/components/ui/button';

const statusCopy: Record<string, { title: string; description: string; variant: 'success' | 'error' | 'info' }> = {
  verified: {
    title: 'Email verified successfully',
    description: 'Your Volus AI account is now active. You can sign in to start your free trial.',
    variant: 'success',
  },
  expired: {
    title: 'Verification link expired',
    description: 'The verification link has expired. Request a new verification email from the sign-in page.',
    variant: 'error',
  },
  invalid: {
    title: 'Invalid verification link',
    description: 'The verification link is invalid or has already been used. Request a new verification email from the sign-in page.',
    variant: 'error',
  },
  missing: {
    title: 'Verification token missing',
    description: 'Please open the verification link directly from the email we sent you.',
    variant: 'error',
  },
  error: {
    title: 'Something went wrong',
    description: 'We could not verify your email. Please try again or contact support if the issue persists.',
    variant: 'error',
  },
};

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status') ?? 'verified';
  const subscriptionStatus = searchParams.get('subscription');

  const copy = useMemo(() => statusCopy[status] ?? statusCopy.error, [status]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-indigo-500/10 space-y-6 text-center">
        <div
          className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
            copy.variant === 'success'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-400/40'
              : 'bg-red-500/10 text-rose-400 border border-rose-400/40'
          }`}
        >
          {copy.variant === 'success' ? '✅' : '⚠️'}
        </div>

        <div>
          <h1 className="text-2xl font-semibold mb-2">{copy.title}</h1>
          <p className="text-sm text-gray-400">{copy.description}</p>
          {subscriptionStatus === 'failed' && (
            <p className="text-xs text-amber-300 mt-3">
              We verified your email but could not start the free trial automatically. Please contact support so we can activate it for you.
            </p>
          )}
        </div>

        <div className="space-y-3">
          {copy.variant === 'success' ? (
            <Button asChild className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500">
              <Link href="/signin">Continue to sign in</Link>
            </Button>
          ) : (
            <>
              <Button
                asChild
                variant="outline"
                className="w-full bg-white/5 hover:bg-white/10 border-white/10"
              >
                <Link href="/signin">Back to sign in</Link>
              </Button>
              <p className="text-xs text-gray-500">
                Need help? <a href="mailto:support@volus.ai" className="text-indigo-300 hover:text-indigo-200">Contact support</a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
