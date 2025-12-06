import React from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import OnboardingCarousel from '../components/OnboardingCarousel';

export default function Login() {
  const { login, loading } = useAuth();
  const nav = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data);
      nav('/');
    } catch {}
  };

  return (
    <div className="flex min-h-[calc(100vh-56px)] items-center justify-center px-4 py-8">
      <div className="flex w-full max-w-5xl gap-6">
        <OnboardingCarousel />
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg shadow-slate-200">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Welcome back
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Log in to see your latest spending.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-6 space-y-4"
            >
              <div>
                <label className="text-xs font-medium text-slate-700">
                  Email
                </label>
                <input
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-0 focus:border-slate-400"
                  placeholder="you@example.com"
                  {...register('email', { required: true })}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-0 focus:border-slate-400"
                  placeholder="••••••••"
                  {...register('password', { required: true })}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-full bg-slate-900 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <p className="mt-4 text-xs text-slate-500">
              New here?{' '}
              <Link
                to="/signup"
                className="font-medium text-slate-900 hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
