export { getTDs, setTDs, getProjects, setProjects };

function getTDs() {
    const data = localStorage.getItem('todos');
    return data ? JSON.parse(data) : [];
}

function setTDs(arr) {
    localStorage.setItem('todos', JSON.stringify(arr));
}

function getProjects() {
    const data = localStorage.getItem('projects');
    return data ? JSON.parse(data) : [];}

function setProjects(arr) {
    localStorage.setItem('projects', JSON.stringify(arr));
}
