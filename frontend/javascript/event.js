//event class

export default class Event {
  constructor(id, date, time, sportName, team1Name, team2Name) {
    this.Event_ID = id;
    this.Event_Date = date;
    this.Event_Time = time;
    this.Sport_Name = sportName;
    this.Team_1 = team1Name;
    this.Team_2 = team2Name;
  }
}
