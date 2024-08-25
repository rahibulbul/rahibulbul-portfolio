import React, { useState, useEffect, useRef } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { countryData } from "./phoneUtils";

const ValidatePhoneInput = ({
  label,
  placeholder,
  errorMessage,
  requiredMessage = "Please type something", // Default required message
  defaultCountry,
  width = "100%",
  height = "50px",
  marginTop = "30px",
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false); // Track focus state
  const [showRequiredError, setShowRequiredError] = useState(false); // Control visibility of required message
  const dropdownRef = useRef(null);

  useEffect(() => {
    const countryToUse = defaultCountry || "US";
    const defaultCountryData = countryData.find(
      (country) =>
        country.code.toLowerCase() === countryToUse.toLowerCase() ||
        country.dialCode === countryToUse.replace(/^0+/, "")
    );

    if (defaultCountryData) {
      setSelectedCountry(defaultCountryData);
    } else {
      setSelectedCountry(countryData.find((country) => country.code === "US"));
    }
  }, [defaultCountry]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    setPhoneNumber(inputValue);

    if (inputValue.length >= 7) {
      setError("");
      setShowRequiredError(false);
    } else {
      setError(errorMessage);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    setIsFocused(false); // Handle blur event
    if (!phoneNumber) {
      setError(requiredMessage);
      setShowRequiredError(true); // Show the "Please type something" message
    } else if (phoneNumber.length < 7) {
      setError(errorMessage);
      setShowRequiredError(false);
    } else {
      setError("");
      setShowRequiredError(false);
    }
  };

  const handleFocus = () => {
    setIsFocused(true); // Handle focus event
    setTouched(true);
    setShowRequiredError(false);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowDropdown(false);
  };

  const filteredCountries = countryData
    .filter(
      (country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.dialCode.includes(searchQuery)
    )
    .reduce((uniqueCountries, currentCountry) => {
      const exists = uniqueCountries.find(
        (country) => country.code === currentCountry.code
      );
      if (!exists) {
        uniqueCountries.push(currentCountry);
      }
      return uniqueCountries;
    }, []);

  const containerStyle = {
    width: "100%",
    height: "100%",
    position: "relative",
    marginBottom: "1rem",
    marginTop: marginTop,
  };

  const wrapperStyle = {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    height: "100%",
  };

  const countrySelectorStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    height: "100%",
    position: "relative",
  };

  const countrySelectorButtonStyle = {
    background: "none",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    height: height,
    width: "100%",
    backgroundColor: "white",
    // border: "solid 1px #696969",
    border: `solid 2px ${
      error
        ? "#e74c3c"
        : isFocused || (touched && !error && phoneNumber)
        ? "#36454F"
        : "#B2BEB5"
    }`,
    borderRadius: "10px",
    outline: "none",
    transition: "0.6s",
    position: "relative",
    boxShadow: isFocused
      ? "0px 12px 28px 0px rgba(0, 0, 0, 0.2), 0px 2px 4px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px rgba(255, 255, 255, 0.05) inset"
      : undefined,
  };

  const inputFieldStyle = {
    width: "100%",
    height: height,
    border: "solid 2px #B2BEB5",
    borderRadius: "10px",
    padding: "0px 20px",
    boxSizing: "border-box",
    fontSize: "18px",
    fontWeight: "600",
    transition: "all 0.5s ease-in-out",
    outline: "none",
    boxShadow: isFocused
      ? "0px 12px 28px 0px rgba(0, 0, 0, 0.2), 0px 2px 4px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px rgba(255, 255, 255, 0.05) inset"
      : undefined,
    border: `solid 2px ${
      error
        ? "#e74c3c"
        : isFocused || (touched && !error && phoneNumber)
        ? "#36454F"
        : "#B2BEB5"
    }`,
  };

  const labelStyle = {
    position: "absolute",
    left: "85px",
    top: "35%",
    transform:
      isFocused || (touched && phoneNumber)
        ? "translateY(-150%)"
        : "translateY(-50%)",
    color: isFocused || (touched && phoneNumber) ? "black" : "#696969",
    fontWeight: "600",
    pointerEvents: "none",
    transition: "transform 0.5s, color 0.5s",
    backgroundColor:
      isFocused || (touched && phoneNumber) ? "#fff" : "transparent",
    padding: "0px 10px",
    zIndex: 1,
  };

  const errorIconStyle = {
    position: "absolute",
    top: "40%",
    transform: "translateY(-50%)",
    marginLeft: "8px",
    fontSize: "20px",
    right: "-30px",
  };

  const dropdownStyle = {
    position: "absolute",
    top: "100%",
    left: 0,
    zIndex: 10,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "300px",
    maxHeight: "300px",
    overflowY: "auto",
  };

  const searchInputStyle = {
    position: "sticky",
    top: 0,
    width: "100%",
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
    zIndex: 20,
  };

  const countryCodeStyle = {
    padding: "0.2rem 0rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  };

  const countryCodeFlagNameStyle = {
    width: "100%",
    padding: "0.25rem 0px",
    fontWeight: "600",
  };

  return (
    <div
      className="phone-input-container"
      style={containerStyle}
      ref={dropdownRef}
    >
      <div className="phone-input-wrapper" style={wrapperStyle}>
        <div
          className="phone-input-country-selector"
          style={countrySelectorStyle}
        >
          <button
            className="phone-input-country-selector-button"
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            style={countrySelectorButtonStyle}
          >
            {selectedCountry.flag && (
              <span style={{ marginRight: "0.5rem" }}>
                {selectedCountry.flag}
              </span>
            )}
            {selectedCountry.dialCode && (
              <span style={{ marginRight: "0.5rem" }}>
                +{selectedCountry.dialCode}
              </span>
            )}
          </button>
          {showDropdown && (
            <div style={dropdownStyle}>
              <input
                className="phone-country-search"
                type="text"
                placeholder="Search country"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={searchInputStyle}
              />
              <div
                className="phone-country-list"
                style={{ paddingTop: "0rem" }}
              >
                {filteredCountries.map((country) => (
                  <div
                    className="phone-country-code"
                    key={country.code}
                    onClick={() => handleCountrySelect(country)}
                    style={countryCodeStyle}
                  >
                    <div
                      className="phone-country-code-flag-name"
                      style={countryCodeFlagNameStyle}
                    >
                      <span
                        className="phone-country-code-flag"
                        style={{ marginLeft: "1rem", marginRight: "0.5rem" }}
                      >
                        {country.flag}
                      </span>
                      <span className="phone-country-code-name">
                        {country.name} (+{country.dialCode})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <input
          className="phone-input-field"
          type="text"
          placeholder={placeholder}
          value={phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          required
          style={inputFieldStyle}
        />
        <label className="phone-input-label" style={labelStyle}>
          {label}
        </label>
      </div>
      {touched && (
        <span className="error-icon-phone" style={errorIconStyle}>
          {error ? (
            <FaExclamationCircle style={{ color: "#e74c3c" }} />
          ) : (
            phoneNumber && <FaCheckCircle style={{ color: "#2ecc71" }} />
          )}
        </span>
      )}
      <p
        style={{
          color: showRequiredError ? "red" : "transparent", // Set color based on visibility state
          marginTop: "-1px",
          marginLeft: "15px",
          fontSize: "14px",
          fontWeight: "600",
          transition: "color 0.5s ease-in-out", // Smooth transition when error appears/disappears
          height: "16px", // Fixed height to prevent shifting
          lineHeight: "16px", // Ensure it aligns with text size
        }}
      >
        {error}
      </p>
    </div>
  );
};

export default ValidatePhoneInput;
