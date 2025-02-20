const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const usersRouter = require("./routes/api/users");
const contactsRouter = require("./routes/api/contacts");
const accessDb = require("./dbConnection");

const app = express();
app.use(express.static("public"));
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
accessDb();
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
