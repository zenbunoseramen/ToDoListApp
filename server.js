
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

console.log("🚀 SERVER STARTED - FULL RESET MODE");

/*
=================================================
🔥 完全リセット設計（重要）
=================================================

・データ保存：一切しない
・メモリ保持：しない
・常に空状態を返す
*/

let todos = []; // 使うが、即リセットされる

// ★一覧：常に空を返す（最重要）
app.get("/api/todos", (req, res) => {
  res.json([]);
});

// ★追加：保存しない（ログだけ）
app.post("/api/todos", (req, res) => {
  console.log("ADD IGNORED:", req.body);

  // 一時的に返すだけ（保存しない）
  const tempTodo = {
    id: Date.now(),
    title: req.body.title,
    done: false
  };

  res.json(tempTodo);
});

// ★削除：何もしない（状態保持なし）
app.delete("/api/todos/:id", (req, res) => {
  console.log("DELETE IGNORED:", req.params.id);
  res.json({ ok: true });
});

// ★更新：何もしない
app.put("/api/todos/:id", (req, res) => {
  console.log("UPDATE IGNORED:", req.params.id, req.body);
  res.json({ ok: true });
});

// ★並び替え：無視
app.post("/api/todos/reorder", (req, res) => {
  console.log("REORDER IGNORED:", req.body);
  res.json({ ok: true });
});

// 起動
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});