import React from "react";
import "./Contact.css";

import Navbar from "../components/common/Navbar";

import logo from "../assets/images/logo.png";
import homeBg from "../assets/images/event-bg.png";

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Thank you for contacting EventEase!");
  };

  return (
    <main
      className="contact-page"
      style={{ backgroundImage: `url(${homeBg})` }}
    >
      <div className="contact-overlay"></div>

      {/* ================= NAVBAR ================= */}

      <Navbar />

      {/* ================= HEADER ================= */}

      <section className="contact-content">

        <div className="contact-header">

          <img
            src={logo}
            alt="EventEase"
          />

          <div>
            <h1>Contact Us</h1>

            <p>
              Have a question? We'd love to hear from you.
            </p>
          </div>

        </div>


        {/* ================= CONTACT GRID ================= */}

        <div className="contact-grid">

          {/* Contact Information */}

          <div className="contact-card">

            <h2>Get in Touch</h2>

            <p>
              Whether you need help planning an event or want to
              know more about EventEase, feel free to contact us.
            </p>

            <div className="contact-info">

              <p>📧 eventease@example.com</p>

              <p>📞 +91 98765 43210</p>

              <p>📍 Nashik, Maharashtra</p>

            </div>

          </div>


          {/* Contact Form */}

          <div className="contact-card">

            <h2>Send us a Message</h2>

            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >

              <input
                type="text"
                placeholder="Your Name"
                required
              />

              <input
                type="email"
                placeholder="Your Email"
                required
              />

              <input
                type="text"
                placeholder="Subject"
                required
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                required
              />

              <button type="submit">
                Send Message
              </button>

            </form>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Contact;