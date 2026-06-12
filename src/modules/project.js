import { findById, sortByDue } from './lists.js';
export { allProjects, Project, addTDProj, removeTDProj };

const allProjects = []; // projects are stored as array of array .

class Project {
    tasks = [];

    constructor(title, color) {
        this.title = title;
        this.color = color; //based on what's filled in the form when the user clicks submit
        this.id = crypto.randomUUID();

        allProjects.push(this);
    }
}

function addTDProj(project, td) {
    project.tasks.push(td);
    sortByDue(project);
}

function removeTDProj(project, td) {
    project.splice(findIndexById(td.id, project), 1);
}

// initialize default project
const testPro1 = new Project('Home', '#8f9ca1');