// async & await | get all events
// const getEvents = async () => {
//   const response = await fetch("http://localhost:5000/events");

//   if (response.status !== 200) {
//     throw new Error("something went wrong " + response.status);
//   }

//   const data = await response.json();
//   return data;
// };

// getEvents()
//   .then((data) => {
//     let body = document.querySelector("body");
//     //   for (let i = 0; i < data.length; i++) {
//     //     console.log(data[i].Sport_Name);
//     //     body.innerText += data[i].Sport_Name + "\n";
//     //   }

//     data.forEach(function (date) {
//       console.log(date.Sport_Name);
//       body.innerText += date.Sport_Name + "\n";
//     });

//     //   for (let date of data) {
//     //     console.log(date.Sport_Name);
//     //     body.innerText += date.Sport_Name + "\n";
//     //   }
//   })
//   .catch((error) => console.log("Oh no, ", error.message));

// //Getting all Events
// const getAllEvents = async () => {
//   const response = await fetch("http://localhost:5000/events");
//   const events = await response.json();
//   // console.log(events);
//   return events;
// };

// getAllEvents()
//   .then((events) => {
//     console.log(events);
//     events.forEach((event) => {
//       const markup = `<li>${event.Sport_Name} | ${event.Team_1} | ${event.Team_2}<li/>`;
//       document.querySelector("ul").insertAdjacentHTML("beforeend", markup);
//     });
//   })
//   .catch((error) => console.log("Oh no", error.message));

//Get all Events of Sport

// const getAllEventsOfSport = async () => {
//   const response = await fetch("http://localhost:5000/events");
//   const events = await response.json();
//   // console.log(events);
//   return events;
// };

// const eventsOfSport = document.getElementById("ofSport");

// eventsOfSport.addEventListener("click", (element) => {
//   element.preventDefault();

// //Get all Events of Sport
// const getAllEventsOfSport = async () => {
//   const response = await fetch("http://localhost:5000/events/soccer");
//   const events = await response.json();
//   return events;
// };
// getAllEventsOfSport()
//   .then((events) => {
//     document.querySelector("ul").innerHTML = "";
//     console.log(events);
//     events.forEach((event) => {
//       const markup = `<li>${event.Sport_Name} | ${event.Team_1} | ${event.Team_2}<li/>`;
//       document.querySelector("ul").innerHTML += markup;
//     });
//   })
//   .catch((error) => console.log("Oh no", error.message));

// getAllEventsOfSport()
//   .then((events) => {
//     console.log(events);
//     events.forEach((event) => {
//       const markup = `<li>${event.Sport_Name} | ${event.Team_1} | ${event.Team_2}<li/>`;
//       document.querySelector("ul").insertAdjacentHTML("beforeend", markup);
//     });
//   })
//   .catch((error) => console.log("Oh no", error.message));

//Create new Event

const formEl = document.querySelector(".form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(formEl);
  const data = Object.fromEntries(formData);
  console.log(data);
  fetch("http://localhost:5000/events/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(console.log("Event created!"))
    .catch((error) => {
      console.log("Something went wrong " + error.message);
    });
});
