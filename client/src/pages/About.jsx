import React from "react";
import "./About.css";
import Navbar from "../components/common/Navbar";
import logo from "../assets/images/logo.png";
import homeBg from "../assets/images/event-bg.png";

function About() {
  return (
    <main
      className="about-page"
      style={{ backgroundImage: `url(${homeBg})` }}
    >
      <div className="about-overlay"></div>
      <Navbar />
      {/* Hero */}
      <section className="about-hero">
        <img
          src={logo}
          alt="Event Planning"
          className="about-logo"
        />

        <div className="about-heading">
          <h1>About EventEase</h1>
          <p>
            Making every event easier to plan,
            organize and celebrate.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="about-content">

        <div className="about-card">
          <h2>What is EventEase?</h2>

          <p>
            EventEase is an event planning platform designed to
            connect customers with trusted vendors for different
            types of events.
          </p>

          <p>
            Whether you are planning a wedding, birthday party,
            corporate event or any special occasion, EventEase
            helps you discover the right services in one place.
          </p>
        </div>

        <div className="about-card">
          <h2>Our Purpose</h2>

          <p>
            Planning an event can become complicated when you have
            to search for different vendors separately.
          </p>

          <p>
            Our goal is to make this process simpler by bringing
            event planners, vendors and customers together on one
            platform.
          </p>
        </div>

        <div className="about-card">
          <h2>Why EventEase?</h2>

          <div className="about-points">
            <div>
              <span>✓</span>
              <p>Find vendors easily</p>
            </div>

            <div>
              <span>✓</span>
              <p>Explore different event services</p>
            </div>

            <div>
              <span>✓</span>
              <p>Search vendors by location</p>
            </div>

            <div>
              <span>✓</span>
              <p>Plan your event in one place</p>
            </div>
          </div>
        </div>

      </section>
    </main>
  );
}

export default About;