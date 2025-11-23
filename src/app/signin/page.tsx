'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AnimatedTextBackground } from '@/app/ui/random/animated-text-background';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/user-dashboard';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [showResend, setShowResend] = useState(false);
  const [isResendLoading, setIsResendLoading] = useState(false);

  useEffect(() => {
    const status = searchParams.get('status');
    const subscriptionError = searchParams.get('subscription');

    if (status === 'verified') {
      if (subscriptionError === 'failed') {
        setInfoMessage(
          'Your email is verified, but we could not provision the free trial. Please contact support.'
        );
      } else {
        setInfoMessage('Email verified successfully. You can sign in now.');
      }
    } else if (status === 'expired') {
      setError('Your verification link has expired. Please request a new one.');
      setShowResend(true);
    } else if (status === 'invalid') {
      setError('The verification link is invalid or has already been used.');
    } else if (status === 'missing') {
      setError('Verification token missing. Please open the link directly from your email.');
    }
  }, [searchParams]);

  const handleGoogleSignIn = async () => {
  setIsLoading(true);
  setError('');
  setInfoMessage('');
  setShowResend(false);
    try {
      await signIn('google', { callbackUrl });
    } catch (error) {
      console.error('Google sign in error:', error);
      setError('Failed to sign in with Google');
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        const errorMessage = result.error;

        if (
          errorMessage === 'EMAIL_NOT_VERIFIED' ||
          errorMessage?.toLowerCase().includes('verify')
        ) {
          setError('Please verify your email before signing in.');
          setShowResend(true);
        } else {
          setError('Invalid email or password');
        }

        setIsLoading(false);
        return;
      }

      if (result?.ok) {
        setIsLoading(false);
        router.push(callbackUrl);
        return;
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      setError('Enter your email address to resend verification.');
      return;
    }

    setIsResendLoading(true);
    setError('');
    setInfoMessage('');

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Unable to resend verification email.');
      } else {
        setInfoMessage(data.message || 'Verification email sent.');
        setShowResend(false);
      }
    } catch (resendError) {
      console.error('Resend verification error:', resendError);
      setError('Unable to resend verification email. Please try again.');
    } finally {
      setIsResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-0 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black" />
      
      {/* VOLUS Text Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <AnimatedTextBackground text="VOLUS" />
      </div>

      {/* Logo */}
      <Link href="/" className="absolute top-4 sm:top-8 left-4 sm:left-8 flex items-center gap-2 sm:gap-2.5 group z-20">
        <Image
          src="/volus_logo.svg"
          alt="Volus AI Official Logo"
          width={120}
          height={92}
        />
      </Link>

      {/* Sign In Form */}
      <div className="relative z-10 w-full max-w-md mt-16 sm:mt-0">
        <div className="bg-zinc-900/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/40 p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Welcome back</h1>
            <p className="text-xs sm:text-sm text-gray-400">Sign in to your account to continue</p>
          </div>

          {infoMessage && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-sm text-emerald-400">{infoMessage}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-400">{error}</p>
              {showResend && (
                <button
                  type="button"
                  onClick={handleResendVerification}
                  disabled={isResendLoading}
                  className="mt-3 text-xs cursor-pointer text-indigo-300 hover:text-indigo-200 underline underline-offset-4 disabled:opacity-50"
                >
                  {isResendLoading ? 'Resending...' : 'Resend verification email'}
                </button>
              )}
            </div>
          )}

          {/* Social Sign In */}
          <div className="space-y-3 mb-6">
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              variant="outline"
              className="w-full h-10 sm:h-11 cursor-pointer text-sm bg-white/[0.05] hover:bg-white/[0.08] border-white/[0.08] text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
            <Button
                variant="outline"
                className="w-full h-10 sm:h-11 cursor-pointer text-sm bg-white/[0.05] hover:bg-white/[0.08] border-white/[0.08] text-white rounded-lg transition-all duration-200"
                >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                Continue with Apple
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.08]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-zinc-900 px-3 text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-10 sm:h-11 px-3 sm:px-4 text-sm bg-white/[0.05] border border-white/[0.08] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-10 sm:h-11 px-3 sm:px-4 text-sm bg-white/[0.05] border border-white/[0.08] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
                placeholder="••••••••"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/[0.08] bg-white/[0.05] text-indigo-600 focus:ring-2 focus:ring-indigo-500/50 cursor-pointer"
                />
                <span className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  Remember me
                </span>
              </label>
              <Link
                href="/forgot-password"
                className="text-xs sm:text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 sm:h-11 cursor-pointer relative text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-0 rounded-lg shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">{isLoading ? 'Signing in...' : 'Sign in'}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-5 sm:mt-6 text-center">
            <p className="text-xs sm:text-sm text-gray-400">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                Start free trial
              </Link>
            </p>
          </div>
        </div>

        {/* Terms */}
        <p className="text-center text-[10px] sm:text-xs text-gray-500 mt-4 sm:mt-6 px-4">
          By signing in, you agree to our{' '}
          <Link href="/terms" className="text-gray-400 hover:text-gray-300 transition-colors">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-gray-400 hover:text-gray-300 transition-colors">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    }>
      <SignInContent />
    </Suspense>
  );
}
