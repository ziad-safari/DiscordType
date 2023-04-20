import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const path = require('path');
const express = require('express');

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Predator123!@#",
  database: "test",
});

app.use(cors());
app.use(express.json());

app.get("/discord", (req, res) => {
  const q = "SELECT * FROM discord";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/discord", (req, res) => {
  const q = "INSERT INTO discord (`name`, `avatar`, `id`, `wpm`) VALUES (?)";
  const values = [req.body.username, req.body.avatar, req.body.id, 0];
  const exists = `SELECT EXISTS(SELECT 1 FROM test.discord WHERE name = '${values[0]}') AS cnt`;
  db.query(exists, (err, data) => {
    if (err) return res.json(err);
    if (!data[0].cnt) {
      db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("User added");
      });
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const time = req.body.time;
  db.query(
    "UPDATE test.discord SET wpm = ? where id = ?",
    [time, id],
    (err, data) => {
      if (err) console.log(err);
      return res.json(data);
    }
  );
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
