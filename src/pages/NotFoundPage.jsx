import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, RefreshCw } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Main Container */}
        <div className="border border-neutral-600 bg-neutral-100 dark:bg-neutral-900 relative overflow-hidden">
          {/* Glitch Effect Container */}
          <div className="relative">
            {/* Background Pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Main Content */}
            <div className="p-8 relative">
              {/* Animated 404 Text */}
              <div className="relative font-mono mb-6">
                <div className="text-8xl font-bold text-neutral-900 dark:text-white relative animate-pulse">
                  4
                  <span className="inline-block animate-bounce">0</span>
                  4
                </div>
                <div className="absolute top-0 left-0 text-8xl font-bold text-neutral-900 dark:text-white opacity-20 transform -translate-x-1 translate-y-1">
                  404
                </div>
              </div>

              {/* Message */}
              <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
                Page Not Found
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                The page you're looking for seems to have vanished into the digital void.
                You'll be redirected to home in {countdown} seconds.
              </p>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => navigate('/')}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className="flex items-center gap-2 px-4 py-2 border border-neutral-600 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all"
                >
                  <Home size={18} className={`transition-transform ${isHovering ? '-translate-y-1' : ''}`} />
                  <span>Go Home</span>
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="flex items-center gap-2 px-4 py-2 border border-neutral-600 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800"
                >
                  <RefreshCw size={18} className="animate-spin-slow" />
                  <span>Try Again</span>
                </button>
              </div>
            </div>

            {/* Animated Glitch Lines */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-px w-full bg-neutral-600 dark:bg-neutral-400 opacity-20 animate-glitch-line"
                  style={{
                    top: `${20 * i}%`,
                    animationDelay: `${i * 0.1}s`,
                    transform: `translateY(${Math.sin(i) * 10}px)`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Decorative Border */}
          <div className="absolute inset-0 border border-neutral-600 pointer-events-none">
            <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-neutral-600" />
            <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-neutral-600" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-neutral-600" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-neutral-600" />
          </div>
        </div>

        {/* Error Details */}
        <div className="mt-4 p-4 border border-neutral-600 bg-neutral-100 dark:bg-neutral-900">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <code className="text-xs font-mono text-neutral-600 dark:text-neutral-400">
              Error: Page_Not_Found
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;