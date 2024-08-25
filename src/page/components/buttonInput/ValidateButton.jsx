import React from "react";

const ValidateButton = ({ text, onClick, height = "50px", width = "100%" }) => {
  // Ensure the height does not go below 35px
  const validatedHeight = parseInt(height) < 35 ? "35px" : height;

  const buttonStyle = {
    width: width,
    minWidth: "350px", // Minimum width of 350px
    height: validatedHeight, // Validated height
    backgroundColor: "#fff",
    outline: "none",
    border: "solid 2px #696969",
    borderRadius: "25px",
    fontSize: "18px",
    fontWeight: "700",
    transition: "box-shadow 0.6s",
    boxShadow: "none", // Default box-shadow (none) until hover
  };

  return (
    <div className="validateButton" style={{ width: "100%" }}>
      <button
        style={buttonStyle}
        onMouseEnter={(e) =>
          (e.currentTarget.style.boxShadow =
            "0px 12px 28px 0px rgba(0, 0, 0, 0.2), 0px 2px 4px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px rgba(255, 255, 255, 0.05) inset")
        }
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
        type="submit"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default ValidateButton;
