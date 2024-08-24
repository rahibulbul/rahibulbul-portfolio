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
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordStrengthLabel, setPasswordStrengthLabel] = useState(
    "Enter your password"
  );

  const validatePassword = (password) => {
    if (password.length < 8) return { strength: 0, label: "Too Short" };
    if (password.length > 20) return { strength: 0, label: "Too Big" };

    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /\W/.test(password);

    const strength = [hasLower, hasUpper, hasNumber, hasSpecial].filter(
      Boolean
    ).length;

    switch (strength) {
      case 4:
        return { strength: 5, label: "Strongest" };
      case 3:
        return { strength: 4, label: "Strong" };
      case 2:
        return { strength: 3, label: "Medium" };
      case 1:
        return { strength: 2, label: "Weak" };
      default:
        return { strength: 1, label: "Too Weak" };
    }
  };

  const handleChange = (e) => {
    let inputValue = e.target.value;

    if (transform) {
      inputValue = transform(inputValue);
    }

    setValue(inputValue);

    const { strength, label } = validatePassword(inputValue);
    setPasswordStrength(strength);
    setPasswordStrengthLabel(label);

    if (strength >= 3) {
      setError("");
    } else {
      setError(errorMessage);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (!value) {
      setError(requiredMessage || "Enter password");
    } else if (passwordStrength < 3) {
      setError(errorMessage);
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

  const getStrengthColor = (label) => {
    if (label === "Too Short" || label === "Too Big" || label === "Too Weak") {
      return "#e74c3c"; // Red for too short, too big, or too weak
    }
    switch (label) {
      case "Weak":
        return "#f1c40f"; // Yellow for weak
      case "Medium":
        return "#e67e22"; // Orange for medium
      case "Strong":
        return "#27ae60"; // Green for strong
      case "Strongest":
        return "#2ecc71"; // Dark Green for strongest
      default:
        return "#696969"; // Light grey for initial state
    }
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
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
      {touched && (
        <span className="error-icon-password" style={iconStyle}>
          {error ? (
            <FaExclamationCircle style={{ color: "#e74c3c" }} />
          ) : (
            value && <FaCheckCircle style={{ color: "#2ecc71" }} />
          )}
        </span>
      )}
      <p
        className="error-text"
        style={{ color: error ? "#e74c3c" : "transparent" }}
      >
        {error || "Enter password"}
      </p>

      <div
        className="password-strength-meter"
        style={{
          borderRadius: "5px",
        }}
      >
        <div
          className="strength-label"
          style={{ color: getStrengthColor(passwordStrengthLabel) }}
        >
          {passwordStrengthLabel}
        </div>
        <div
          className="strength-bar"
          style={{
            backgroundColor: getStrengthColor(passwordStrengthLabel),
            height: "10px",
            width: "100%",
            borderRadius: "5px",
            marginTop: "5px",
          }}
        />
      </div>
    </div>
  );
};

export default ValidatePassword;
