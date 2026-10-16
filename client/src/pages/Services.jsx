import React from "react";
import "./Services.css";

import Navbar from "../components/common/Navbar";

import logo from "../assets/images/logo.png";
import homeBg from "../assets/images/event-bg.png";

function Services() {
  return (
    <main
      className="services-page"
      style={{ backgroundImage: `url(${homeBg})` }}
    >
      <div className="services-overlay"></div>

      {/* ================= NAVBAR ================= */}

      <Navbar />

      {/* ================= HEADER ================= */}

      <section className="services-header">
        <img
          src={logo}
          alt="EventEase"
          className="services-logo"
        />

        <div>
          <h1>Our Services</h1>

          <p>
            Everything you need to plan and organize your perfect event.
          </p>
        </div>
      </section>

      {/* ================= SERVICES ================= */}

      <section className="services-content">

        <ServiceCard
          icon="💍"
          title="Wedding"
          description="Find trusted vendors for wedding planning, photography, decoration, catering and more."
          buttonText="Explore Wedding"
        />

        <ServiceCard
          icon="🎂"
          title="Birthday Parties"
          description="Plan memorable birthday celebrations with decorators, photographers, caterers and entertainment services."
          buttonText="Explore Birthdays"
        />

        <ServiceCard
          icon="🎈"
          title="Decorations"
          description="Discover decoration vendors for weddings, birthdays, parties and other special occasions."
          buttonText="Explore Decorations"
        />

        <ServiceCard
          icon="🎵"
          title="Music & DJ"
          description="Find DJs, music systems and entertainment services to make your event more enjoyable."
          buttonText="Explore Music"
        />

      </section>

    </main>
  );
}


/* ================================
   REUSABLE SERVICE CARD
================================ */

function ServiceCard({
  icon,
  title,
  description,
  buttonText,
}) {
  return (
    <article className="service-card">

      <div className="service-icon">
        {icon}
      </div>

      <h2>{title}</h2>

      <p>{description}</p>

      <button type="button">
        {buttonText}
      </button>

    </article>
  );
}


export default Services;