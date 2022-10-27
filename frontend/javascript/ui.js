//ui class

import Storage from "./storage.js";

export default class Ui {
  //displayAllEvents()
  static displayAllEvents() {
    const events = Storage.getAllEvents()
      .then((events) => {
        events.forEach((event) => {
          Ui.addEventToEvents(event);
        });
      })
      .catch((error) => console.log("Oh no", error.message));

    Ui.checkIfHtmlContainerIsEmpty();
  }

  //displayEventsOfSport()
  static displayEventsOfSport(sportid) {
    const events = Storage.getAllEventsOfSport(sportid)
      .then((events) => {
        events.forEach((event) => {
          Ui.addEventToEvents(event);
        });
      })
      .catch((error) => console.log("Oh no", error.message));

    Ui.checkIfHtmlContainerIsEmpty();
  }

  //addEventToEvents
  static addEventToEvents(event) {
    const date = new Date(event.Event_Date).toLocaleDateString("uk-Uk");
    const time = event.Event_Time.slice(0, 5);
    const eventsList = document.querySelector(".container");
    const eventRow = document.createElement("div");
    eventRow.innerHTML = `
    <div>

        <div>${date}</div>
        <div>${time}</div>
        <div>${event.Sport_Name}</div>
        <div>${event.Team_1}</div>
        <div>${event.Team_2}</div>
        <div><a href="#" class="alert delete">X</a><div>
    </div>
    <br/>`;

    eventsList.appendChild(eventRow);
  }

  //deleteEvent((((((OPTIONAL))))))
  static deleteEvent(targetElement) {
    if (targetElement.classList.contains("delete")) {
      targetElement.parentElement.parentElement.remove();
    }
  }

  //Container empty check

  static checkIfHtmlContainerIsEmpty() {
    if (!document.querySelector(".container").innerHTML == "") {
      document.querySelector(".container").innerHTML = "";
    }
  }

  //Show Alert
  static showAlert(message, className) {
    const div = document.createElement("div");

    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".container");
    container.insertAdjacentElement("afterbegin", div);

    // //Remove after 2 Seconds
    // setTimeout(() => document.querySelector(".alert").remove(), 2000);
  }

  //clear Form fields
  static clearFormFields() {
    document.querySelector("#eventDate").value = "";
    document.querySelector("#eventTime").value = "";
    document.querySelector("#sport").value = "";
    document.querySelector("#team1").value = "";
    document.querySelector("#team2").value = "";
  }
}
