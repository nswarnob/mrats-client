import React from "react";
import AboutUs from "../ui/AboutUs";
import usePageTitle from "../hooks/usePageTitle";

const AboutPage = () => {
  usePageTitle("About");
  return <AboutUs />;
};

export default AboutPage;
