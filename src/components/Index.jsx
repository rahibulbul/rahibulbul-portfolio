import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import ParticlesBackground from "../utils/ParticlesBackground";
import picture from "../assets/rahi.jpg";
import Typed from "typed.js";

const Index = () => {
  const [activeLink, setActiveLink] = useState("home");

  const handleClick = (e, linkId) => {
    e.preventDefault(); // Prevent the default link behavior
    setActiveLink(linkId);

    // Smooth scroll to the section
    document.getElementById(linkId).scrollIntoView({ behavior: "smooth" });
  };

  // Type writing
  // const homeTyping = useRef(null);

  // useEffect(() => {
  //   const typed = new Typed(homeTyping.current, {
  //     strings: [
  //       "Web Developer",
  //       "UI/UX Designer",
  //       "Learning About AI",
  //       "Discord Server Developer",
  //       "Discord Bot Developer",
  //       "An Introvert",
  //     ],
  //     typeSpeed: 150,
  //     loop: true,
  //     backSpeed: 120,
  //     showCursor: false,
  //   });

  //   return () => {
  //     typed.destroy();
  //   };
  // }, []);

  return (
    <>
      <ParticlesBackground id="particle-bg" />
      <div className="index">
        <div className="sidebar">
          <nav className="sidebar-nav">
            <div className="logo">
              <img src={picture} alt="rahi" />
            </div>
            <ul>
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleClick(e, "home")}
                  className={activeLink === "home" ? "active" : ""}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleClick(e, "about")}
                  className={activeLink === "about" ? "active" : ""}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#resume"
                  onClick={(e) => handleClick(e, "resume")}
                  className={activeLink === "resume" ? "active" : ""}
                >
                  Resume
                </a>
              </li>
              <li>
                <a
                  href="#project"
                  onClick={(e) => handleClick(e, "project")}
                  className={activeLink === "project" ? "active" : ""}
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleClick(e, "contact")}
                  className={activeLink === "contact" ? "active" : ""}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <div className="social-links">
            <div className="facebook">
              <a
                href="https://www.facebook.com/rahibulbulrahi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-facebook"></i>
              </a>
            </div>
            <div className="linkedin">
              <a
                href="https://www.linkedin.com/in/rahibulbulrahi/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
            <div className="github">
              <a
                href="https://github.com/rahibulbul"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-github"></i>
              </a>
            </div>
            <div className="google">
              <a
                href="mailto:rahibulbulrahi@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-google"></i>
              </a>
            </div>
          </div>
          <div className="copywrite">
            <span className="copy-1">Copyright &copy; 2024 Rahi.</span>
            <span className="copy-2">All rights reserved.</span>
          </div>
        </div>
        <div className="main">
          <section id="home" className="home">
            <div className="my-name">
              <a href="#about" onClick={(e) => handleClick(e, "project")}>
                <span className="home-self">Rahi Bulbul</span>
              </a>
            </div>
            <div className="home-info-showing">
              <div id="textSlider" class="sliderrow">
                <div class="iamCol">
                  <div className="iamColA">
                    <p>I</p>
                    <p>AM</p>
                  </div>
                  <div className="iamColB">
                    <p>A</p>
                  </div>
                </div>
                <div class="slideCol">
                  <div class="scroller">
                    <div class="inner">
                      <p className="home-software">Software Developer</p>
                      <p>Web Designer</p>
                      <p>AI Enthusiast</p>
                      <p>Traveler</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a
              href="#project"
              onClick={(e) => handleClick(e, "project")}
              className="home-project-show"
            >
              My Projects
            </a>
          </section>
          <section id="about" className="about">
            About
          </section>
          <section id="resume" className="resume">
            Resume
          </section>
          <section id="project" className="project">
            Project
          </section>
          <section id="contact" className="contact">
            Contact
          </section>
        </div>
      </div>
    </>
  );
};

export default Index;
