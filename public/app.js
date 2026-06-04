
const input = document.getElementById("todoInput");

/* Enterで追加 */
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});

/* 一覧取得 */
async function loadTodos() {
  const res = await fetch("/api/todos", {
    cache: "no-store" // ★キャッシュで復活するのを防ぐ
  });

  const todos = await res.json();

  const list = document.getElementById("todoList");
  list.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.dataset.id = todo.id;

    // チェックボックス
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;

    // テキスト
    const span = document.createElement("span");
    span.textContent = todo.title;

    // 見た目反映
    function render() {
      span.classList.toggle("done", todo.done);
    }

    render();

    // チェック更新
    checkbox.onchange = async () => {
      todo.done = checkbox.checked;

      await fetch(`/api/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: checkbox.checked })
      });

      render();
    };

    // 編集
    span.ondblclick = async () => {
      const newTitle = prompt("編集", todo.title);
      if (!newTitle || !newTitle.trim()) return;

      todo.title = newTitle;

      await fetch(`/api/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle })
      });

      span.textContent = newTitle;
    };

    // 削除（完全反映版）
    const delBtn = document.createElement("button");
    delBtn.textContent = "削除";

    delBtn.onclick = async () => {
      await fetch(`/api/todos/${todo.id}`, {
        method: "DELETE"
      });

      // ★reload依存をやめて即DOM削除
      li.remove();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);

    list.appendChild(li);
  });
}

/* 追加（空禁止・即再読み込み） */
async function addTodo() {
  const value = input.value;

  if (!value.trim()) return;

  await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: value })
  });

  input.value = "";

  // ★必ず最新状態に更新
  loadTodos();
}

/* ダークモード */
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

/* 初期読み込み */
loadTodos();