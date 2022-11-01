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
    const eventsList = document.querySelector(".eventsContainer");
    const eventRow = document.createElement("div");
    eventRow.classList.add("singleEventContainer");
    eventRow.innerHTML = `
    <div class="event" id="${event.Event_ID}">
      <div class="dateAndTime">
        <div>${date}</div>
        <hr/>
        <div>${time}</div>
      </div>
      <div class="eventSport">
        <div>${event.Sport_Name}</div>
      </div>
      <div class="eventTeams">
        <div>${event.Team_1}</div>
        <p class="vs">vs</p>
        <div>${event.Team_2}</div>
      </div>
        <a class="deleteLink" href="#" ><img class=" delete deletebuttonImage" src="../../assets/x.png" alt="delete" /></a>
        <a class ="updateLink" href="#" ><img class=" update updatebuttonImage" src="../../assets/edit.png" alt="update" /></a>
    </div>
    <br/>`;

    eventsList.appendChild(eventRow);
  }

  //deleteEvent
  static deleteEvent(targetElement) {
    if (targetElement.classList.contains("delete")) {
      targetElement.parentElement.parentElement.parentElement.remove();
      Ui.showAlert("Event removed", "success");
      Storage.removeEvent(targetElement.parentElement.parentElement.id);
    }
  }

  //updateEvent
  static updateEvent(targetElement) {
    if (targetElement.classList.contains("update")) {
      const eventContainer = targetElement.parentElement.parentElement;

      const eventId = eventContainer.id;
      const eventDate = eventContainer
        .querySelector(".dateAndTime")
        .getElementsByTagName("div")[0].innerText;
      const eventTime = eventContainer
        .querySelector(".dateAndTime")
        .getElementsByTagName("div")[1].innerText;
      const sportName = eventContainer
        .querySelector(".eventSport")
        .getElementsByTagName("div")[0].innerText;
      const team1Name = eventContainer
        .querySelector(".eventTeams")
        .getElementsByTagName("div")[0].innerText;
      const team2Name = eventContainer
        .querySelector(".eventTeams")
        .getElementsByTagName("div")[1].innerText;

      // console.log(eventId, eventDate, sportName, team1Name, team2Name);
    }
  }

  //Container empty check
  static checkIfHtmlContainerIsEmpty() {
    if (!document.querySelector(".eventsContainer").innerHTML == "") {
      document.querySelector(".eventsContainer").innerHTML = "";
    }
  }

  //Show Alert
  static showAlert(message, className) {
    const div = document.createElement("div");

    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".eventsContainer");
    container.insertAdjacentElement("afterbegin", div);

    //Remove after 2 Seconds

    setTimeout(() => document.querySelector(".alert").remove(), 2000);
  }

  //clear Form fields
  static clearFormFields() {
    document.querySelector("#eventDate").value = "";
    document.querySelector("#eventTime").value = "";
    document.querySelector("#sport").value = "";
    document.querySelector("#team1").value = "";
    document.querySelector("#team2").value = "";

    Ui.formToggle();
  }

  //display sport options in select
  static displaySportOptions() {
    const sports = Storage.getSports()
      .then((sports) => {
        Ui.clearSelects();
        const selectOptions = document.getElementById("sport");
        if (!selectOptions.options.length == 1) {
          sports.forEach((sport) => {
            let newOption = new Option(sport.Sport_Name, sport.Sport_ID);
            const select = document.getElementById("sport");
            select.add(newOption, undefined);
          });
        }
      })
      .catch((error) => console.log("Oh no", error.message));
  }

  //Display team options
  static addToSelect(sport, selectId) {
    const select = document.getElementById(`${selectId}`);
    if (select.options.length <= 1) {
      const teams = Storage.getTeams(sport).then((teams) => {
        teams.forEach((team) => {
          let newOption = new Option(team.Team_Name, team.Team_ID);
          newOption.setAttribute("sportID", `${sport}`);
          select.add(newOption, undefined);
        });
      });
    }
  }

  //Clearing team select fields
  static clearSelects() {
    document.getElementById("team1").value = "";
    document.getElementById("team2").value = "";
    const team1Options = document.querySelector("#team1").options;
    const team2Options = document.querySelector("#team2").options;

    while (team1Options.length > 1) {
      const team1 = team1Options.remove(1);
    }
    while (team2Options.length > 1) {
      const team2 = team2Options.remove(1);
    }
  }

  //toggle form visibility
  static formToggle(changeTo) {
    console.log("formtoggle fired");
    document.getElementById("form").classList.toggle("formActive");
  }

  //toggle formbutton background

  static formButtonToggle(e) {
    e.target.classList.toggle("formToggleButtonActive");
  }
}
