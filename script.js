let data = JSON.parse(localStorage.getItem("data")) || [];
const ul = document.getElementById("El");

function addTodo() {
  const input = document.getElementById("inp");
  const todo = input.value;

  if (todo.trim() === "") {
    alert("Please Write Something");
    return;
  }

  data.push({ todo: todo, completed: false });
  localStorage.setItem("data", JSON.stringify(data));

  input.value = "";

  displayTodo();
}

function displayTodo() {
  ul.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    const li = document.createElement("li");
    const span = document.createElement("span");

    span.textContent = data[i].todo + " ";
    const check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.checked = data[i].completed;

    if (data[i].completed) {
      span.style.textDecoration = "line-through";
    }

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.onclick = function () {
      if (!data[i].completed) {
        const updatedTodo = prompt("Edit your todo", data[i].todo);

        if (updatedTodo !== null && updatedTodo.trim() !== "") {
          data[i].todo = updatedTodo;
          localStorage.setItem("data", JSON.stringify(data));
          displayTodo();
        }
      } else {
        alert("completed task cannot be edited");
      }
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";

    delBtn.onclick = function () {
      data.splice(i, 1);
      localStorage.setItem("data", JSON.stringify(data));
      displayTodo();
    };

    check.onchange = function () {
      if (check.checked) {
        data[i].completed = true;
        span.style.textDecoration = "line-through";
      } else {
        data[i].completed = false;
        span.style.textDecoration = "none";
      }

      localStorage.setItem("data", JSON.stringify(data));
    };

    li.appendChild(span);
    li.appendChild(check);
    li.appendChild(editBtn);
    li.appendChild(delBtn);

    ul.appendChild(li);
  }
}

displayTodo();
