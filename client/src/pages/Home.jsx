import React, { useState } from "react";
import "./Home.css";
import Navbar from "../components/common/Navbar";
import logo from "../assets/images/logo.png";
import homeBg from "../assets/images/event-bg.png";

function Home() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(
          `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`
        );
      },
      () => {
        alert("Unable to access your location. Please allow location permission.");
      }
    );
  };

  const selectCategory = (category) => {
    setSearch(category);
  };

  return (
    <main
      className="home-page"
      style={{ backgroundImage: `url(${homeBg})` }}
    >
      <div className="home-overlay"></div>

      <Navbar />

      {/* ================= HERO ================= */}
      <section className="hero-section">
        <div className="hero-brand">
          <img
            src={logo}
            alt="Event Planning"
            className="hero-logo"
          />
        </div>

        <h1>
          Find Perfect Vendor
          <br />
          for Any Event
        </h1>
      </section>

      {/* ================= SEARCH ================= */}
      <section className="search-section">

        <div className="search-bar">
          <SearchIcon />

          <input
            type="text"
            placeholder="Search for wedding, birthdays, events...."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button>
            Search
          </button>
        </div>

        <div className="location-bar">
          <LocationIcon />

          <input
            type="text"
            placeholder="Enter Your Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <button
            className="detect-location"
            onClick={detectLocation}
          >
            Detect My Location
          </button>
        </div>

      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="categories-section">

        <h2>
          Browse by Category
        </h2>

        <div className="category-grid">

          <CategoryCard
            title="Wedding"
            onClick={() => selectCategory("Wedding")}
          >
            <WeddingIcon />
          </CategoryCard>

          <CategoryCard
            title="Birthday Parties"
            onClick={() => selectCategory("Birthday")}
          >
            <BirthdayIcon />
          </CategoryCard>

          <CategoryCard
            title="Decorations"
            onClick={() => selectCategory("Decorations")}
          >
            <DecorationIcon />
          </CategoryCard>

          <CategoryCard
            title="Music & DJ"
            onClick={() => selectCategory("Music & DJ")}
          >
            <MusicIcon />
          </CategoryCard>

        </div>

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="home-footer">

        <div className="footer-left">

          <p>
            For latest update stay tune to...
          </p>

          <div className="social-icons">
            <a href="#" aria-label="Instagram">◎</a>
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="X">𝕏</a>
            <a href="#" aria-label="Facebook">f</a>
          </div>

        </div>

        <button className="vendor-login-button">
          <UserIcon />
          <span>Vendors login</span>
        </button>

      </footer>

    </main>
  );
}


/* =====================================================
   REUSABLE COMPONENTS
===================================================== */

function CategoryCard({ title, children, onClick }) {
  return (
    <button
      className="category-card"
      onClick={onClick}
    >
      <div className="category-icon">
        {children}
      </div>

      <span>
        {title}
      </span>
    </button>
  );
}


/* =====================================================
   ICONS
===================================================== */

function UserIcon() {
  return (
    <svg
      viewBox="0 0 40 40"
      className="user-icon"
      aria-hidden="true"
    >
      <circle
        cx="20"
        cy="13"
        r="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M9 32c0-6 4.5-9 11-9s11 3 11 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <circle
        cx="20"
        cy="20"
        r="17"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}


function SearchIcon() {
  return (
    <svg
      viewBox="0 0 40 40"
      className="search-icon"
      aria-hidden="true"
    >
      <circle
        cx="17"
        cy="17"
        r="11"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />

      <line
        x1="25"
        y1="25"
        x2="35"
        y2="35"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}


function LocationIcon() {
  return (
    <svg
      viewBox="0 0 40 50"
      className="location-icon"
      aria-hidden="true"
    >
      <path
        d="M20 2C10 2 3 10 3 19c0 13 17 28 17 28s17-15 17-28C37 10 30 2 20 2Z"
        fill="currentColor"
      />

      <circle
        cx="20"
        cy="19"
        r="6"
        fill="#160F0E"
      />
    </svg>
  );
}


/* Wedding */
function WeddingIcon() {
  return (
    <svg
      viewBox="0 0 160 130"
      className="category-svg wedding-svg"
    >
      <circle
        cx="62"
        cy="65"
        r="32"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
      />

      <circle
        cx="98"
        cy="65"
        r="32"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
      />

      <path
        d="M80 20c10-15 25-8 20 4-5 10-20 12-20 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      />

      <path
        d="M20 105c35-10 85-10 120 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      />
    </svg>
  );
}


/* Birthday */
function BirthdayIcon() {
  return (
    <svg
      viewBox="0 0 160 130"
      className="category-svg"
    >
      <path
        d="M35 72h90v35H35z"
        fill="#d8a27e"
      />

      <path
        d="M35 72c0-13 90-13 90 0"
        fill="#f2c7a5"
      />

      <path
        d="M45 58h70v17H45z"
        fill="#fff"
      />

      <path
        d="M52 58c8 10 16-10 24 0s16 10 24 0 16 10 18 0"
        fill="none"
        stroke="#d66"
        strokeWidth="4"
      />

      <rect
        x="61"
        y="40"
        width="6"
        height="18"
        fill="#fff"
      />

      <rect
        x="77"
        y="35"
        width="6"
        height="23"
        fill="#fff"
      />

      <rect
        x="93"
        y="40"
        width="6"
        height="18"
        fill="#fff"
      />

      <circle cx="64" cy="37" r="4" fill="#ffb000" />
      <circle cx="80" cy="31" r="4" fill="#ffb000" />
      <circle cx="96" cy="37" r="4" fill="#ffb000" />
    </svg>
  );
}


/* Decorations */
function DecorationIcon() {
  return (
    <svg
      viewBox="0 0 160 130"
      className="category-svg"
    >
      <ellipse
        cx="80"
        cy="48"
        rx="30"
        ry="40"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
      />

      <path
        d="M80 88v30"
        stroke="currentColor"
        strokeWidth="3"
      />

      <path
        d="M80 118c-5 4-10 4-15 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}


/* Music */
function MusicIcon() {
  return (
    <svg
      viewBox="0 0 160 130"
      className="category-svg"
    >
      <ellipse
        cx="58"
        cy="100"
        rx="20"
        ry="15"
        fill="currentColor"
      />

      <rect
        x="72"
        y="25"
        width="10"
        height="75"
        fill="currentColor"
      />

      <rect
        x="72"
        y="20"
        width="45"
        height="20"
        rx="3"
        fill="currentColor"
      />
    </svg>
  );
}


export default Home;