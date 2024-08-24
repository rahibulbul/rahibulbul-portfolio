import React, { useState } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import "./style.css";

const ValidatedInput = ({
  label,
  validate,
  errorMessage,
  requiredMessage,
  transform,
  fontSize,
  fontWeight,
  className,
  width,
  height,
  fontFamily,
  BoxShadow,
  iconFontSize,
}) => {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    let inputValue = e.target.value;

    if (transform) {
      inputValue = transform(inputValue);
    }

    setValue(inputValue);

    if (validate(inputValue)) {
      setError("");
    } else {
      setError(errorMessage);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (!value) {
      setError(requiredMessage);
    } else if (!validate(value)) {
      setError(errorMessage);
    } else {
      setError("");
    }
  };

  // Combine custom styles with external CSS class
  const inputStyle = {
    fontSize: fontSize || undefined,
    fontWeight: fontWeight || undefined,
    height: height || undefined,
    width: width || undefined,
    fontFamily: fontFamily || undefined,
    BoxShadow: BoxShadow || undefined,
  };
  const iconStyle = {
    fontSize: iconFontSize || undefined,
  };

  return (
    <div className={`validated-input ${className || ""}`}>
      <input
        style={inputStyle}
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={() => setTouched(true)}
        className={error ? "error" : ""}
        required
      />
      <label>{label}</label>
      {touched && (
        <span className="error-icon" style={iconStyle}>
          {error ? (
            <FaExclamationCircle style={{ color: "#e74c3c" }} />
          ) : (
            value && <FaCheckCircle style={{ color: "#2ecc71" }} />
          )}
        </span>
      )}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default ValidatedInput;
