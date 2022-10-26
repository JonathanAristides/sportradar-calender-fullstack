const { query } = require("express");
const express = require("express");
const mysql = require("mysql");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

//MySQL connection

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "sportradar_beispiel",
});

//Get all events

app.get("/events", (req, res) => {
  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(
      `SELECT events. Event_ID, events.Event_Date, events.Event_Time, sports.Sport_Name, teams.Team_Name as Team_1, t2.Team_Name as Team_2
        FROM events
        INNER JOIN sports ON events._Sport_ID=sports.Sport_ID
        INNER JOIN teams  ON events._Team1_ID=teams.Team_ID
        INNER JOIN teams t2 ON events._Team2_ID=t2.Team_ID
        WHERE events.Event_Date >= CURRENT_DATE
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
});

//Get event by id

app.get("/events/:id", (req, res) => {
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
});

//Get events by sport

app.get("/:sport", (req, res) => {
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
});

//Delete event by id

app.delete("/events/:id", (req, res) => {
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
});

//Create event

app.post("/events/create", (req, res) => {
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

        console.log(req.body);
      }
    );
  });
});

//Update event

app.put("/events/update/:id", (req, res) => {
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
});

//Listen on port

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
