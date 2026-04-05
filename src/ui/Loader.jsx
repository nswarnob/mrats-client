import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-linear-to-br from-purple-50 via-white/50 to-purple-100/70 dark:from-slate-950 dark:via-slate-900/50 dark:to-purple-950/50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-500 blur-3xl"
        />
      </div>

      {/* Main loader container */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Outer rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 h-40 w-40"
        >
          <div className="h-full w-full rounded-full border-4 border-transparent border-t-[#6B4DF8] border-r-[#A787FF]/60 shadow-xl shadow-purple-500/30"></div>
        </motion.div>

        {/* Inner glowing ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-4 h-32 w-32"
        >
          <div className="h-full w-full rounded-full border-2 border-transparent border-b-purple-400 border-l-purple-300/40 blur-sm"></div>
        </motion.div>

        {/* Center gradient sphere */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex h-40 w-40 items-center justify-center rounded-full bg-linear-to-br from-[#6B4DF8] to-[#A787FF] shadow-2xl shadow-purple-500/50 relative z-10"
        >
          {/* Inner content */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Pulsing icon */}
            <motion.span
              animate={{
                scale: [0.8, 1.1, 0.8],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-5xl drop-shadow-lg"
            >
              💰
            </motion.span>

            {/* Loading text */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mt-2 text-xs font-semibold text-white tracking-wider"
            >
              Loading...
            </motion.div>
          </div>
        </motion.div>

        {/* Orbiting particles */}
        {[0, 1, 2, 3].map((idx) => (
          <motion.div
            key={idx}
            animate={{
              x: [
                Math.cos((idx * Math.PI) / 2) * 80,
                Math.cos((idx * Math.PI) / 2 + 0.5) * 85,
              ],
              y: [
                Math.sin((idx * Math.PI) / 2) * 80,
                Math.sin((idx * Math.PI) / 2 + 0.5) * 85,
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: idx * 0.2,
            }}
            className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 shadow-lg shadow-purple-300"
          />
        ))}

        {/* Pulsing dots around circle */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 h-full w-full"
        >
          {[0, 90, 180, 270].map((angle) => {
            const isHorizontal = angle === 0 || angle === 180;
            return (
              <motion.div
                key={angle}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: angle / 360,
                }}
                style={{
                  position: "absolute",
                  [isHorizontal ? "top" : "left"]: "50%",
                  [isHorizontal ? "left" : "top"]:
                    angle === 0
                      ? "-15px"
                      : angle === 90
                        ? "50%"
                        : angle === 180
                          ? "auto"
                          : "50%",
                  [isHorizontal && angle === 180 ? "right" : ""]:
                    angle === 180 ? "-15px" : "",
                  [!isHorizontal && angle === 90 ? "right" : ""]:
                    angle === 90 ? "-15px" : "",
                  transform: `${isHorizontal ? "translateY(-50%)" : "translateX(-50%)"}`,
                }}
                className="h-3 w-3 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 shadow-lg shadow-purple-400"
              />
            );
          })}
        </motion.div>
      </motion.div>

      {/* Loading text below */}
      <motion.div
        className="absolute bottom-24 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
          Getting your loans ready...
        </p>
        <motion.div
          className="flex justify-center gap-1 mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: dot * 0.2,
              }}
              className="h-1.5 w-1.5 rounded-full bg-purple-500"
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Loader;
