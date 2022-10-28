const express = require("express");
const app = express();
const mysql = require("mysql");

//MySQL connection
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "sportradar_beispiel",
});

//Get all events after Yesterday
module.exports.getAllEventsAfterYesterday = async (req, res) => {
  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(
      `SELECT events. Event_ID, events.Event_Date, events.Event_Time, sports.Sport_Name, teams.Team_Name as Team_1, t2.Team_Name as Team_2
        FROM events
        INNER JOIN sports ON events._Sport_ID=sports.Sport_ID
        INNER JOIN teams  ON events._Team1_ID=teams.Team_ID
        INNER JOIN teams t2 ON events._Team2_ID=t2.Team_ID
        ORDER BY events.Event_Date;`,
      (error, rows) => {
        connection.release();

        if (error) {
          console.log(error);
          return;
        }

        res.send(rows);
      }
    );
  });
};

//Get all passed events
module.exports.getAllPassedEvents = async (req, res) => {
  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(
      `SELECT events. Event_ID, events.Event_Date, events.Event_Time, sports.Sport_Name, teams.Team_Name as Team_1, t2.Team_Name as Team_2
        FROM events
        INNER JOIN sports ON events._Sport_ID=sports.Sport_ID
        INNER JOIN teams  ON events._Team1_ID=teams.Team_ID
        INNER JOIN teams t2 ON events._Team2_ID=t2.Team_ID
        WHERE events.Event_Date < CURRENT_DATE
        ORDER BY events.Event_Date;`,
      (error, rows) => {
        connection.release();

        if (error) {
          console.log(error);
          return;
        }

        res.send(rows);
      }
    );
  });
};

//Get event by id
module.exports.getEventById = async (req, res) => {
  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(
      `SELECT events.Event_ID, events.Event_Date, events.Event_Time, sports.Sport_Name, teams.Team_Name as Team_1, t2.Team_Name as Team_2
        FROM events
        INNER JOIN sports ON events._Sport_ID=sports.Sport_ID
        INNER JOIN teams  ON events._Team1_ID=teams.Team_ID
        INNER JOIN teams t2 ON events._Team2_ID=t2.Team_ID
        WHERE events.Event_ID = ?;`,
      [req.params.id],
      (error, rows) => {
        connection.release();

        if (error) {
          console.log(error);
          return;
        }

        res.send(rows);
      }
    );
  });
};

//Get events by sport
module.exports.getEventsBySport = async (req, res) => {
  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(
      `SELECT events.Event_ID, events.Event_Date, events.Event_Time, sports.Sport_Name, teams.Team_Name as Team_1, t2.Team_Name as Team_2
        FROM events
        INNER JOIN sports ON events._Sport_ID=sports.Sport_ID
        INNER JOIN teams  ON events._Team1_ID=teams.Team_ID
        INNER JOIN teams t2 ON events._Team2_ID=t2.Team_ID
        WHERE sports.Sport_Name=?;`,
      [req.params.sport],
      (error, rows) => {
        connection.release();

        if (error) {
          console.log(error);
          return;
        }

        res.send(rows);
      }
    );
  });
};

//Delete event by id
module.exports.deleteEventOfId = async (req, res) => {
  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(
      `DELETE FROM events WHERE events.Event_ID = ?`,
      [req.params.id],
      (error, rows) => {
        connection.release();

        if (error) {
          console.log(error);
          return;
        }

        res.send(`Event ${req.params.id} has been removed`);
      }
    );
  });
};

//Create event
module.exports.createNewEvent = async (req, res) => {
  pool.getConnection((error, connection) => {
    if (error) throw error;
    const params = req.body;
    connection.query(
      `INSERT INTO events SET Event_Date = ?, Event_Time = ?, _Sport_ID = ?, _Team1_ID = ?, _Team2_ID = ?`,
      [
        params.Event_Date,
        params.Event_Time,
        params._Sport_ID,
        params._Team1_ID,
        params._Team2_ID,
      ],
      (error, rows) => {
        connection.release();

        if (error) {
          console.log(error);
          return;
        }

        res.send(`Event created`);
      }
    );
  });
};

//Update event
module.exports.updateEvent = async (req, res) => {
  pool.getConnection((error, connection) => {
    if (error) throw error;

    const {
      Event_Date,
      Event_Time,
      _Sport_ID,
      _Team1_ID,
      _Team2_ID,
      Event_ID,
    } = req.body;
    console.log(req.body);
    connection.query(
      `UPDATE events SET Event_Date = ?, Event_Time = ?, _Sport_ID = ?, _Team1_ID = ?, _Team2_ID = ?
      WHERE events.Event_ID = ?`,

      [Event_Date, Event_Time, _Sport_ID, _Team1_ID, _Team2_ID, Event_ID],
      (error, rows) => {
        connection.release();

        if (error) {
          console.log(error);
          return;
        }

        res.send(`Event with id ${Event_ID} has been updated`);
      }
    );
  });
};

//Get sports
module.exports.getSports = async (req, res) => {
  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(`SELECT * FROM sports`, (error, rows) => {
      connection.release();

      if (error) {
        console.log(error);
        return;
      }

      res.send(rows);
    });
  });
};

//Get teams of sport
module.exports.getTeamsOfSport = async (req, res) => {
  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(
      `SELECT * FROM teams WHERE _Team_Sport_ID = ?`,
      [req.params.id],
      (error, rows) => {
        connection.release();

        if (error) {
          console.log(error);
          return;
        }

        res.send(rows);
      }
    );
  });
};
