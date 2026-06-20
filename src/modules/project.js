import { findById, findIndexById, sortByDue } from './lists.js';
import { getProjects, setProjects } from './storage.js';
export { allProjects, Project, addTDProj, removeTDProj, addProject };

const allProjects = [];

class Project {
    constructor(project) {
        this.title = project.title;
        this.color = project.color; //based on what's filled in the form when the user clicks submit
        this.id = project.id ?? crypto.randomUUID();
        this.tasks = project.tasks ?? [];
    }

    editProj(title, color) {
        this.title = title;
        this.color = color;

        setProjects(allProjects);
    }
}

function addTDProj(project, td) {
    project.tasks.push(td);
    sortByDue(project.tasks);

    setProjects(allProjects);
}

function removeTDProj(project, td) {
    project.tasks.splice(findIndexById(td.id, project.tasks), 1);

    setProjects(allProjects);
}

function addProject({title, color, id, tasks}) {
    const newProject = new Project ({title, color, id, tasks});
    allProjects.push(newProject);
    
    setProjects(allProjects);

    return newProject;
}