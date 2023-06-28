import React, { useEffect, useState } from "react";
import Loader from "../../components/services/Loader";
import Footer from "../footer/Footer";

import ContactForm from "../../components/pages/ContactForm";
import NavBar from "../../components/pages/navigation/NavBar";

const Contact = () => {
  const [loader, setloader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setloader(false);
    }, 300);
  }, []);
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <NavBar hero="contact" cmp="contact" />
          <ContactForm />
          <Footer />
        </>
      )}
    </>
  );
};

export default Contact;
