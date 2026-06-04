async function loadTodos() {

  const response =
    await fetch("/api/todos");

  const todos =
    await response.json();

  const list =
    document.getElementById("todoList");

  list.innerHTML = "";

  todos.forEach(todo => {

    const li =
      document.createElement("li");

    li.textContent = todo.title;

    list.appendChild(li);

  });

}

async function addTodo() {

  const input =
    document.getElementById("todoInput");

  await fetch("/api/todos", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      title: input.value
    })

  });

  input.value = "";

  loadTodos();

}

loadTodos();