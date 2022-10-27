const eventRoutes = require("./routes/eventRoutes");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

var cors = require("cors");
app.use(cors({ origin: "*" }));

app.use("/", eventRoutes);
//Listen on port

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
