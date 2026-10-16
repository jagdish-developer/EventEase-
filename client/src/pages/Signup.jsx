import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

import logo from "../assets/images/logo.png";
import vendorBg from "../assets/images/vendor-bg.png";

function Signup() {
  const navigate = useNavigate();

  // =====================================================
  // FORM STATES
  // =====================================================

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // =====================================================
  // UI STATES
  // =====================================================

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // =====================================================
  // PASSWORD REQUIREMENTS
  // =====================================================

  const passwordRequirements = {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const isPasswordValid =
    passwordRequirements.minLength &&
    passwordRequirements.uppercase &&
    passwordRequirements.lowercase &&
    passwordRequirements.number &&
    passwordRequirements.special;

  // =====================================================
  // API BASE URL
  // =====================================================

  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

  // =====================================================
  // HANDLE SIGNUP
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    // ---------------------------------------------
    // Password validation
    // ---------------------------------------------

    if (!isPasswordValid) {
      setErrorMessage(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special symbol."
      );
      return;
    }

    // ---------------------------------------------
    // Confirm password validation
    // ---------------------------------------------

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // ---------------------------------------------
    // Terms validation
    // ---------------------------------------------

    if (!agreeTerms) {
      setErrorMessage(
        "Please agree to the Terms of Services and Privacy Policy."
      );
      return;
    }

    // ---------------------------------------------
    // Start loading
    // ---------------------------------------------

    setLoading(true);

    try {
      // ---------------------------------------------
      // Data sent to backend
      // ---------------------------------------------

      const customerData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        city,
        password,
      };

      console.log("Sending customer data:", {
        ...customerData,
        password: "********",
      });

      // ---------------------------------------------
      // POST REQUEST
      // ---------------------------------------------

      const response = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        customerData
      );

      console.log("Registration response:", response.data);

      // ---------------------------------------------
      // SUCCESS
      // ---------------------------------------------

      if (response.data.success) {
        setSuccessMessage(
          "Account created successfully! Redirecting to login..."
        );

        // Clear form
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setCity("");
        setPassword("");
        setConfirmPassword("");
        setAgreeTerms(false);

        // -------------------------------------------
        // Redirect to Login
        // -------------------------------------------

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      console.error("Registration error:", error);

      // ---------------------------------------------
      // Backend error
      // ---------------------------------------------

      if (error.response) {
        setErrorMessage(
          error.response.data?.message ||
            "Unable to create account. Please try again."
        );
      }

      // ---------------------------------------------
      // Backend not running / network error
      // ---------------------------------------------

      else if (error.request) {
        setErrorMessage(
          "Cannot connect to server. Please make sure the backend is running."
        );
      }

      // ---------------------------------------------
      // Unknown error
      // ---------------------------------------------

      else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="signup-page"
      style={{ backgroundImage: `url(${vendorBg})` }}
    >
      {/* =====================================================
          BACKGROUND OVERLAY
      ===================================================== */}

      <div className="signup-overlay"></div>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="signup-container">

        {/* =====================================================
            SIGN UP CARD
        ===================================================== */}

        <section className="signup-card">

          {/* =================================================
              LOGO
          ================================================= */}

          <img
            src={logo}
            alt="EventEase"
            className="signup-logo"
          />

          {/* =================================================
              TITLE
          ================================================= */}

          <h1 className="signup-title">
            Customer Registration
          </h1>

          <p className="signup-subtitle">
            Create your account to get started
          </p>

          {/* =================================================
              ERROR MESSAGE
          ================================================= */}

          {errorMessage && (
            <div className="signup-message signup-error">
              {errorMessage}
            </div>
          )}

          {/* =================================================
              SUCCESS MESSAGE
          ================================================= */}

          {successMessage && (
            <div className="signup-message signup-success">
              {successMessage}
            </div>
          )}

          {/* =================================================
              FORM
          ================================================= */}

          <form onSubmit={handleSubmit}>

            {/* =================================================
                NAME
            ================================================= */}

            <div className="name-row">

              {/* First Name */}

              <div className="signup-field">

                <label>First Name</label>

                <div className="signup-input-wrapper">

                  <span className="signup-input-icon">
                    👤
                  </span>

                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) =>
                      setFirstName(e.target.value)
                    }
                    required
                    disabled={loading}
                  />

                </div>

              </div>

              {/* Last Name */}

              <div className="signup-field">

                <label>Last Name</label>

                <div className="signup-input-wrapper">

                  <span className="signup-input-icon">
                    👤
                  </span>

                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) =>
                      setLastName(e.target.value)
                    }
                    required
                    disabled={loading}
                  />

                </div>

              </div>

            </div>

            {/* =================================================
                EMAIL
            ================================================= */}

            <div className="signup-field">

              <label>Email Address</label>

              <div className="signup-input-wrapper">

                <span className="signup-input-icon">
                  ✉
                </span>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                  disabled={loading}
                />

              </div>

            </div>

            {/* =================================================
                PHONE
            ================================================= */}

            <div className="signup-field">

              <label>Phone Number</label>

              <div className="signup-input-wrapper">

                <span className="signup-input-icon">
                  📞
                </span>

                <input
                  type="tel"
                  placeholder="+91 9876543210"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  required
                  pattern="[0-9+\-\s]{10,15}"
                  disabled={loading}
                />

              </div>

            </div>

            {/* =================================================
                CITY
            ================================================= */}

            <div className="signup-field">

              <label>City</label>

              <div className="signup-input-wrapper city-wrapper">

                <span className="signup-input-icon">
                  📍
                </span>

                <select
                  value={city}
                  onChange={(e) =>
                    setCity(e.target.value)
                  }
                  required
                  disabled={loading}
                >

                  <option value="" disabled>
                    Select Your City
                  </option>

                  <option value="Nashik">
                    Nashik
                  </option>

                  <option value="Pune">
                    Pune
                  </option>

                  <option value="Mumbai">
                    Mumbai
                  </option>

                  <option value="Nagpur">
                    Nagpur
                  </option>

                  <option value="Aurangabad">
                    Aurangabad
                  </option>

                  <option value="Ahmedabad">
                    Ahmedabad
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>

            </div>

            {/* =================================================
                PASSWORD
            ================================================= */}

            <div className="signup-field">

              <label>Password</label>

              <div className="signup-input-wrapper">

                <span className="signup-input-icon">
                  🔒
                </span>

                <input
                  type="password"
                  placeholder="Create a Password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                  disabled={loading}
                />

              </div>

              {/* =================================================
                  LIVE PASSWORD REQUIREMENTS
              ================================================= */}

              {password.length > 0 && (
                <div className="password-requirements">

                  <p className="password-requirements-title">
                    Password must contain:
                  </p>

                  <PasswordRequirement
                    valid={passwordRequirements.minLength}
                    text="At least 8 characters"
                  />

                  <PasswordRequirement
                    valid={passwordRequirements.uppercase}
                    text="One uppercase letter (A-Z)"
                  />

                  <PasswordRequirement
                    valid={passwordRequirements.lowercase}
                    text="One lowercase letter (a-z)"
                  />

                  <PasswordRequirement
                    valid={passwordRequirements.number}
                    text="One number (0-9)"
                  />

                  <PasswordRequirement
                    valid={passwordRequirements.special}
                    text="One special symbol (!@#$%)"
                  />

                </div>
              )}

            </div>

            {/* =================================================
                CONFIRM PASSWORD
            ================================================= */}

            <div className="signup-field">

              <label>Confirm Password</label>

              <div
                className={`signup-input-wrapper ${
                  confirmPassword.length > 0
                    ? password === confirmPassword
                      ? "password-match"
                      : "password-no-match"
                    : ""
                }`}
              >

                <span className="signup-input-icon">
                  🔒
                </span>

                <input
                  type="password"
                  placeholder="Confirm your Password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  required
                  disabled={loading}
                />

              </div>

              {/* Live Confirm Password Indicator */}

              {confirmPassword.length > 0 && (
                <div
                  className={
                    password === confirmPassword
                      ? "confirm-password-success"
                      : "confirm-password-error"
                  }
                >
                  {password === confirmPassword
                    ? "✓ Passwords match"
                    : "✕ Passwords do not match"}
                </div>
              )}

            </div>

            {/* =================================================
                TERMS
            ================================================= */}

            <label className="signup-terms">

              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) =>
                  setAgreeTerms(e.target.checked)
                }
                disabled={loading}
              />

              <span>
                I agree to the{" "}

                <button
                  type="button"
                  className="terms-link"
                >
                  Terms of Services
                </button>

                {" "}and{" "}

                <button
                  type="button"
                  className="terms-link"
                >
                  Privacy Policy
                </button>

              </span>

            </label>

            {/* =================================================
                CREATE ACCOUNT
            ================================================= */}

            <button
              type="submit"
              className="create-account-btn"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

            {/* =================================================
                LOGIN
            ================================================= */}

            <p className="already-account">

              Already have an account?

              <NavLink
                to="/login"
                className="login-link"
              >
                Sign in
              </NavLink>

            </p>

            {/* =================================================
                DIVIDER
            ================================================= */}

            <div className="signup-divider">

              <span></span>

              <p>Or continue with</p>

              <span></span>

            </div>

            {/* =================================================
                SOCIAL SIGNUP
            ================================================= */}

            <div className="social-signup">

              {/* Google */}

              <button
                type="button"
                className="signup-social-btn"
                disabled={loading}
              >

                <GoogleIcon />

                <span>
                  Google
                </span>

              </button>

              {/* Facebook */}

              <button
                type="button"
                className="signup-social-btn"
                disabled={loading}
              >

                <FacebookIcon />

                <span>
                  Facebook
                </span>

              </button>

            </div>

          </form>

        </section>

      </div>

    </main>
  );
}


/* =====================================================
   PASSWORD REQUIREMENT COMPONENT
===================================================== */

function PasswordRequirement({ valid, text }) {
  return (
    <div
      className={`password-requirement ${
        valid ? "requirement-valid" : "requirement-invalid"
      }`}
    >
      <span className="requirement-icon">
        {valid ? "✓" : "○"}
      </span>

      <span>
        {text}
      </span>
    </div>
  );
}


/* =====================================================
   GOOGLE ICON
===================================================== */

function GoogleIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >

      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />

      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />

      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC04"
      />

      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />

    </svg>
  );
}


/* =====================================================
   FACEBOOK ICON
===================================================== */

function FacebookIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="white"
      aria-hidden="true"
    >

      <path
        d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"
      />

    </svg>
  );
}


export default Signup;