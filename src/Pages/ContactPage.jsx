import React from "react";
import Contact from "../ui/Contact";
import usePageTitle from "../hooks/usePageTitle";

const ContactPage = () => {
  usePageTitle("Contact");
  return <Contact />;
};

export default ContactPage;
