const input = document.getElementById("todoInput");
const list = document.getElementById("todoList");
const darkBtn = document.getElementById("darkModeBtn");

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});

// メモリ保存（完全リセット版）
let todos = [];

function renderTodos() {
  list.innerHTML = "";
  todos.forEach(todo => {
    const li = document.createElement("li");
    li.dataset.id = todo.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;

    const span = document.createElement("span");
    span.textContent = todo.title;
    span.classList.toggle("done", todo.done);

    // チェックボックス切り替え
    checkbox.onchange = () => {
      todo.done = checkbox.checked;
      span.classList.toggle("done", todo.done);
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "削除";
    delBtn.onclick = () => {
      todos = todos.filter(t => t.id !== todo.id);
      renderTodos();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);

    list.appendChild(li);
  });
}

// 追加
function addTodo() {
  const value = input.value.trim();
  if (!value) return;

  const todo = { id: Date.now(), title: value, done: false };
  todos.push(todo);
  input.value = "";
  renderTodos();
}

// ダークモード切替
darkBtn.onclick = () => {
  document.body.classList.toggle("dark");
};

// Sortable.jsでドラッグ並べ替え
Sortable.create(list, {
  animation: 150,
  onEnd: (evt) => {
    const item = todos.splice(evt.oldIndex, 1)[0];
    todos.splice(evt.newIndex, 0, item);
    renderTodos();
  }
});

renderTodos();