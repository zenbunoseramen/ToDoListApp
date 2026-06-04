
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

// メモリ保存（ここに入る）
let todos = [];

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const todo = {
    id: Date.now(),
    title: req.body.title,
    done: false
  };

  todos.push(todo);

  res.json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  todos = todos.filter(t => t.id !== id);

  res.json({ ok: true });
});

app.put("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (todo) {
    if (req.body.title !== undefined) todo.title = req.body.title;
    if (req.body.done !== undefined) todo.done = req.body.done;
  }

  res.json(todo || {});
});

app.listen(port, () => {
  console.log("Server running on", port);
});