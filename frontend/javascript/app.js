// //fetchAPI | get all events
// fetch("http://localhost:5000/events")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// async & await | get all events
const getEvents = async () => {
  const response = await fetch("http://localhost:5000/events");
  const data = await response.json();
  return data;
};

getEvents()
  .then((data) => {
    let body = document.querySelector("body");
    //   for (let i = 0; i < data.length; i++) {
    //     console.log(data[i].Sport_Name);
    //     body.innerText += data[i].Sport_Name + "\n";
    //   }

    data.forEach(function (date) {
      console.log(date.Sport_Name);
      body.innerText += date.Sport_Name + "\n";
    });

    //   for (let date of data) {
    //     console.log(date.Sport_Name);
    //     body.innerText += date.Sport_Name + "\n";
    //   }
  })
  .catch((error) => console.log("reject", error.message));
