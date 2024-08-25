import React, { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const ValidatePassword = ({
  label,
  value,
  setValue,
  originalPassword,
  errorMessage,
  requiredMessage,
  transform,
  fontSize,
  fontWeight,
  className,
  width,
  height = "50px", // Default height of 50px
  fontFamily,
  BoxShadow,
  iconFontSize,
  passwordsMatch,
}) => {
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [passwordStrengthLabel, setPasswordStrengthLabel] = useState(
    "Enter your password"
  );
  const [passwordStrengthColor, setPasswordStrengthColor] = useState("#696969");
  const [isFocused, setIsFocused] = useState(false);

  const validatePassword = (password) => {
    if (password.length < 8)
      return { strength: 1, label: "Password Too Short", color: "#e74c3c" };
    if (password.length > 20)
      return { strength: 0, label: "Password Too Big", color: "#e74c3c" };

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
      setPasswordStrength(null);
      setPasswordStrengthLabel("Enter your password");
      setPasswordStrengthColor("#696969");
      setError(requiredMessage || "Enter password");
    } else {
      const { strength, label, color } = validatePassword(inputValue);
      setPasswordStrength(strength);
      setPasswordStrengthLabel(label);
      setPasswordStrengthColor(color);

      if (originalPassword !== undefined && inputValue !== originalPassword) {
        setError(errorMessage || "Passwords do not match.");
      } else if (strength >= 2) {
        setError("");
      } else {
        setError(errorMessage);
      }
    }
  };

  const handleBlur = () => {
    setTouched(true);
    setIsFocused(false);
    if (!value) {
      setError(requiredMessage || "Password cannot be empty.");
      setPasswordStrengthLabel(requiredMessage || "Password cannot be empty.");
      setPasswordStrengthColor("#e74c3c");
    } else if (originalPassword !== undefined && value !== originalPassword) {
      setError(errorMessage || "Passwords do not match.");
      setPasswordStrengthLabel(errorMessage || "Passwords do not match.");
      setPasswordStrengthColor("#e74c3c");
    } else if (passwordStrength < 2) {
      setError(errorMessage);
      setPasswordStrengthLabel(errorMessage);
      setPasswordStrengthColor("#e74c3c");
    } else {
      setError("");
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setTouched(true);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const inputType = showPassword ? "text" : "password";

  const inputStyle = {
    fontSize: fontSize || "18px",
    fontWeight: fontWeight || "600",
    height: height,
    width: "100%",
    fontFamily: fontFamily || undefined,
    boxShadow: BoxShadow || undefined,
    border: "solid 2px",
    borderColor: error ? "#e74c3c" : isFocused || value ? "#36454F" : "#B2BEB5",
    borderRadius: "10px",
    padding: "0px 30px 0px 20px",
    outline: "none",
    transition: "all 0.5s ease-in-out",
  };

  const labelStyle = {
    position: "absolute",
    left: "10px",
    top: isFocused || value ? "0%" : "25%",
    transform: "translateY(-50%)",
    color: isFocused || value ? "black" : "#696969",
    fontWeight: "600",
    pointerEvents: "none",
    transition: "transform 0.5s, color 0.5s, top 0.5s",
    backgroundColor: isFocused || value ? "#fff" : "transparent",
    padding: isFocused || value ? "0px 10px" : "0px 10px",
    zIndex: 1,
  };

  const iconStyle = {
    fontSize: iconFontSize || "20px",
  };

  const getStrengthColor = (strength, index) => {
    if (strength === null) return "#D3D3D3";
    if (strength === 0) return "#e74c3c";
    if (strength === 1 && index === 0) return "#e74c3c";
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
          return "#D3D3D3"; // Default light grey
      }
    }
    return "#B2BEB5"; // Default light grey for all others
  };

  return (
    <div
      className={`validated-password ${className || ""}`}
      style={{
        position: "relative",
        width: width || "100%",
        height: "100%",
        minWidth: "300px", // Minimum width of 300px for the component
      }}
    >
      <input
        style={inputStyle}
        type={inputType}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className={error ? "error" : ""}
        required
      />
      <label style={labelStyle}>{label}</label>
      <span
        className="eye-icon-password"
        onClick={toggleShowPassword}
        style={{
          ...iconStyle,
          position: "absolute",
          top: "25%",
          transform: "translateY(-50%)",
          right: "10px",
          cursor: "pointer",
        }}
      >
        {showPassword ? <FaEye /> : <FaEyeSlash />}
      </span>
      <div
        className="password-strength-meter"
        style={{
          width: "100%",
          padding: "0px 10px",
          borderRadius: "5px",
        }}
      >
        <div
          className="strength-label"
          style={{
            color: passwordsMatch ? "#2ecc71" : passwordStrengthColor,
            textAlign: "center",
            fontWeight: "600",
            marginBottom: "5px",
          }}
        >
          {passwordsMatch ? "Passwords matched!" : passwordStrengthLabel}
        </div>
        <div
          className="strength-bar-wrapper"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "5px",
          }}
        >
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`strength-bar-segment ${
                passwordStrength !== null && passwordStrength > index
                  ? "active"
                  : ""
              }`}
              style={{
                width: "18%",
                height: "10px",
                borderRadius: "5px",
                backgroundColor: getStrengthColor(passwordStrength, index),
                transition: "background-color 0.5s ease",
              }}
            />
          ))}
        </div>
      </div>
      {touched && (
        <span
          className="error-icon-password"
          style={{
            ...iconStyle,
            position: "absolute",
            top: "25%",
            transform: "translateY(-50%)",
            right: "-25px",
            marginLeft: "8px",
          }}
        >
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
