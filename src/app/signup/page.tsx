'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AnimatedTextBackground } from '@/app/ui/random/animated-text-background';
import { signIn } from 'next-auth/react';
import Image from 'next/image';


export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    setSuccessMessage('');
    try {
      await signIn('google', { callbackUrl: '/user-dashboard' });
    } catch (error) {
      console.error('Google sign in error:', error);
      setError('Failed to sign in with Google');
    }
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!agreeToTerms) {
      setError('Please agree to the terms and conditions');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      // Create account
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create account');
        setIsLoading(false);
        return;
      }

      setSuccessMessage(
        data.message ||
          'Account created. Please check your email inbox to verify your account before signing in.'
      );
      setFormData({
        fullName: '',
        email: '',
        company: '',
        password: '',
        confirmPassword: '',
      });
      setAgreeToTerms(false);
      setIsLoading(false);
    } catch (error) {
      console.error('Sign up error:', error);
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 relative overflow-hidden">
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

      {/* Sign Up Form */}
      <div className="relative z-10 w-full max-w-md mt-16 sm:mt-0">
        <div className="bg-zinc-900/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/40 p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Start your free trial</h1>
            <p className="text-xs sm:text-sm text-gray-400">No credit card required • 14-day trial</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-sm text-emerald-400">{successMessage}</p>
            </div>
          )}

          {/* Social Sign Up */}
          <div className="space-y-3 mb-6">
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              variant="outline"
              className="w-full h-10 sm:h-11 text-sm cursor-pointer bg-white/[0.05] hover:bg-white/[0.08] border-white/[0.08] text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="w-full h-10 sm:h-11 text-sm cursor-pointer bg-white/[0.05] hover:bg-white/[0.08] border-white/[0.08] text-white rounded-lg transition-all duration-200"
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
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full h-10 sm:h-11 px-3 sm:px-4 text-sm bg-white/[0.05] border border-white/[0.08] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
                placeholder="Example Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                Work email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full h-10 sm:h-11 px-3 sm:px-4 text-sm bg-white/[0.05] border border-white/[0.08] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                Company name
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full h-10 sm:h-11 px-3 sm:px-4 text-sm bg-white/[0.05] border border-white/[0.08] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
                placeholder="Example Inc."
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full h-10 sm:h-11 px-3 sm:px-4 text-sm bg-white/[0.05] border border-white/[0.08] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full h-10 sm:h-11 px-3 sm:px-4 text-sm bg-white/[0.05] border border-white/[0.08] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
                placeholder="••••••••"
              />
            </div>

            {/* Terms Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  required
                  className="w-4 h-4 mt-0.5 rounded border-white/[0.08] bg-white/[0.05] text-indigo-600 focus:ring-2 focus:ring-indigo-500/50 cursor-pointer flex-shrink-0"
                />
                <span className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  I agree to the{' '}
                  <Link href="/terms" className="text-indigo-400 hover:text-indigo-300">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-indigo-400 hover:text-indigo-300">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 sm:h-11 cursor-pointer relative text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-0 rounded-lg shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">{isLoading ? 'Creating account...' : 'Start free trial'}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="mt-5 sm:mt-6 text-center">
            <p className="text-xs sm:text-sm text-gray-400">
              Already have an account?{' '}
              <Link href="/signin" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Features List */}
        <div className="mt-6 sm:mt-8 space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400">
            <div className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>14-day free trial, no credit card required</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400">
            <div className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>Full access to all features</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400">
            <div className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>Cancel anytime, no questions asked</span>
          </div>
        </div>
      </div>
    </div>
  );
}
