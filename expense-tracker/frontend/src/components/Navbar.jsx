import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { FiHome, FiLogOut, FiLogIn, FiUserPlus } from 'react-icons/fi';

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const onLogout = () => {
    logout();
    nav('/login');
  };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="inline-flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <FiHome className="text-lg" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-slate-900">
            SmartExpense
          </span>
        </Link>

        <div className="flex items-center gap-4 text-sm">
          {user ? (
            <>
              <span className="hidden text-slate-600 sm:inline">
                Hi, <span className="font-semibold">{user.name}</span>
              </span>
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
              >
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-slate-900"
              >
                <FiLogIn /> Login
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
              >
                <FiUserPlus /> Signup
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
