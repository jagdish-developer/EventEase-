import React, { useState } from "react";
import "./VendorRegistration.css";
import vendorBg from "../assets/images/vendor-bg.png";

const VendorRegistration = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    description: "",
    email: "",
    phone: "",
    address: "",
    city: "Nashik",
    minPrice: "",
    maxPrice: "",
    services: "",
    agreeToTerms: false,
  });

  const [location, setLocation] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        alert("Location captured successfully!");
      },
      () => {
        alert("Unable to access your location. Please allow location permission.");
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Vendor Data:", {
      ...formData,
      location,
    });

    alert("Vendor registration form submitted!");
  };

  return (
    <div
      className="vendor-page"
      style={{ backgroundImage: `url(${vendorBg})` }}
    >
      <div className="vendor-overlay"></div>

      <form className="vendor-card" onSubmit={handleSubmit}>
        <h1 className="vendor-title">Vendor Registration</h1>

        {/* Business Name */}
        <div className="vendor-input full">
          <span className="vendor-icon">🏪</span>

          <input
            type="text"
            placeholder="Business / Shop Name"
            value={formData.businessName}
            onChange={(e) =>
              handleChange("businessName", e.target.value)
            }
            required
          />
        </div>

        {/* Category */}
        <div className="vendor-input full">
          <span className="vendor-icon">📋</span>

          <select
            value={formData.category}
            onChange={(e) =>
              handleChange("category", e.target.value)
            }
            required
          >
            <option value="">Business Category</option>
            <option value="venue">Venues</option>
            <option value="caterer">Caterers</option>
            <option value="photographer">Photographers</option>
            <option value="decorator">Decorators</option>
            <option value="music_dj">Music & DJ</option>
            <option value="planner">Event Planners</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Description */}
        <div className="vendor-input description-box">
          <span className="vendor-icon">📝</span>

          <textarea
            placeholder="Describe your business and services..."
            value={formData.description}
            onChange={(e) =>
              handleChange("description", e.target.value)
            }
            required
          />
        </div>

        {/* Email */}
        <div className="vendor-input full">
          <span className="vendor-icon">✉️</span>

          <input
            type="email"
            placeholder="Business Email"
            value={formData.email}
            onChange={(e) =>
              handleChange("email", e.target.value)
            }
            required
          />
        </div>

        {/* Phone */}
        <div className="vendor-input full">
          <span className="vendor-icon">📞</span>

          <input
            type="tel"
            placeholder="+91 9876543210"
            value={formData.phone}
            onChange={(e) =>
              handleChange("phone", e.target.value)
            }
            required
          />
        </div>

        {/* Address */}
        <div className="vendor-input full">
          <span className="vendor-icon">🏠</span>

          <input
            type="text"
            placeholder="Full Business Address"
            value={formData.address}
            onChange={(e) =>
              handleChange("address", e.target.value)
            }
            required
          />
        </div>

        {/* City */}
        <div className="vendor-input full">
          <span className="vendor-icon">📍</span>

          <select
            value={formData.city}
            onChange={(e) =>
              handleChange("city", e.target.value)
            }
          >
            <option value="Nashik">Nashik</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Location */}
        <button
          type="button"
          className="location-button"
          onClick={getCurrentLocation}
        >
          📍 Capture My Current Location
        </button>

        {location && (
          <div className="location-success">
            ✓ Location captured successfully
          </div>
        )}

        {/* Price Range */}
        <div className="vendor-row">
          <div className="vendor-input half">
            <span className="vendor-icon">₹</span>

            <input
              type="number"
              placeholder="Minimum Price"
              value={formData.minPrice}
              onChange={(e) =>
                handleChange("minPrice", e.target.value)
              }
              required
            />
          </div>

          <div className="vendor-input half">
            <span className="vendor-icon">₹</span>

            <input
              type="number"
              placeholder="Maximum Price"
              value={formData.maxPrice}
              onChange={(e) =>
                handleChange("maxPrice", e.target.value)
              }
              required
            />
          </div>
        </div>

        {/* Services */}
        <div className="vendor-input full">
          <span className="vendor-icon">🎯</span>

          <input
            type="text"
            placeholder="Services Offered (e.g. Wedding, Birthday, Corporate)"
            value={formData.services}
            onChange={(e) =>
              handleChange("services", e.target.value)
            }
            required
          />
        </div>

        {/* Terms */}
        <label className="terms-row">
          <input
            type="checkbox"
            checked={formData.agreeToTerms}
            onChange={(e) =>
              handleChange("agreeToTerms", e.target.checked)
            }
            required
          />

          <span>
            I agree to the{" "}
            <span className="terms-link">Terms of Services</span>{" "}
            and{" "}
            <span className="terms-link">Privacy Policy</span>
          </span>
        </label>

        {/* Submit */}
        <button type="submit" className="create-button">
          Register as Vendor
        </button>
      </form>
    </div>
  );
};

export default VendorRegistration;