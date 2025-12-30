import { motion } from "framer-motion";
import { FiUsers, FiTarget, FiShield } from "react-icons/fi";

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-semi-bold text-primary text-center"
      >
        About <span className="text-[#6B4DF8]">LoanLink</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mt-4 max-w-2xl mx-auto text-center text-slate-600 text-sm md:text-base"
      >
        LoanLink is a modern microloan request & approval system designed to
        help borrowers, managers, and financial organizations manage loan
        applications faster, safer, and smarter. Our mission is simple:
        streamline the loan process with transparency and trust.
      </motion.p>

      {/* Features Row */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Card 1 */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-2xl shadow-md p-6 text-center border border-purple-100"
        >
          <FiUsers className="text-3xl mx-auto text-[#6B4DF8]" />
          <h3 className="mt-3 font-semibold text-slate-900">User-Friendly</h3>
          <p className="mt-2 text-sm text-slate-600">
            Borrowers and managers enjoy a clean, simple experience that reduces
            complexity and speeds up decision-making.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-2xl shadow-md p-6 text-center border border-purple-100"
        >
          <FiTarget className="text-3xl mx-auto text-[#6B4DF8]" />
          <h3 className="mt-3 font-semibold text-slate-900">Fast Processing</h3>
          <p className="mt-2 text-sm text-slate-600">
            Apply, track, and manage loans quickly with real-time updates and
            automated workflows.
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-2xl shadow-md p-6 text-center border border-purple-100"
        >
          <FiShield className="text-3xl mx-auto text-[#6B4DF8]" />
          <h3 className="mt-3 font-semibold text-slate-900">
            Secure & Reliable
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            All data is protected using modern security standards, ensuring
            trust and transparency for all users.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
