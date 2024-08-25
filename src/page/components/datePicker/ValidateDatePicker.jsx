// import React, { useState } from "react";
// import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

// const ValidateDatePicker = ({
//   label,
//   requiredMessage = "Date cannot be empty.",
//   errorMessage = "Please insert a correct date.",
//   fontSize,
//   fontWeight,
//   className,
//   width = "100%",
//   height = "50px",
//   marginTop = "30px",
//   fontFamily,
//   BoxShadow,
//   iconFontSize,
// }) => {
//   const [value, setValue] = useState("");
//   const [touched, setTouched] = useState(false);
//   const [error, setError] = useState("");
//   const [isFocused, setIsFocused] = useState(false);
//   const [showRequiredError, setShowRequiredError] = useState(false);

//   const validateDate = (dateString) => {
//     const date = new Date(dateString);
//     const today = new Date();
//     return date <= today;
//   };

//   const handleChange = (e) => {
//     let inputValue = e.target.value;
//     setValue(inputValue);

//     if (validateDate(inputValue)) {
//       setError("");
//       setShowRequiredError(false);
//     } else {
//       setError(errorMessage);
//     }
//   };

//   const handleBlur = () => {
//     setTouched(true);
//     setIsFocused(false);
//     if (!value) {
//       setError(requiredMessage);
//       setShowRequiredError(true);
//     } else if (!validateDate(value)) {
//       setError(errorMessage);
//       setShowRequiredError(false);
//     } else {
//       setError("");
//       setShowRequiredError(false);
//     }
//   };

//   const handleFocus = () => {
//     setIsFocused(true);
//     setTouched(true);
//     setShowRequiredError(false);
//   };

//   const inputStyle = {
//     height: height,
//     width: width,
//     border: "solid 2px #B2BEB5",
//     borderRadius: "10px",
//     padding: "0px 20px",
//     fontSize: fontSize || "18px",
//     fontWeight: fontWeight || "600",
//     transition: "all 0.5s ease-in-out",
//     outline: "none",
//     fontFamily: fontFamily || undefined,
//     borderColor: error ? "#e74c3c" : isFocused || value ? "#36454F" : "#B2BEB5",
//     boxShadow: isFocused
//       ? "0px 12px 28px 0px rgba(0, 0, 0, 0.2), 0px 2px 4px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px rgba(255, 255, 255, 0.05) inset"
//       : undefined,
//   };

//   const labelStyle = {
//     position: "absolute",
//     left: "10px",
//     top: "50%",
//     pointerEvents: "none",
//     transition: "transform 0.5s, color 0.5s",
//     padding: "0px 10px",
//     zIndex: 1,
//     transform:
//       isFocused || (touched && value)
//         ? "translateY(-150%)"
//         : "translateY(-50%)",
//     backgroundColor: isFocused || (touched && value) ? "#fff" : "#fff",
//     color: error
//       ? "#e74c3c"
//       : isFocused || (touched && value)
//       ? "black"
//       : "#696969",
//     fontWeight: "600",
//   };

//   const errorTextStyle = {
//     color: error ? "red" : "transparent",
//     marginLeft: "15px",
//     fontSize: "14px",
//     fontWeight: "600",
//     marginTop: "-1px",
//     transition: "color 0.5s ease-in-out",
//   };

//   const iconStyle = {
//     position: "absolute",
//     top: "50%",
//     transform: "translateY(-50%)",
//     marginLeft: "8px",
//     fontSize: iconFontSize || "20px",
//   };

//   return (
//     <div
//       className={`validated-input ${className || ""}`}
//       style={{
//         width: "100%",
//         height: height,
//         marginTop: marginTop,
//         position: "relative",
//       }}
//     >
//       <input
//         style={inputStyle}
//         type="date"
//         value={value}
//         onChange={handleChange}
//         onBlur={handleBlur}
//         onFocus={handleFocus}
//         className={error ? "error" : ""}
//         required
//       />
//       <label style={labelStyle}>{label}</label>
//       {touched && (
//         <span className="error-icon" style={iconStyle}>
//           {error ? (
//             <FaExclamationCircle style={{ color: "#e74c3c" }} />
//           ) : (
//             value && <FaCheckCircle style={{ color: "#2ecc71" }} />
//           )}
//         </span>
//       )}
//       <p style={errorTextStyle}>{error}</p>
//     </div>
//   );
// };

// export default ValidateDatePicker;

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
  onChange = (date) => {
    console.log("Selected Date:", date);
  }, // Default implementation
  label,
  errorMessage = "Date cannot be in the future",
  requiredMessage = "Date is required",
  iconFontSize = "20px",
  height = "50px",
  width = "100%",
  fontSize = "18px",
  fontWeight = "600",
  marginTop = "30px",
  fontFamily,
  BoxShadow,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [inputDate, setInputDate] = useState(
    selectedDate ? formatDate(selectedDate) : ""
  );
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
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

    if (newDate > new Date()) {
      setError(errorMessage);
    } else {
      setInputDate(formatDate(newDate));
      setShowCalendar(false);
      setError("");
      onChange(newDate); // Call the onChange handler
    }
  };

  const handleInputClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    setCurrentDate(new Date(newYear, currentDate.getMonth(), 1));
  };

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value, 10);
    setCurrentDate(new Date(currentDate.getFullYear(), newMonth, 1));
  };

  const handleBlur = () => {
    setTouched(true);
    setIsFocused(false);
    if (!inputDate) {
      setError(requiredMessage);
    } else {
      setError("");
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setTouched(true);
    setError("");
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
            backgroundColor:
              formatDate(currentDate) === inputDate ? "#25a8e4" : "",
            color: formatDate(currentDate) === inputDate ? "white" : "black",
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
    onChange(null); // Call the onChange handler with null
  };

  const inputStyle = {
    height: height,
    width: width,
    border: "solid 2px #B2BEB5",
    borderRadius: "10px",
    padding: "0px 20px",
    fontSize: fontSize,
    fontWeight: fontWeight,
    transition: "all 0.5s ease-in-out",
    outline: "none",
    fontFamily: fontFamily || undefined,
    boxShadow: BoxShadow || undefined,
    boxSizing: "border-box", // Ensure the border size doesn't affect the layout
    borderColor: error
      ? "#e74c3c"
      : isFocused || inputDate
      ? "#36454F"
      : "#B2BEB5",
    boxShadow: isFocused
      ? "0px 12px 28px 0px rgba(0, 0, 0, 0.2), 0px 2px 4px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px rgba(255, 255, 255, 0.05) inset"
      : undefined,
  };

  const labelStyle = {
    position: "absolute",
    left: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    transition: "transform 0.3s ease-in-out, color 0.3s ease-in-out",
    pointerEvents: "none",
    zIndex: 1,
    backgroundColor:
      isFocused || (touched && inputDate) ? "#fff" : "transparent",
    color: error
      ? "#e74c3c"
      : isFocused || (touched && inputDate)
      ? "black"
      : "#696969",
    fontWeight: "600",
  };

  const errorTextStyle = {
    color: error ? "red" : "transparent",
    marginLeft: "15px",
    fontSize: "14px",
    fontWeight: "600",
    marginTop: "5px",
    transition: "color 0.3s ease-in-out",
  };

  const iconStyle = {
    position: "absolute",
    top: "50%",
    right: "10px",
    transform: "translateY(-50%)",
    fontSize: iconFontSize,
    transition: "color 0.3s ease-in-out",
  };

  return (
    <div ref={calendarRef} style={{ position: "relative", marginTop }}>
      <div style={{ position: "relative" }}>
        <input
          style={inputStyle}
          type="text"
          value={inputDate}
          onClick={handleInputClick}
          onBlur={handleBlur}
          onFocus={handleFocus}
          readOnly
          placeholder=" "
          required
          className={error ? "error" : ""}
        />
        <label style={labelStyle} className={error ? "error" : ""}>
          {label}
        </label>
        {touched && (
          <span style={iconStyle}>
            {error ? (
              <FaExclamationCircle style={{ color: "#e74c3c" }} />
            ) : (
              inputDate && <FaCheckCircle style={{ color: "#2ecc71" }} />
            )}
          </span>
        )}
        <p style={errorTextStyle}>{error}</p>
      </div>
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
                padding: "10px 30px",
                fontSize: "14px",
                background: "none",
                borderRadius: "10px",
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
                padding: "10px 30px",
                fontSize: "14px",
                background: "none",
                borderRadius: "10px",
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
                border: "solid 1px #f44336",
                color: "#f44336",
                fontSize: "14px",
                cursor: "pointer",
                letterSpacing: "1px",
                padding: "5px",
                fontWeight: "800",
                borderRadius: "20px",
                transition: "0.5s",
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
