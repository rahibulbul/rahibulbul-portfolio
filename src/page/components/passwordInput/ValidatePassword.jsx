import React, { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import "./style.css";

const ValidatePassword = ({
  label,
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
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null); // null initially
  const [passwordStrengthLabel, setPasswordStrengthLabel] = useState(
    "Enter your password"
  );

  const validatePassword = (password) => {
    if (password.length < 8)
      return { strength: 1, label: "Password Too Short", color: "#e74c3c" };
    if (password.length > 20)
      return { strength: 0, label: "Password Too Big", color: "#e74c3c" }; // Set strength to 0 for "Too Big"

    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /\W/.test(password);

    const strength = [hasLower, hasUpper, hasNumber, hasSpecial].filter(
      Boolean
    ).length;

    switch (strength) {
      case 4:
        return {
          strength: 5,
          label: "Password is Strongest",
          color: "#2ecc71",
        };
      case 3:
        return { strength: 4, label: "Password is Strong", color: "#27ae60" };
      case 2:
        return { strength: 3, label: "Password is Medium", color: "#e67e22" };
      case 1:
        return { strength: 2, label: "Password is Weak", color: "#f1c40f" };
      default:
        return { strength: 1, label: "Password is Too Weak", color: "#e74c3c" };
    }
  };

  const handleChange = (e) => {
    let inputValue = e.target.value;

    if (transform) {
      inputValue = transform(inputValue);
    }

    setValue(inputValue);

    if (!inputValue) {
      // Clear the error and reset the bar when the input is cleared
      setPasswordStrength(null);
      setPasswordStrengthLabel("Enter your password");
      setError(requiredMessage || "Enter password");
    } else {
      const { strength, label, color } = validatePassword(inputValue);
      setPasswordStrength(strength);
      setPasswordStrengthLabel(label);

      if (strength >= 2) {
        setError("");
      } else {
        setError(errorMessage);
      }
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (!value) {
      setError(requiredMessage || "Password cannot be empty.");
      setPasswordStrengthLabel(requiredMessage || "Password cannot be empty.");
    } else if (passwordStrength < 2) {
      setError(errorMessage);
      setPasswordStrengthLabel(errorMessage);
    } else {
      setError("");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const inputType = showPassword ? "text" : "password";

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

  const getStrengthColor = (strength, index) => {
    if (strength === null) return "#B2BEB5"; // Default light grey for initial state
    if (strength === 0) return "#e74c3c"; // Red for all segments if the password is too big
    if (strength === 1 && index === 0) return "#e74c3c"; // Red for the first bar segment if strength is 1
    if (strength > index) {
      switch (strength) {
        case 2:
          return "#f1c40f"; // Weak
        case 3:
          return "#e67e22"; // Medium
        case 4:
          return "#2ecc71"; // Strong
        case 5:
          return "#27ae60"; // Strongest
        default:
          return "#B2BEB5"; // Default light grey
      }
    }
    return "#B2BEB5"; // Default light grey for all others
  };

  return (
    <div className={`validated-password ${className || ""}`}>
      <input
        style={inputStyle}
        type={inputType}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={() => setTouched(true)}
        className={error ? "error" : ""}
        required
      />
      <label>{label}</label>
      <span
        className="eye-icon-password"
        onClick={toggleShowPassword}
        style={iconStyle}
      >
        {showPassword ? <FaEye /> : <FaEyeSlash />}
      </span>
      <div
        className="password-strength-meter"
        style={{
          borderRadius: "5px",
        }}
      >
        <div
          className="strength-label"
          style={{ color: error ? "#e74c3c" : "#696969" }} // Apply red color if there's an error
        >
          {passwordStrengthLabel}
        </div>
        <div className="strength-bar-wrapper">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`strength-bar-segment ${
                passwordStrength !== null && passwordStrength > index
                  ? "active"
                  : ""
              }`}
              style={{
                backgroundColor: getStrengthColor(passwordStrength, index),
                transition: "background-color 0.5s ease",
              }}
            />
          ))}
        </div>
      </div>
      {touched && (
        <span className="error-icon-password" style={iconStyle}>
          {error ? (
            <FaExclamationCircle style={{ color: "#e74c3c" }} />
          ) : (
            value && <FaCheckCircle style={{ color: "#2ecc71" }} />
          )}
        </span>
      )}
    </div>
  );
};

export default ValidatePassword;
