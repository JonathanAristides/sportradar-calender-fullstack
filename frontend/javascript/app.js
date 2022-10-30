//imports

import Event from "./event.js";
import Storage from "./storage.js";
import Ui from "./ui.js";

//Events

//Display SportSelect Options
document
  .getElementById("sport")
  .addEventListener("DOMContentLoaded", Ui.displaySportOptions());
document.getElementById("sport").addEventListener("change", () => {
  Ui.displaySportOptions();
});

//Display TeamSelect Options
const selects = document.querySelectorAll(".select");
selects.forEach((select) => {
  select.addEventListener("click", (e) => {
    Ui.addToSelect(document.getElementById("sport").value, e.target.id);
  });
});

//Display events
document.addEventListener("DOMContentLoaded", Ui.displayAllEvents);
document
  .querySelector("#allSport")
  .addEventListener("click", Ui.displayAllEvents);

//Display event of sport
const filters = document.querySelectorAll(".filter");
filters.forEach((filter) => {
  filter.addEventListener("click", () =>
    Ui.displayEventsOfSport(filter.dataset.sportid)
  );
});

//Add an event
const formElement = document.querySelector(".form");

formElement.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(formElement);

  const data = Object.fromEntries(formData);

  //Simple Validation
  if (
    data.Event_Date === "" ||
    data.Event_Time === "" ||
    data._Sport_ID === "" ||
    data._Team1_ID === "" ||
    data._Team2_ID === ""
  ) {
    Ui.showAlert("Please fill all fields", "failed");
  } else if (data._Team1_ID === data._Team2_ID) {
    Ui.showAlert("Teams must be different", "failed");
  } else {
    const event = new Event(
      data.Event_Date,
      data.Event_Time,
      data._Sport_ID,
      data._Team1_ID,
      data._Team2_ID
    );
    //Change form visiblity
    Ui.formToggle();

    //Add event to UI
    Ui.addEventToEvents(event);

    //Event created Message
    Ui.showAlert("Event created", "success");

    //Send to storage
    Storage.addEvent(data);

    //Clear Form fields
    Ui.clearFormFields();

    setTimeout(() => location.reload(), 1000);
  }
});

//Remove an event
document.querySelector(".eventsContainer").addEventListener("click", (e) => {
  Ui.deleteEvent(e.target);
  Ui.showAlert("Event removed", "success");
});

//toggle form
document.getElementById("formToggleButton").addEventListener("click", (e) => {
  Ui.formToggle();
});

//formToggleButton
document.getElementById("formToggleButton").addEventListener("click", (e) => {
  Ui.formButtonToggle(e);
});

//Display active tab

// const selectButtons = document.querySelectorAll(".selectButton");
// // selectButtons.forEach((selectButton) => {
// //   selectButton.addEventListener("click", (e) => {
// //     Ui.displayActiveTab(e);
// //   });
// // });
