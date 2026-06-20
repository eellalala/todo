import { allProjects, findById, findIndexById, sortByDue } from './lists.js';
import { getLocalProjects, setLocalProjects } from './storage.js';
export { Project, addTDProj, removeTDProj, addProject };

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

        setLocalProjects(allProjects);
    }
}

function addTDProj(project, td) {
    project.tasks.push(td);
    sortByDue(project.tasks);

    setLocalProjects(allProjects);
}

function removeTDProj(project, td) {
    project.tasks.splice(findIndexById(td.id, project.tasks), 1);

    setLocalProjects(allProjects);
}

function addProject({title, color, id, tasks}) {
    const newProject = new Project ({title, color, id, tasks});
    allProjects.push(newProject);
    
    setLocalProjects(allProjects);

    return newProject;
}