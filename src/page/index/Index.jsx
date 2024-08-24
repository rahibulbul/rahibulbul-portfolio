import React, { useState } from "react";
import ValidatedInput from "../components/textInput/ValidatedInput";
import PhoneNumberInput from "../components/phoneInput/PhoneNumberInput";
import ValidatePassword from "../components/passwordInput/ValidatePassword";
import "./style.css";

const Index = () => {
  const validateFullName = (name) => /^[A-Za-z\s]{2,}$/.test(name);
  const validateUsername = (username) => /^[a-z0-9_]{3,15}$/.test(username);
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validateOccupation = (occupation) => occupation.length > 0;
  const validateAddress = (address) => address.length > 0;

  // Transformation function to enforce lowercase and remove spaces
  const transformUsername = (username) =>
    username.toLowerCase().replace(/\s/g, "");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
  };
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="home">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-text">
          <ValidatedInput
            label="Enter your full name"
            validate={validateFullName}
            errorMessage="Full name must be at least 2 characters and contain only letters and spaces."
            requiredMessage="Full name cannot be empty."
          />
        </div>
        <div className="input-text">
          <ValidatedInput
            label="Username"
            validate={validateUsername}
            errorMessage="Username must be 3-15 characters long, contain only lowercase letters, numbers, and underscores."
            requiredMessage="Username cannot be empty."
            transform={transformUsername} // Apply transformation
          />
        </div>
        <div className="input-text">
          <ValidatedInput
            label="Email"
            validate={validateEmail}
            errorMessage="Please enter a valid email address."
            requiredMessage="Email cannot be empty."
          />
        </div>
        <div className="input-text">
          <ValidatedInput
            label="Occupation"
            validate={validateOccupation}
            errorMessage="Occupation cannot be empty."
            requiredMessage="Occupation cannot be empty."
          />
        </div>
        <div className="input-text">
          <ValidatedInput
            label="Full Address"
            validate={validateAddress}
            errorMessage="Address cannot be empty."
            requiredMessage="Address cannot be empty."
          />
        </div>
        <div className="input-text">
          <PhoneNumberInput
            label="Enter your phone number"
            errorMessage="Please enter a valid phone number."
            requiredMessage="Phone number cannot be empty."
            defaultCountry="GB"
          />
        </div>
        <div className="input-password">
          <ValidatePassword
            label="Enter Password"
            errorMessage="Please enter a valid password."
            requiredMessage="Password cannot be empty."
          />
        </div>
        <div className="input-text">
          <PhoneNumberInput
            label="Enter your phone number"
            errorMessage="Please enter a valid phone number."
            requiredMessage="Phone number cannot be empty."
            defaultCountry="GB"
          />
        </div>

        {/* <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#007BFF",
            color: "#fff",
          }}
        >
          Sign Up
        </button> */}
      </form>
    </div>
  );
};

export default Index;
