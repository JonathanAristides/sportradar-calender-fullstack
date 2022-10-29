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
    console.log(data._Sport_ID);
  }

  //delete event
  static async removeEvent(id) {
    console.log(id);
    await fetch(`http://localhost:5000/event/${id}`, { method: "DELETE" })
      .then(console.log(`Event with ${id} has been deleted`))
      .catch((error) => {
        console.log("Something went wrong " + error.message);
      });
    setTimeout(() => location.reload(), 500);
  }

  //get all sports
  static async getSports() {
    const response = await fetch("http://localhost:5000/sports");
    const events = await response.json();

    return events;
  }

  //get all teams of sport
  static async getTeams(sport) {
    const response = await fetch(`http://localhost:5000/teamsOfSport/${sport}`);
    const events = await response.json();

    return events;
  }
}
