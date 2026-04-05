import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiArrowRight } from "react-icons/fi";

const Contact = () => {
  const contactMethods = [
    {
      icon: FiMail,
      title: "Email Us",
      content: "support@loanlink.com",
      description: "We'll respond within 24 hours",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: FiPhone,
      title: "Call Us",
      content: "+1 (800) 445–9000",
      description: "Available Mon-Fri, 9 AM - 6 PM",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: FiMapPin,
      title: "Visit Us",
      content: "221B Downtown Road, CA 90011",
      description: "Downtown Office",
      color: "from-pink-500 to-pink-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
      className="container mx-auto px-4 py-8 text-slate-900 dark:text-slate-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className="mb-12 text-center"
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
              Get In Touch
            </span>
          </div>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold leading-tight text-slate-900 dark:text-white"
        >
          Contact <span className="gradient-text">Us</span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
        >
          Have questions about your loan or need support? Our team is here to
          assist you anytime.
        </motion.p>
      </motion.div>

      {/* Contact Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
      >
        {contactMethods.map((method, idx) => {
          const Icon = method.icon;
          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="relative h-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950 shadow-lg dark:shadow-slate-950/40">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 group-hover:from-purple-50/50 group-hover:to-purple-100/30 dark:group-hover:from-purple-900/20 dark:group-hover:to-purple-800/10 transition-all duration-500"></div>

                {/* Border gradient on hover */}
                <div className="absolute inset-0 rounded-2xl border border-purple-200/0 group-hover:border-purple-200/50 dark:group-hover:border-purple-500/30 transition-all duration-500"></div>

                {/* Accent line */}
                <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-transparent via-purple-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                {/* Content */}
                <div className="relative z-10 p-8 text-center">
                  {/* Icon */}
                  <motion.div
                    className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-r ${method.color} text-white shadow-lg shadow-purple-500/20 group-hover:shadow-xl group-hover:shadow-purple-500/40 transition-all duration-300`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="text-2xl" />
                  </motion.div>

                  {/* Text */}
                  <motion.h3
                    className="mt-6 text-xl font-bold text-slate-900 dark:text-white"
                    whileHover={{ scale: 1.05 }}
                  >
                    {method.title}
                  </motion.h3>

                  <motion.p
                    className="mt-2 text-lg font-semibold text-transparent bg-linear-to-r from-[#6B4DF8] to-[#A787FF] bg-clip-text group-hover:opacity-100 opacity-90 transition-opacity"
                    whileHover={{ scale: 1.05 }}
                  >
                    {method.content}
                  </motion.p>

                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                    {method.description}
                  </p>

                  {/* Arrow indicator */}
                  <motion.div
                    className="mt-4 inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FiArrowRight className="text-purple-500 text-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Prefer to connect on social media? Follow us for updates and
          announcements.
        </p>
        <div className="flex justify-center gap-4">
          {["Twitter", "Facebook", "LinkedIn"].map((social, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-full border border-purple-200/50 dark:border-white/10 text-purple-600 dark:text-purple-300 hover:bg-purple-50/50 dark:hover:bg-white/5 transition-all duration-300 text-sm font-semibold"
            >
              {social}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
