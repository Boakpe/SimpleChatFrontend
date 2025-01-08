import React, { useEffect, useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Animated Square component with advanced motion
const AnimatedSquare = ({ index }) => {
  const controls = useAnimation();
  const randomX = useMotionValue(0);
  const randomY = useMotionValue(0);
  const rotate = useTransform(randomX, [0, 200], [0, 360]);
  const size = 20 + Math.random() * 40;

  useEffect(() => {
    const startAnimation = async () => {
      await controls.start({
        y: [100, -100],
        x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
        rotate: [0, 360],
        transition: {
          duration: 15 + Math.random() * 10,
          repeat: Infinity,
          ease: [0.43, 0.13, 0.23, 0.96],
          delay: index * 0.2,
        }
      });
    };
    startAnimation();
  }, [controls, index]);

  return (
    <motion.div
      animate={controls}
      style={{
        width: size,
        height: size,
        x: randomX,
        y: randomY,
        rotate,
        position: 'absolute',
      }}
      className="border border-neutral-600 opacity-20 dark:opacity-10"
    />
  );
};

// Main Grid Animation
const GridAnimation = () => {
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.05,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.1,
      }
    }
  };

  const cellVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <motion.div 
      className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-4"
      variants={gridVariants}
      initial="hidden"
      animate="visible"
    >
      {Array.from({ length: 144 }).map((_, i) => (
        <motion.div
          key={i}
          className="border border-neutral-600"
          variants={cellVariants}
        />
      ))}
    </motion.div>
  );
};

// Corner Decoration Component
const CornerDecoration = ({ position }) => {
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true
  });

  const variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const getClassName = () => {
    const base = "absolute w-8 h-8 border-2 border-neutral-600";
    switch (position) {
      case "top-left": return `${base} top-0 left-0 border-r-0 border-b-0`;
      case "top-right": return `${base} top-0 right-0 border-l-0 border-b-0`;
      case "bottom-left": return `${base} bottom-0 left-0 border-r-0 border-t-0`;
      case "bottom-right": return `${base} bottom-0 right-0 border-l-0 border-t-0`;
      default: return base;
    }
  };

  return (
    <motion.div
      ref={ref}
      className={getClassName()}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    />
  );
};

// Main Title Animation
const AnimatedTitle = ({ text }) => {
  const characters = Array.from(text);
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };
  
  const characterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  };

  return (
    <motion.div 
      className="flex"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {characters.map((char, i) => (
        <motion.span
          key={i}
          variants={characterVariants}
          className="text-8xl font-semibold text-neutral-900 dark:text-white tracking-tight"
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Main Component
const LandingPage = () => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const buttonVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    },
    hover: { 
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated Background Squares */}
      {Array.from({ length: 20 }).map((_, i) => (
        <AnimatedSquare key={i} index={i} />
      ))}

      {/* Grid Animation */}
      <GridAnimation />

      {/* Corner Decorations */}
      <CornerDecoration position="top-left" />
      <CornerDecoration position="top-right" />
      <CornerDecoration position="bottom-left" />
      <CornerDecoration position="bottom-right" />

      {/* Main Content */}
      <motion.div
        ref={ref}
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        <div className="flex flex-col items-center space-y-6">
          {/* Title */}
          <div className="flex items-center space-x-4 mb-8">
            <AnimatedTitle text="IMA CHAT" />
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <span className="text-2xl text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Beta</span>
              <motion.div 
                className="w-2 h-2 bg-green-500 rounded-full ml-2"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.6, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>

          {/* Button */}
          <motion.button
            onClick={() => navigate('/new')}
            className="group relative flex items-center space-x-3 bg-transparent border border-neutral-600 px-6 py-3 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-300"
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <MessageSquare size={20} className="transform group-hover:rotate-12 transition-transform duration-300" />
            </motion.div>
            <span className="text-lg uppercase tracking-wider font-medium">New Chat</span>
          </motion.button>

          {/* Version Number */}
          <motion.div
            className="mt-8 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span className="text-sm text-neutral-600 dark:text-neutral-400">v1.0.0</span>
            <motion.div
              className="absolute -bottom-1 left-0 h-px bg-neutral-600"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 2, duration: 1 }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Decorative Line */}
      <motion.div
        className="absolute bottom-12 h-px bg-neutral-600"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "12rem", opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.5 }}
      />
    </div>
  );
};

export default LandingPage;