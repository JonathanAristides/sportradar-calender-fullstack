const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const jsonParser = bodyParser.json();

const router = require("express").Router();
const {
  getAllEventsAfterYesterday,
  getAllPassedEvents,
  getEventById,
  getEventsBySport,
  deleteEventOfId,
  createNewEvent,
  updateEvent,
  getSports,
  getTeamsOfSport,
} = require("../controller/eventController");

router.get("/events", getAllEventsAfterYesterday);
router.get("/passedEvents", getAllPassedEvents);
router.get("/event/:id", getEventById);
router.get("/events/:sport", getEventsBySport);
router.post("/events/create", jsonParser, createNewEvent);
router.put("/event/update/:id", jsonParser, updateEvent);
router.delete("/event/:id", deleteEventOfId);

router.get("/sports", getSports);
router.get("/teamsOfSport/:id", getTeamsOfSport);

module.exports = router;
