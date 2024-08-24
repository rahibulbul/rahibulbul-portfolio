import React, { useState, useEffect, useRef } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { countryData } from "./phoneUtils";
import "./style.css";

const PhoneNumberInput = ({
  label,
  placeholder,
  errorMessage,
  requiredMessage,
  defaultCountry,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
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
    } else {
      setError(errorMessage);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (!phoneNumber) {
      setError(requiredMessage);
    } else if (phoneNumber.length < 7) {
      setError(errorMessage);
    } else {
      setError("");
    }
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

  return (
    <div
      className="phone-input-container"
      style={{ marginBottom: "1rem", position: "relative" }}
      ref={dropdownRef}
    >
      <div
        className="phone-input-wrapper"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div
          className="phone-input-country-selector"
          style={{ position: "relative" }}
        >
          <button
            className="phone-input-country-selector-button"
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
              background: "none",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
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
            <div
              style={{
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
              }}
            >
              <input
                className="phone-country-search"
                type="text"
                placeholder="Search country"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  position: "sticky",
                  top: 0,
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  backgroundColor: "#fff",
                  zIndex: 20,
                }}
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
                    style={{
                      padding: "0.2rem 0rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div className="phone-country-code-flag-name">
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
          onFocus={() => setTouched(true)}
          required
        />
        <label
          className="phone-input-label"
          style={{ display: "block", marginBottom: "0.5rem" }}
        >
          {label}
        </label>
      </div>
      {touched && (
        <span className="error-icon-phone">
          {error ? (
            <FaExclamationCircle style={{ color: "#e74c3c" }} />
          ) : (
            phoneNumber && <FaCheckCircle style={{ color: "#2ecc71" }} />
          )}
        </span>
      )}
      {error && (
        <p
          style={{
            color: "red",
            marginTop: "-3px",
            marginLeft: "15px",
            fontWeight: "600",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default PhoneNumberInput;
