import { useState, useEffect } from "react";

import "./App.css";

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const App = () => {
  const [nav, setNav] = useState(0);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadCalendar()
    const eventsFromLocalStorage = localStorage.getItem("events");
    if (eventsFromLocalStorage) {
      setEvents(JSON.parse(eventsFromLocalStorage));
    }
  }, []);

  const loadCalendar = () => {
    const date = new Date();

    if (nav !== 0) {
      date.setMonth(new Date().getMonth() + nav);
    }

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

    displayMonthAndYear(date, year);

    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    for (let index = 1; index <= paddingDays + daysInMonth; index++) {
      const daysSquare = document.createElement("div");
      daysSquare.classList.add("day");

      if (index > paddingDays) {
        daysSquare.innerText = index - paddingDays;
        daysSquare.addEventListener("click", () => console.log("click"));
      } else {
        daysSquare.classList.add("padding");
      }

      calendar.appendChild(daysSquare);
    }
  };

  const displayMonthAndYear = (date, year) => {
    const monthDisplay = document.getElementById("monthDisplay");
    monthDisplay.innerText = `${date.toLocaleDateString("en-us", {
      month: "long",
    })} ${year}`;
  };

  const handleBackButton = () => {
    setNav((prev) => prev - 1);
    loadCalendar();
  };

  const handleNextButton = () => {
    setNav((prev) => prev + 1);
    loadCalendar();
  };

  return (
    <div id="container">
      <div id="header">
        <div id="monthDisplay"></div>
        <div className="">
          <button id="backButton" onClick={handleBackButton}>
            Back
          </button>
          <button id="nextButton" onClick={handleNextButton}>
            Next
          </button>
        </div>
      </div>

      <div id="weekdays">
        {weekdays.map((weekday) => (
          <div key={weekday}>{weekday}</div>
        ))}
      </div>

      <div id="calendar"></div>
    </div>
  );
};

export default App;
