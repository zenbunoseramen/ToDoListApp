const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

// メモリ上の簡易DB（Render再起動で消える）
let todos = [];

// 一覧取得
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// 追加
app.post("/api/todos", (req, res) => {
  const title = req.body.title;

  if (!title) {
    return res.status(400).json({ error: "title is required" });
  }

  const todo = {
    id: Date.now(),
    title: title
  };

  todos.push(todo);

  res.json(todo);
});

app.listen(port, () => {
  console.log("Server running on " + port);
});