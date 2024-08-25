// import React from "react";
// import "./style.css";

// const ValidateSelect = ({ options, onChange, className, label }) => {
//   return (
//     <div className={`input-select ${className}`}>
//       <select className="select" onChange={onChange} required>
//         {options.map((option, index) => (
//           <option key={index} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//       <label className="input-label">{label}</label>
//     </div>
//   );
// };

// export default ValidateSelect;

import React, { useState } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const ValidateSelect = ({
  options,
  onChange = () => {}, // Default onChange function
  className,
  label,
  validate = (value) => value !== "", // Default validation function
  errorMessage,
  requiredMessage = "Please select an option",
  fontSize,
  fontWeight,
  iconFontSize,
}) => {
  const [value, setValue] = useState(""); // Initialize with empty value
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setValue(selectedValue);

    if (validate(selectedValue)) {
      setError("");
    } else {
      setError(errorMessage);
    }

    onChange(e); // Call the onChange prop function
  };

  const handleBlur = () => {
    setTouched(true);
    setIsFocused(false);

    if (!value) {
      setError(requiredMessage);
    } else if (!validate(value)) {
      setError(errorMessage);
    } else {
      setError("");
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setTouched(true);
  };

  const selectStyle = {
    width: "100%",
    height: "50px",
    border: `solid 2px ${
      error ? "#e74c3c" : isFocused || value ? "black" : "#B2BEB5"
    }`,
    borderRadius: "10px",
    fontSize: fontSize || "16px",
    fontWeight: fontWeight || "600",
    outline: "none",
    padding: "0px 35px 0px 30px",
    transition: "0.6s",
    background: "none",
  };

  const labelStyle = {
    position: "absolute",
    left: "0",
    padding: "0px 10px",
    fontSize: "16px",
    fontWeight: "400",
    color: isFocused || (touched && value) ? "black" : "#696969",
    margin: "15px 20px",
    transition: "transform 0.5s, color 0.5s",
    transform:
      isFocused || (touched && value)
        ? "translate(0px, -28px)"
        : "translate(0px, -4px)",
    pointerEvents: "none",
    backgroundColor: isFocused || (touched && value) ? "#fff" : "#fff",
    fontWeight: "600",
  };

  const errorTextStyle = {
    position: "absolute",
    bottom: "-20px",
    left: "0",
    color: error ? "red" : "transparent",
    fontSize: "14px",
    fontWeight: "600",
    margin: "0",
    padding: "0",
    lineHeight: "1",
    height: "auto",
    transition: "color 0.5s ease-in-out",
  };

  const iconStyle = {
    position: "absolute",
    top: "45%",
    transform: "translateY(-50%)",
    right: "-25px",
    fontSize: iconFontSize || "20px",
  };

  return (
    <div
      className={`input-select ${className}`}
      style={{
        position: "relative",
        width: "100%",
        marginTop: "30px",
      }}
    >
      <select
        style={selectStyle}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        required
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label style={labelStyle}>{label}</label>
      {touched && (
        <span className="error-icon" style={iconStyle}>
          {error ? (
            <FaExclamationCircle style={{ color: "#e74c3c" }} />
          ) : (
            value && <FaCheckCircle style={{ color: "#2ecc71" }} />
          )}
        </span>
      )}
      <p style={errorTextStyle}>{error}</p>
    </div>
  );
};

export default ValidateSelect;
