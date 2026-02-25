import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="fixed bg-white dark:bg-black inset-0 flex items-center justify-center z-[9999]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-6"
      >
        {/* Logo */}
        <img
          src="/rurban_logo.svg"
          alt="Rurban Africa"
          loading="eager"
          className="h-20 w-20 object-contain"
        />

        {/* Animated text */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-black text-xl dark:text-white tracking-widest uppercase"
        >
          Rurban <span className="text-amber-400">Africa</span>
        </motion.h1>

        {/* Loader bar */}
        <div className="w-40 h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="h-full bg-yellow-400"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Loading;