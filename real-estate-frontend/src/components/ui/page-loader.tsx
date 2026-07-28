"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loader once DOM is fully painted
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#172033]"
        >
          {/* Logo / Brand */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-amber-400 text-[10px] uppercase tracking-[0.5em] font-medium">
              Bricksage
            </span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-px bg-amber-400/40" />
              <span className="font-serif text-white text-2xl font-semibold tracking-wide">
                Properties
              </span>
              <div className="w-8 h-px bg-amber-400/40" />
            </div>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
