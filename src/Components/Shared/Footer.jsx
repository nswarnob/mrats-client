import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { FiMail, FiPhone, FiArrowRight } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaXTwitter, label: "Twitter", url: "#" },
    { icon: FaFacebookF, label: "Facebook", url: "#" },
    { icon: FaLinkedinIn, label: "LinkedIn", url: "#" },
  ];

  const quickLinks = [
    { label: "Home", url: "/" },
    { label: "All Loans", url: "/all-loans" },
    { label: "Dashboard", url: "/dashboard" },
    { label: "About Us", url: "/about" },
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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <footer className="relative bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 dark:from-slate-950 dark:via-slate-950 dark:to-black text-slate-200 overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Newsletter section */}
        <motion.div
          className="mx-auto max-w-6xl px-4 py-12 border-b border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-2xl font-bold text-white mb-2"
              >
                Stay Updated
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-slate-400 text-sm"
              >
                Subscribe to get the latest updates on loan offers and tips.
              </motion.p>
            </div>
            <motion.div
              className="flex gap-2"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full px-5 py-3 text-slate-900 dark:text-white bg-white/10 dark:bg-white/5 border border-white/20 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-linear-to-r from-[#6B4DF8] to-[#A787FF] px-6 py-3 font-semibold text-white hover:shadow-xl hover:shadow-purple-500/50 transition-all"
              >
                Subscribe
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer grid */}
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <motion.div
            className="grid gap-8 md:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
          >
            {/* Brand */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-r from-[#6B4DF8] to-[#A787FF] text-white font-bold shadow-lg">
                  L
                </div>
                <span className="text-lg font-bold text-white">
                  Loan<span className="gradient-text">Link</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                A modern microloan request & approval tracker for NGOs, MFIs and
                small financial organizations.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="mb-4 text-sm font-semibold text-white">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.url}
                      className="text-xs text-slate-400 hover:text-purple-400 hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2"
                    >
                      {link.label}
                      <FiArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div variants={itemVariants}>
              <h4 className="mb-4 text-sm font-semibold text-white">Contact</h4>
              <div className="space-y-2">
                <a
                  href="mailto:support@loanlink.com"
                  className="text-xs text-slate-400 hover:text-purple-400 transition-colors flex items-center gap-2"
                >
                  <FiMail className="text-sm" />
                  support@loanlink.com
                </a>
                <a
                  href="tel:+18004459000"
                  className="text-xs text-slate-400 hover:text-purple-400 transition-colors flex items-center gap-2"
                >
                  <FiPhone className="text-sm" />
                  +1 (800) 445–9000
                </a>
              </div>
            </motion.div>

            {/* Social */}
            <motion.div variants={itemVariants}>
              <h4 className="mb-4 text-sm font-semibold text-white">
                Follow Us
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.url}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-linear-to-r hover:from-[#6B4DF8] hover:to-[#A787FF] text-white transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      title={social.label}
                    >
                      <Icon className="text-sm" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="border-t border-white/10 bg-white/5 backdrop-blur-sm py-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© {currentYear} LoanLink. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-purple-400 transition-colors">
                Privacy Policy
              </a>
              <span className="text-white/20">•</span>
              <a href="#" className="hover:text-purple-400 transition-colors">
                Terms of Service
              </a>
              <span className="text-white/20">•</span>
              <a href="#" className="hover:text-purple-400 transition-colors">
                Cookie Settings
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
