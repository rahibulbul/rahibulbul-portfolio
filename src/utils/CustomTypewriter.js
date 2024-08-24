// src/components/CustomTypewriter.js
import React, { useState, useEffect } from "react";

const CustomTypewriter = ({
  texts,
  typeSpeed = 100,
  deleteSpeed = 60,
  pauseDuration = 1000,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      const currentText = texts[loopIndex];
      if (isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length - 1));
      } else {
        setDisplayText(currentText.substring(0, displayText.length + 1));
      }

      if (!isDeleting && displayText === currentText) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setLoopIndex((prevLoopIndex) => (prevLoopIndex + 1) % texts.length);
      }
    };

    const typingSpeed = isDeleting ? deleteSpeed : typeSpeed;
    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [
    displayText,
    isDeleting,
    texts,
    loopIndex,
    typeSpeed,
    deleteSpeed,
    pauseDuration,
  ]);

  return <span className="typewriter">{displayText}</span>;
};

export default CustomTypewriter;
