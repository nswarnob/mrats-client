import { motion } from "framer-motion";
import { FiUsers, FiTarget, FiShield, FiArrowRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const AboutUs = () => {
  const features = [
    {
      icon: FiUsers,
      title: "User-Friendly",
      description: "Clean and simple experience that speeds up decisions.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: FiTarget,
      title: "Fast Processing",
      description: "Real-time updates and automated workflows.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: FiShield,
      title: "Secure & Reliable",
      description: "Protected using modern security standards.",
      color: "from-emerald-500 to-emerald-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="container mx-auto px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex justify-center mb-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100/80 dark:bg-purple-900/30 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-700 dark:text-purple-300">
              Our Mission
            </span>
          </div>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold leading-tight"
        >
          About <span className="gradient-text inline-block">LoanLink</span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
        >
          LoanLink is a modern microloan request & approval system designed to
          streamline the loan process with transparency and trust.
        </motion.p>
      </motion.div>

      {/* Features Carousel */}
      <div className="max-w-3xl mx-auto">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          speed={1000}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          grabCursor={true}
          className="rounded-2xl overflow-hidden"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <SwiperSlide key={idx}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-100 dark:border-purple-900/30 overflow-hidden p-8 md:p-10 text-center min-h-72 flex flex-col items-center justify-center">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-linear-to-br from-purple-50/0 to-purple-100/0 group-hover:from-purple-50/50 group-hover:to-purple-100/30 dark:group-hover:from-purple-900/20 dark:group-hover:to-purple-800/10 transition-all duration-500 pointer-events-none"></div>

                    {/* Accent line */}
                    <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-transparent via-purple-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <motion.div
                        className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-r ${feature.color} text-white shadow-lg shadow-purple-500/20 group-hover:shadow-xl group-hover:shadow-purple-500/40 transition-all duration-300`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="text-2xl" />
                      </motion.div>

                      {/* Title */}
                      <motion.h3
                        className="mt-6 text-2xl font-bold text-slate-900 dark:text-white"
                        whileHover={{ scale: 1.05 }}
                      >
                        {feature.title}
                      </motion.h3>

                      {/* Description */}
                      <motion.p
                        className="mt-4 text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-sm"
                        initial={{ opacity: 0.9 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {feature.description}
                      </motion.p>

                      {/* CTA Arrow */}
                      <motion.div
                        className="mt-6 inline-block"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <FiArrowRight className="text-purple-500 text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Stats section */}
      <motion.div
        className="mt-16 grid grid-cols-3 gap-4 md:gap-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {[
          { value: "10K+", label: "Users" },
          { value: "5M+", label: "Loans Processed" },
          { value: "99.9%", label: "Uptime" },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05, y: -4 }}
            className="p-4 rounded-xl bg-purple-50/50 dark:bg-purple-900/20 border border-purple-200/50 dark:border-purple-700/30"
          >
            <div className="text-2xl md:text-3xl font-bold gradient-text">
              {stat.value}
            </div>
            <div className="mt-2 text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default AboutUs;
