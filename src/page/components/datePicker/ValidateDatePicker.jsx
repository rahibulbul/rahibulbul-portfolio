import React, { useState, useEffect, useRef } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

const DatePicker = ({
  selectedDate,
  onChange = () => {}, // Default to a no-op function if not provided
  label,
  requiredMessage = "Date is required",
  errorMessage = "Invalid date",
  futureDateMessage = "Date cannot be in the future",
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [inputDate, setInputDate] = useState(
    selectedDate ? formatDate(selectedDate) : ""
  );
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const [focused, setFocused] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDateClick = (day) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the start of today to avoid time-related issues

    if (newDate > today) {
      setError(futureDateMessage);
      return;
    }

    setInputDate(formatDate(newDate));
    setShowCalendar(false);
    setError(""); // Clear error on valid date selection
    setFocused(false); // Remove focus state on valid selection
    onChange(newDate);
  };

  const handleInputClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleBlur = () => {
    setTouched(true);
    if (!inputDate) {
      setError(requiredMessage);
    } else {
      setError(""); // Clear error if input is valid
    }
    setFocused(false); // Remove focus state on blur
  };

  const handleFocus = () => {
    setTouched(true);
    setError(""); // Clear error on focus
    setFocused(true); // Set focus state
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    setCurrentDate(new Date(newYear, currentDate.getMonth(), 1));
  };

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value, 10);
    setCurrentDate(new Date(currentDate.getFullYear(), newMonth, 1));
  };

  const renderDays = () => {
    const startDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(
        <div
          style={{
            visibility: "hidden",
            padding: "10px",
            textAlign: "center",
            borderRadius: "50%",
            transition: "background 0.3s",
          }}
          key={`empty-${i}`}
        />
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div
          style={{
            padding: "10px",
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "50%",
            transition: "background 0.3s",
            background: i === currentDate.getDate() ? "#25a8e4" : "transparent",
            color: i === currentDate.getDate() ? "white" : "black",
          }}
          key={i}
          onClick={() => handleDateClick(i)}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  const handleClear = (e) => {
    e.preventDefault();
    setInputDate("");
    setCurrentDate(new Date());
    setError(requiredMessage);
    onChange(null);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "50px",
        marginTop: "30px",
      }}
      ref={calendarRef}
    >
      <div
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          value={inputDate}
          onClick={handleInputClick}
          onBlur={handleBlur}
          onFocus={handleFocus}
          readOnly
          placeholder=" "
          required
          style={{
            width: "100%",
            height: "100%",
            border: `solid 2px ${
              error
                ? "#e74c3c"
                : inputDate
                ? "black"
                : focused
                ? "black"
                : "#B2BEB5"
            }`,
            borderRadius: "10px",
            fontSize: "18px",
            fontWeight: 600,
            outline: "none",
            padding: "0px 35px 0px 30px",
            transition: "border-color 0.3s, box-shadow 0.3s",
            boxShadow:
              focused && !inputDate ? "0 0 5px rgba(0, 0, 0, 0.2)" : "none",
          }}
        />
        <label
          style={{
            position: "absolute",
            left: "10px",
            padding: "0px 10px",
            fontSize: "16px",
            zIndex: 1,
            fontWeight: error || inputDate || focused ? 600 : 400, // Bold when error, input is valid, or focused
            color: error ? "#e74c3c" : inputDate || focused ? "black" : "black", // Black when focused or valid
            // margin: "15px 20px",
            transition: "transform 0.5s, color 0.3s",
            transform:
              inputDate || showCalendar || focused
                ? "translate(0px, -28px)"
                : "translate(0px, -4px)",
            backgroundColor: "white",
            pointerEvents: "none",
          }}
        >
          {label}
        </label>
        {touched && (
          <span
            style={{
              position: "absolute",
              top: "50%",
              right: "-25px",
              transform: "translateY(-50%)",
              fontSize: "20px",
              transition: "color 0.3s ease-in-out",
            }}
          >
            {error ? (
              <FaExclamationCircle style={{ color: "#e74c3c" }} />
            ) : (
              inputDate && <FaCheckCircle style={{ color: "#2ecc71" }} />
            )}
          </span>
        )}
      </div>
      <p
        style={{
          color: error ? "red" : "transparent",
          marginLeft: "15px",
          fontSize: "14px",
          fontWeight: "600",
          marginTop: "-1px",
          transition: "color 0.5s ease-in-out",
          // Hide the element completely when there's no error
        }}
      >
        {error}
      </p>
      {/* <p
        style={{
          color: "#e74c3c",
          marginLeft: "15px",
          fontSize: "14px",
          fontWeight: 600,
          marginTop: "5px", // Consistent margin above the error message
          marginBottom: "0px", // No margin below to avoid gaps
          padding: "0px", // Remove any padding to control spacing
          transition: "color 0.3s ease-in-out, margin-top 0.3s ease-in-out",
          display: error ? "block" : "none", // Show error only when present
        }}
      >
        {error}
      </p> */}
      {showCalendar && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: "0",
            width: "60%",
            background: "white",
            border: "1px solid #696969",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 10,
            padding: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <select
              value={currentDate.getMonth()}
              onChange={handleMonthChange}
              style={{
                border: "1px solid #ccc",
                padding: "5px",
                fontSize: "14px",
                background: "none",
                borderRadius: "10px",
                padding: "10px 30px",
              }}
            >
              {Array.from({ length: 12 }, (v, k) => (
                <option key={k} value={k}>
                  {new Date(0, k).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>
            <select
              value={currentDate.getFullYear()}
              onChange={handleYearChange}
              style={{
                border: "1px solid #ccc",
                padding: "5px",
                fontSize: "14px",
                background: "none",
                borderRadius: "10px",
                padding: "10px 30px",
              }}
            >
              {Array.from({ length: 100 }, (v, k) => (
                <option key={k} value={1970 + k}>
                  {1970 + k}
                </option>
              ))}
            </select>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              marginBottom: "5px",
              textAlign: "center",
            }}
          >
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <div key={index} style={{ fontWeight: "bold", color: "#555" }}>
                {day}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "5px",
            }}
          >
            {renderDays()}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
          >
            <button
              onClick={handleClear}
              style={{
                background: "none",
                border: "none",
                color: "#f44336",
                fontSize: "14px",
                cursor: "pointer",
                letterSpacing: "1px",
                padding: "5px",
                fontWeight: 800,
                border: "solid 1px #f44336",
                borderRadius: "20px",
                transition: "0.5s",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#d93d3d";
                e.target.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#f44336";
              }}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
