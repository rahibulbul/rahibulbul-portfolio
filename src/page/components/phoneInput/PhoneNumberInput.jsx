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

    // Add event listener when the dropdown is shown
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

  const filteredCountries = countryData.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.dialCode.includes(searchQuery)
  );

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
                width: "250px",
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
              <input
                type="text"
                placeholder="Search country"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  marginBottom: "0.5rem",
                }}
              />
              {filteredCountries.map((country) => (
                <div
                  key={country.code}
                  onClick={() => handleCountrySelect(country)}
                  style={{
                    padding: "0.5rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span style={{ marginRight: "0.5rem" }}>{country.flag}</span>
                  <span>
                    {country.name} (+{country.dialCode})
                  </span>
                </div>
              ))}
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
        <span
          className="error-icon-phone"
          // style={{
          //   position: "absolute",
          //   right: "10px",
          //   top: "50%",
          //   transform: "translateY(-50%)",
          // }}
        >
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

// import React, { useState, useEffect, useRef } from "react";
// import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
// import { countryData } from "./phoneUtils";
// import "./style.css";

// const PhoneNumberInput = ({
//   label,
//   placeholder,
//   errorMessage,
//   requiredMessage,
//   defaultCountry,
// }) => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [selectedCountry, setSelectedCountry] = useState({});
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [touched, setTouched] = useState(false);
//   const [error, setError] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const countryToUse = defaultCountry || "US";
//     const defaultCountryData = countryData.find(
//       (country) =>
//         country.code.toLowerCase() === countryToUse.toLowerCase() ||
//         country.dialCode === countryToUse.replace(/^0+/, "")
//     );

//     if (defaultCountryData) {
//       setSelectedCountry(defaultCountryData);
//     } else {
//       setSelectedCountry(countryData.find((country) => country.code === "US"));
//     }
//   }, [defaultCountry]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };

//     if (showDropdown) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showDropdown]);

//   const handleChange = (e) => {
//     const inputValue = e.target.value.replace(/\D/g, ""); // Only digits
//     setPhoneNumber(inputValue);

//     // Validation: Minimum length, maximum length, and custom pattern
//     if (inputValue.length < 7) {
//       setError("Phone number must be at least 7 digits.");
//     } else if (inputValue.length > 15) {
//       setError("Phone number cannot exceed 15 digits.");
//     } else if (!/^\d+$/.test(inputValue)) {
//       setError("Phone number can only contain digits.");
//     } else {
//       setError(""); // No error
//     }
//   };

//   const handleBlur = () => {
//     setTouched(true);

//     if (!phoneNumber) {
//       setError(requiredMessage); // Required field message
//     } else if (phoneNumber.length < 7) {
//       setError("Phone number must be at least 7 digits.");
//     } else if (phoneNumber.length > 15) {
//       setError("Phone number cannot exceed 15 digits.");
//     } else if (!/^\d+$/.test(phoneNumber)) {
//       setError("Phone number can only contain digits.");
//     } else {
//       setError(""); // No error
//     }
//   };

//   const handleCountrySelect = (country) => {
//     setSelectedCountry(country);
//     setShowDropdown(false);
//   };

//   const filteredCountries = countryData.filter(
//     (country) =>
//       country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       country.dialCode.includes(searchQuery)
//   );

//   return (
//     <div className="phone-input-container" ref={dropdownRef}>
//       <div className="phone-input-wrapper">
//         <div className="phone-input-country-selector">
//           <button
//             type="button"
//             onClick={() => setShowDropdown(!showDropdown)}
//             className="country-selector-button"
//           >
//             {selectedCountry.flag && (
//               <span className="country-flag">{selectedCountry.flag}</span>
//             )}
//             {selectedCountry.dialCode && (
//               <span className="country-dial-code">
//                 +{selectedCountry.dialCode}
//               </span>
//             )}
//           </button>
//           {showDropdown && (
//             <div className="dropdown">
//               <input
//                 type="text"
//                 placeholder="Search country"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="dropdown-search"
//                 required
//               />
//               {filteredCountries.map((country) => (
//                 <div
//                   key={country.code}
//                   onClick={() => handleCountrySelect(country)}
//                   className="dropdown-item"
//                 >
//                   <span className="country-flag">{country.flag}</span>
//                   <span>
//                     {country.name} (+{country.dialCode})
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         <div className="phone-input-text">
//           <input
//             type="text"
//             placeholder={placeholder}
//             value={phoneNumber}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             onFocus={() => setTouched(true)}
//             className={`phone-input-field ${error ? "input-error" : ""}`}
//           />
//           <label className="phone-input-label">{label}</label>
//         </div>
//       </div>

//       {touched && (
//         <span className="validation-icon">
//           {error ? (
//             <FaExclamationCircle className="error-icon" />
//           ) : (
//             phoneNumber && <FaCheckCircle className="success-icon" />
//           )}
//         </span>
//       )}
//       {error && <p className="error-message">{error}</p>}
//     </div>
//   );
// };

// export default PhoneNumberInput;

// import React, { useState, useEffect, useRef } from "react";
// import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
// import { countryData } from "./phoneUtils";
// import "./style.css";

// const PhoneNumberInput = ({
//   label,
//   placeholder,
//   errorMessage,
//   requiredMessage,
//   defaultCountry,
// }) => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [selectedCountry, setSelectedCountry] = useState({});
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [touched, setTouched] = useState(false);
//   const [error, setError] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const countryToUse = defaultCountry || "US";
//     const defaultCountryData = countryData.find(
//       (country) =>
//         country.code.toLowerCase() === countryToUse.toLowerCase() ||
//         country.dialCode === countryToUse.replace(/^0+/, "")
//     );

//     if (defaultCountryData) {
//       setSelectedCountry(defaultCountryData);
//     } else {
//       setSelectedCountry(countryData.find((country) => country.code === "US"));
//     }
//   }, [defaultCountry]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };

//     if (showDropdown) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showDropdown]);

//   const handleChange = (e) => {
//     const inputValue = e.target.value.replace(/\D/g, ""); // Only digits
//     setPhoneNumber(inputValue);

//     // Validation: Minimum length, maximum length, and custom pattern
//     if (inputValue.length < 7) {
//       setError("Phone number must be at least 7 digits.");
//     } else if (inputValue.length > 15) {
//       setError("Phone number cannot exceed 15 digits.");
//     } else if (!/^\d+$/.test(inputValue)) {
//       setError("Phone number can only contain digits.");
//     } else {
//       setError(""); // No error
//     }
//   };

//   const handleBlur = () => {
//     setTouched(true);

//     if (!phoneNumber) {
//       setError(requiredMessage); // Required field message
//     } else if (phoneNumber.length < 7) {
//       setError("Phone number must be at least 7 digits.");
//     } else if (phoneNumber.length > 15) {
//       setError("Phone number cannot exceed 15 digits.");
//     } else if (!/^\d+$/.test(phoneNumber)) {
//       setError("Phone number can only contain digits.");
//     } else {
//       setError(""); // No error
//     }
//   };

//   const handleCountrySelect = (country) => {
//     setSelectedCountry(country);
//     setShowDropdown(false);
//   };

//   const filteredCountries = countryData.filter(
//     (country) =>
//       country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       country.dialCode.includes(searchQuery)
//   );

//   return (
//     <div className="phone-input-container" ref={dropdownRef}>
//       <div className="phone-input-wrapper">
//         <div className="phone-input-country-selector">
//           <button
//             type="button"
//             onClick={() => setShowDropdown(!showDropdown)}
//             className="country-selector-button"
//           >
//             {selectedCountry.flag && (
//               <span className="country-flag">{selectedCountry.flag}</span>
//             )}
//             {selectedCountry.dialCode && (
//               <span className="country-dial-code">
//                 +{selectedCountry.dialCode}
//               </span>
//             )}
//           </button>
//           {showDropdown && (
//             <div className="dropdown">
//               <input
//                 type="text"
//                 placeholder="Search country"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="dropdown-search"
//                 required
//               />
//               {filteredCountries.map((country) => (
//                 <div
//                   key={country.code}
//                   onClick={() => handleCountrySelect(country)}
//                   className="dropdown-item"
//                 >
//                   <span className="country-flag">{country.flag}</span>
//                   <span>
//                     {country.name} (+{country.dialCode})
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         <div className="phone-input-text">
//           <input
//             type="text"
//             placeholder={placeholder}
//             value={phoneNumber}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             onFocus={() => setTouched(true)}
//             className={`phone-input-field ${error ? "input-error" : ""}`}
//             pattern=".{7,15}" // Enforces validation by default
//             required // Ensures the input is required
//           />
//           <label className="phone-input-label">{label}</label>
//         </div>
//       </div>

//       {touched && (
//         <span className="validation-icon">
//           {error ? (
//             <FaExclamationCircle className="error-icon" />
//           ) : (
//             phoneNumber && <FaCheckCircle className="success-icon" />
//           )}
//         </span>
//       )}
//       {error && <p className="error-message">{error}</p>}
//     </div>
//   );
// };

// export default PhoneNumberInput;
