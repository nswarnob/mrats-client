import { motion } from "framer-motion";
import { FiUsers, FiTarget, FiShield } from "react-icons/fi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

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
        className="mt-4 max-w-2xl mx-auto text-center text-slate-600"
      >
        LoanLink is a modern microloan request & approval system designed to
        streamline the loan process with transparency and trust.
      </motion.p>

      {/* 🔁 AUTO SLIDING CENTER CARD */}
      <div className="mt-12 max-w-md mx-auto">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          speed={1000}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          grabCursor={true}
        >
          <SwiperSlide>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-md p-6 text-center border border-purple-100"
            >
              <FiUsers className="text-3xl mx-auto text-[#6B4DF8]" />
              <h3 className="mt-3 font-semibold text-slate-900">
                User-Friendly
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Clean and simple experience that speeds up decisions.
              </p>
            </motion.div>
          </SwiperSlide>

          <SwiperSlide>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-md p-6 text-center border border-purple-100"
            >
              <FiTarget className="text-3xl mx-auto text-[#6B4DF8]" />
              <h3 className="mt-3 font-semibold text-slate-900">
                Fast Processing
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Real-time updates and automated workflows.
              </p>
            </motion.div>
          </SwiperSlide>

          <SwiperSlide>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-md p-6 text-center border border-purple-100"
            >
              <FiShield className="text-3xl mx-auto text-[#6B4DF8]" />
              <h3 className="mt-3 font-semibold text-slate-900">
                Secure & Reliable
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Protected using modern security standards.
              </p>
            </motion.div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default AboutUs;
