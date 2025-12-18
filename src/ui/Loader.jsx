import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-linear-to-br from-purple-50 to-purple-100/70">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [0.8, 1, 0.8],
          rotate: 360,
          opacity: 1,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative h-28 w-28 rounded-full bg-linear-to-br from-[#6B4DF8] to-[#A787FF] shadow-xl shadow-purple-300 flex items-center justify-center"
      >
        {/* Inner glowing ring */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full border-[3px] border-white/40 blur-[1px]"
        ></motion.div>

        {/* Loan icon pulse */}
        <motion.span
          animate={{
            scale: [1, 1.25, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
          className="text-3xl font-bold text-white tracking-wider"
        >
          💰
        </motion.span>

        {/* Floating dots */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute h-full w-full"
        >
          <span className="absolute -top-2 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white/90 shadow-md shadow-purple-300"></span>
          <span className="absolute -bottom-2 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white/90 shadow-md shadow-purple-300"></span>
          <span className="absolute top-1/2 -left-2 h-2 w-2 -translate-y-1/2 rounded-full bg-white/90 shadow-md shadow-purple-300"></span>
          <span className="absolute top-1/2 -right-2 h-2 w-2 -translate-y-1/2 rounded-full bg-white/90 shadow-md shadow-purple-300"></span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Loader;
