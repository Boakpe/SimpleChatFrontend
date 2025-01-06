import React from 'react';

const LoadingAgent = () => {
  return (
    <div className="flex items-center gap-3 mt-2">
      {/* Animated blocks */}
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <div 
            key={i}
            className="w-1.5 h-1.5 border border-neutral-600 dark:border-neutral-400 animate-[slideUp_1.5s_ease-in-out_infinite]"
            style={{ 
              animationDelay: `${i * 150}ms`,
              backgroundColor: 'transparent'
            }}
          />
        ))}
      </div>
      
      {/* Text */}
      <span className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
        Processing...
      </span>
    </div>
  );
};

// Custom animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideUp {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
`;
document.head.appendChild(style);

export default LoadingAgent;