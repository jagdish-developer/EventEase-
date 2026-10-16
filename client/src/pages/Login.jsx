import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Login.css";

import logo from "../assets/images/logo.png";
import vendorBg from "../assets/images/vendor-bg.png";


function Login() {

  const navigate = useNavigate();

  // =====================================================
  // FORM STATES
  // =====================================================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // =====================================================
  // UI STATES
  // =====================================================

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // =====================================================
  // GOOGLE BUTTON REF
  // =====================================================

  const googleButtonRef = useRef(null);

  // =====================================================
  // API URL
  // =====================================================

  const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000";

  // =====================================================
  // GOOGLE CLIENT ID
  // =====================================================

  const GOOGLE_CLIENT_ID =
    import.meta.env.VITE_GOOGLE_CLIENT_ID;


  // =====================================================
  // GOOGLE LOGIN HANDLER
  // =====================================================

  const handleGoogleResponse = async (response) => {

    try {

      setGoogleLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      // ---------------------------------------------
      // Google credential
      // ---------------------------------------------

      const credential = response.credential;

      if (!credential) {
        throw new Error(
          "Google credential was not received."
        );
      }

      console.log(
        "Google credential received."
      );


      // ---------------------------------------------
      // Send credential to backend
      // ---------------------------------------------

      const result = await axios.post(
        `${API_BASE_URL}/api/auth/google`,
        {
          credential,
        }
      );


      // ---------------------------------------------
      // Backend success
      // ---------------------------------------------

      if (result.data.success) {

        const {
          token,
          customer,
        } = result.data;


        // -------------------------------------------
        // Save JWT
        // -------------------------------------------

        localStorage.setItem(
          "eventease_token",
          token
        );


        // -------------------------------------------
        // Save customer
        // -------------------------------------------

        localStorage.setItem(
          "eventease_customer",
          JSON.stringify(customer)
        );


        // -------------------------------------------
        // Success message
        // -------------------------------------------

        setSuccessMessage(
          `Welcome ${customer.firstName}!`
        );


        // -------------------------------------------
        // Redirect
        // -------------------------------------------

        setTimeout(() => {

          navigate("/");

        }, 1000);
      }

    } catch (error) {

      console.error(
        "Google Login Error:",
        error
      );


      if (error.response) {

        setErrorMessage(
          error.response.data?.message ||
          "Google login failed."
        );

      } else if (error.request) {

        setErrorMessage(
          "Cannot connect to server. Please make sure the backend is running."
        );

      } else {

        setErrorMessage(
          "Google login failed. Please try again."
        );
      }

    } finally {

      setGoogleLoading(false);

    }
  };


  // =====================================================
  // INITIALIZE GOOGLE SIGN IN
  // =====================================================

  useEffect(() => {

    let attempts = 0;

    const initializeGoogle = () => {

      // ---------------------------------------------
      // Check Google library
      // ---------------------------------------------

      if (
        !window.google ||
        !window.google.accounts ||
        !window.google.accounts.id
      ) {

        attempts++;

        if (attempts < 50) {

          setTimeout(
            initializeGoogle,
            200
          );

        }

        return;
      }


      // ---------------------------------------------
      // Check Client ID
      // ---------------------------------------------

      if (!GOOGLE_CLIENT_ID) {

        console.error(
          "VITE_GOOGLE_CLIENT_ID is missing."
        );

        return;
      }


      // ---------------------------------------------
      // Initialize Google
      // ---------------------------------------------

      window.google.accounts.id.initialize({

        client_id: GOOGLE_CLIENT_ID,

        callback: handleGoogleResponse,

      });


      // ---------------------------------------------
      // Render Google button
      // ---------------------------------------------

      if (googleButtonRef.current) {

        googleButtonRef.current.innerHTML = "";

        window.google.accounts.id.renderButton(
          googleButtonRef.current,
          {
            type: "standard",
            theme: "outline",
            size: "large",
            text: "continue_with",
            shape: "rectangular",
            width: 300,
          }
        );

      }

    };


    initializeGoogle();


    // ---------------------------------------------
    // Cleanup
    // ---------------------------------------------

    return () => {

      if (googleButtonRef.current) {
        googleButtonRef.current.innerHTML = "";
      }

    };

  }, []);


  // =====================================================
  // NORMAL LOGIN
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    console.log({
      email,
      password,
      rememberMe,
    });

    // ---------------------------------------------
    // Temporary
    // ---------------------------------------------

    setErrorMessage(
      "Email/password login will be connected next."
    );
  };


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <main
      className="login-page"
      style={{
        backgroundImage: `url(${vendorBg})`,
      }}
    >

      <div className="login-overlay"></div>


      <div className="login-container">


        {/* =================================================
            HEADER CARD
        ================================================= */}

        <section className="login-header-card">

          <img
            src={logo}
            alt="Event Planning"
            className="login-logo"
          />


          <h1>
            Welcome Back
          </h1>


          <p>
            Sign in to your account
          </p>

        </section>



        {/* =================================================
            LOGIN CARD
        ================================================= */}

        <section className="login-form-card">

          {/* =================================================
              ERROR
          ================================================= */}

          {errorMessage && (

            <div className="login-message login-error">

              {errorMessage}

            </div>

          )}


          {/* =================================================
              SUCCESS
          ================================================= */}

          {successMessage && (

            <div className="login-message login-success">

              {successMessage}

            </div>

          )}


          <form onSubmit={handleSubmit}>


            {/* =================================================
                CUSTOMER LOGIN
            ================================================= */}

            <button
              type="button"
              className="customer-login-btn"
            >
              Customer Login
            </button>



            {/* =================================================
                EMAIL
            ================================================= */}

            <div className="login-field">

              <label>
                Email Address
              </label>


              <div className="login-input-wrapper">

                <span className="login-input-icon">
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
                PASSWORD
            ================================================= */}

            <div className="login-field">

              <label>
                Password
              </label>


              <div className="login-input-wrapper">

                <span className="login-input-icon">
                  🔒
                </span>


                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                  disabled={loading}
                />

              </div>

            </div>



            {/* =================================================
                REMEMBER + FORGOT
            ================================================= */}

            <div className="login-options">


              <label className="remember-me">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(
                      e.target.checked
                    )
                  }
                />


                <span>
                  Remember me
                </span>

              </label>



              <button
                type="button"
                className="forgot-password"
              >
                Forgot password?
              </button>

            </div>



            {/* =================================================
                SIGN IN
            ================================================= */}

            <button
              type="submit"
              className="sign-in-btn"
              disabled={loading}
            >

              {loading
                ? "Signing in..."
                : "Sign In"
              }

            </button>



            {/* =================================================
                SIGN UP
            ================================================= */}

            <p className="signup-text">

              Don't have an account?

              <button
                type="button"
                className="signup-link"
                onClick={() =>
                  navigate("/signup")
                }
              >
                Sign up
              </button>

            </p>



            {/* =================================================
                DIVIDER
            ================================================= */}

            <div className="login-divider">

              <span></span>

              <p>
                Or continue with
              </p>

              <span></span>

            </div>



            {/* =================================================
                GOOGLE LOGIN
            ================================================= */}

            <div
              className="google-login-container"
              ref={googleButtonRef}
            >
              {googleLoading && (
                <p>
                  Connecting to Google...
                </p>
              )}
            </div>



            {/* =================================================
                FACEBOOK LOGIN
            ================================================= */}

            <button
              type="button"
              className="social-btn facebook-login-btn"
              disabled
            >

              <FacebookIcon />

              <span>
                Facebook
              </span>

            </button>


          </form>

        </section>

      </div>

    </main>
  );
}


/* =====================================================
   FACEBOOK ICON
===================================================== */

function FacebookIcon() {

  return (

    <svg
      width="24"
      height="24"
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


export default Login;