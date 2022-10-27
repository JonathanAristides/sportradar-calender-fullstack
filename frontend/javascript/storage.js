//storage class

export default class Storage {
  //get all events
  static async getAllEvents() {
    const response = await fetch("http://localhost:5000/events");
    const events = await response.json();

    return events;
  }

  //get all events of sport
  static async getAllEventsOfSport(sport) {
    const response = await fetch(`http://localhost:5000/events/${sport}`);
    const events = await response.json();
    return events;
  }

  //add event
  static async addEvent(data) {
    await fetch("http://localhost:5000/events/create", {
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
  }

  //delete event((((OPTIONAL!))))
  static removeEvent() {}
  //get all sports
  static getsports() {}
  //get all teams of sport
  static getTeams() {}
}
