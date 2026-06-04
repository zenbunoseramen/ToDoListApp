const express = require("express");
const db = require("./database");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

app.get("/api/todos", (req, res) => {

  db.all(
    "SELECT * FROM todos",
    [],
    (err, rows) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(rows);

    }
  );

});

app.post("/api/todos", (req, res) => {

  const { title } = req.body;

  db.run(
    "INSERT INTO todos(title) VALUES(?)",
    [title],
    function(err) {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        id: this.lastID,
        title
      });

    }
  );

});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});