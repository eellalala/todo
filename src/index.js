import "./styles.css";
import "./modules/controls.js";
import {
  renderProjectsSide,
  projectOptions,
  renderHome,
} from "./modules/dom.js";
import { addProject } from "./modules/project.js";
import { addTodo } from "./modules/todo.js";
import { getLocalTDs, getLocalProjects } from "./modules/storage.js";

function restore(storedProjects, storedTDs) {
  storedProjects.forEach((project) => {
    addProject({
      title: project.title,
      color: project.color,
      id: project.id,
      tasks: [],
    });
  });

  storedTDs.forEach((todo) => {
    todo.dueDate = new Date(todo.dueDate);
    addTodo(todo);
  });
}

// on launch

restore(getLocalProjects(), getLocalTDs());

if (getLocalProjects().length == 0) {
  // check if they don't exist yet
  // initialize default projects and todos
  const unsortedProj = addProject({
    title: "Unsorted",
    color: "#8f9ca1",
    id: "00000000-0000-0000-0000-000000000000",
  });
  const myProject = addProject({ title: "My Project", color: "#8f9ca1" });

  const testTD1 = addTodo({
    title: "Grocery shopping",
    dueDate: new Date(2026, 5, 1),
    priority: "high",
    projectTitle: "Unsorted",
    note: "bring grocery bag",
  });
  const testTD2 = addTodo({
    title: "Walk dog",
    dueDate: new Date(2026, 5, 7),
    priority: "medium",
    projectTitle: "Unsorted",
    note: "",
  });
  const testTD3 = addTodo({
    title: "Clean bathroom",
    dueDate: new Date(2026, 5, 13),
    priority: "low",
    projectTitle: "Unsorted",
    note: "scrub shower and toilet",
  });
}

renderProjectsSide(getLocalProjects());
projectOptions(
  document.getElementById("todo-project-input"),
  getLocalProjects(),
);

renderHome();
