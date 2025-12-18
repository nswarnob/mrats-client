import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Contact = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-slate-900"
        >
          Contact <span className="text-[#6B4DF8]">Us</span>
        </motion.h2>

        <p className="mt-4 text-center text-slate-600 text-sm md:text-base max-w-xl mx-auto">
          Have questions about your loan or need support? Our team is here to
          assist you anytime.
        </p>

        {/* Contact Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-2xl shadow-md bg-purple-50 border border-purple-100 text-center"
          >
            <FiMail className="text-3xl mx-auto text-[#6B4DF8]" />
            <h3 className="mt-3 font-semibold text-slate-900">Email</h3>
            <p className="mt-1 text-sm text-slate-600">support@loanlink.com</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-2xl shadow-md bg-purple-50 border border-purple-100 text-center"
          >
            <FiPhone className="text-3xl mx-auto text-[#6B4DF8]" />
            <h3 className="mt-3 font-semibold text-slate-900">Phone</h3>
            <p className="mt-1 text-sm text-slate-600">+1 (800) 445–9000</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-2xl shadow-md bg-purple-50 border border-purple-100 text-center"
          >
            <FiMapPin className="text-3xl mx-auto text-[#6B4DF8]" />
            <h3 className="mt-3 font-semibold text-slate-900">Address</h3>
            <p className="mt-1 text-sm text-slate-600">
              221B Downtown Road, CA 90011
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
