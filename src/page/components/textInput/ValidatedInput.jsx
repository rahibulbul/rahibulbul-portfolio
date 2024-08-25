import React, { useState } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const defaultValidations = {
  username: (username) => /^[a-z0-9_]{3,15}$/.test(username),
  fullname: (name) => /^[A-Za-z\s]{3,}$/.test(name),
  email: (email) => /\S+@\S+\.\S+/.test(email),
};

const defaultTransformations = {
  username: (username) => username.toLowerCase().replace(/\s/g, ""),
};

const ValidatedInput = ({
  label,
  validate,
  errorMessage = "There is a error",
  requiredMessage = "Item cannot be empty",
  transform,
  fontSize,
  fontWeight,
  className,
  width = "100%",
  height = "50px",
  marginTop = "30px",
  fontFamily,
  BoxShadow,
  iconFontSize,
}) => {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showRequiredError, setShowRequiredError] = useState(false);

  const determineFieldType = () => {
    const labelLower = label.toLowerCase();
    if (labelLower.includes("username") || labelLower.includes("user name")) {
      return "username";
    } else if (
      labelLower.includes("name") ||
      labelLower.includes("fullname") ||
      labelLower.includes("full name") ||
      labelLower.includes("last name") ||
      labelLower.includes("first name")
    ) {
      return "fullname";
    } else if (labelLower.includes("email")) {
      return "email";
    } else {
      return null;
    }
  };

  const fieldType = determineFieldType();

  const appliedValidate =
    validate || (fieldType ? defaultValidations[fieldType] : () => true);
  const appliedTransform =
    transform ||
    (fieldType === "username" ? defaultTransformations.username : (v) => v);

  const handleChange = (e) => {
    let inputValue = e.target.value;

    inputValue = appliedTransform(inputValue);
    setValue(inputValue);

    if (appliedValidate(inputValue)) {
      setError("");
      setShowRequiredError(false);
    } else {
      setError(errorMessage);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    setIsFocused(false);
    if (!value) {
      setError(requiredMessage);
      setShowRequiredError(true);
    } else if (!appliedValidate(value)) {
      setError(errorMessage);
      setShowRequiredError(false);
    } else {
      setError("");
      setShowRequiredError(false);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setTouched(true);
    setShowRequiredError(false);
  };

  const inputStyle = {
    height: height,
    width: width,
    border: "solid 2px #B2BEB5",
    borderRadius: "10px",
    padding: "0px 20px",
    fontSize: fontSize || "18px",
    fontWeight: fontWeight || "600",
    transition: "all 0.5s ease-in-out",
    outline: "none",
    fontFamily: fontFamily || undefined,
    boxShadow: BoxShadow || undefined,
    borderColor: error ? "#e74c3c" : isFocused || value ? "#36454F" : "#B2BEB5",
    boxShadow: isFocused
      ? "0px 12px 28px 0px rgba(0, 0, 0, 0.2), 0px 2px 4px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px rgba(255, 255, 255, 0.05) inset"
      : undefined,
  };

  const labelStyle = {
    position: "absolute",
    left: "10px",
    top: "50%",
    // transform: "translateY(-50%)",
    // color: error ? "#e74c3c" : "#696969",
    // fontWeight: "600",
    pointerEvents: "none",
    transition: "transform 0.5s, color 0.5s",
    // backgroundColor: "transparent",
    padding: "0px 10px",
    zIndex: 1,
    transform:
      isFocused || (touched && value)
        ? "translateY(-150%)"
        : "translateY(-50%)",
    backgroundColor: isFocused || (touched && value) ? "#fff" : "transparent",
    color: error
      ? "#e74c3c"
      : isFocused || (touched && value)
      ? "black"
      : "#696969",
    fontWeight: "600",
  };

  const errorTextStyle = {
    color: error ? "red" : "transparent",
    marginLeft: "15px",
    fontSize: "14px",
    fontWeight: "600",
    marginTop: "-1px",
    transition: "color 0.5s ease-in-out",
  };

  const iconStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    marginLeft: "8px",
    fontSize: iconFontSize || "20px",
  };

  return (
    <div
      className={`validated-input ${className || ""}`}
      style={{
        width: "100%",
        height: height,
        marginTop: marginTop,
        position: "relative",
      }}
    >
      <input
        style={inputStyle}
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className={error ? "error" : ""}
        required
      />
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

export default ValidatedInput;
