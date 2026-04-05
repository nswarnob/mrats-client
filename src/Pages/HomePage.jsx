import React from "react";

import AboutUs from "../ui/AboutUs";
import Contact from "../ui/Contact";
import AvailableLoans from "../ui/AvailableLoans";
import Hero from "../ui/Hero";
import HowItWorks from "../ui/HowItWorks";
import usePageTitle from "../hooks/usePageTitle";

const HomePage = () => {
  usePageTitle("Home");
  return (
    <div className="space-y-20">
      {/* Hero */}
      <section>
        <Hero></Hero>
      </section>

      {/* Available Loans */}
      <section>
        <AvailableLoans></AvailableLoans>
      </section>

      {/* How it works */}
      <section className="mt-14 rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-lg dark:shadow-slate-950/40">
        <HowItWorks></HowItWorks>
      </section>

      {/* About Us */}
      <section>
        <AboutUs></AboutUs>
      </section>

      {/* Contact */}
      <section className="rounded-3xl bg-white dark:bg-slate-900 dark:shadow-slate-950/40">
        <Contact></Contact>
      </section>
    </div>
  );
};

export default HomePage;
