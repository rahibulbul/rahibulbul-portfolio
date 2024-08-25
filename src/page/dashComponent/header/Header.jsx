import React, { useState } from "react";
import "./header.css";
import { FaBell } from "react-icons/fa";

const Header = ({ headerIcon, headerTitle }) => {
  return (
    <header>
      <div className="header-left">
        <div className="header-icon">{headerIcon}</div>
        <div className="header-title">{headerTitle}</div>
      </div>
      <div className="header-right">
        <div className="notification-button">{<FaBell />}</div>
        <div className="notification-panel">
          <div className="panel-title">Notification</div>
          <div className="panel-body">
            <span className="panel-body-from">You got a email</span>
            <span className="panel-body-body">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </span>
            <div className="panel-body-timestamp">
              <div className="timestamp-date">25 August 2024</div>
              <div className="timestamp-time">4:15 PM</div>
            </div>
          </div>
          <div className="panel-body">
            <span className="panel-body-from">You got a email</span>
            <span className="panel-body-body">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </span>
            <div className="panel-body-timestamp">
              <div className="timestamp-date">25 August 2024</div>
              <div className="timestamp-time">4:15 PM</div>
            </div>
          </div>
          <div className="panel-body">
            <span className="panel-body-from">You got a email</span>
            <span className="panel-body-body">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </span>
            <div className="panel-body-timestamp">
              <div className="timestamp-date">25 August 2024</div>
              <div className="timestamp-time">4:15 PM</div>
            </div>
          </div>
          <div className="panel-body">
            <span className="panel-body-from">You got a email</span>
            <span className="panel-body-body">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </span>
            <div className="panel-body-timestamp">
              <div className="timestamp-date">25 August 2024</div>
              <div className="timestamp-time">4:15 PM</div>
            </div>
          </div>
          <div className="panel-body">
            <span className="panel-body-from">You got a email</span>
            <span className="panel-body-body">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </span>
            <div className="panel-body-timestamp">
              <div className="timestamp-date">25 August 2024</div>
              <div className="timestamp-time">4:15 PM</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
