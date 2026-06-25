export { getLocalTDs, setLocalTDs, getLocalProjects, setLocalProjects };

function getLocalTDs() {
  const data = localStorage.getItem('todos');
  return data ? JSON.parse(data) : [];
}

function setLocalTDs(arr) {
  localStorage.setItem('todos', JSON.stringify(arr));
}

function getLocalProjects() {
  const data = localStorage.getItem('projects');
  return data ? JSON.parse(data) : [];
}

function setLocalProjects(arr) {
  localStorage.setItem('projects', JSON.stringify(arr));
}
