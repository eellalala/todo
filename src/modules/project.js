import { findById, findIndexById, sortByDue } from './lists.js';
export { allProjects, Project, addTDProj, removeTDProj };

const allProjects = []; // projects are stored as array of array .

class Project {
    tasks = [];

    constructor(title, color, id) {
        this.title = title;
        this.color = color; //based on what's filled in the form when the user clicks submit
        id == undefined ? this.id = crypto.randomUUID() : this.id = id;

        allProjects.push(this);
    }

    editProj(title, color) {
        this.title = title;
        this.color = color;
    }
}

function addTDProj(project, td) {
    project.tasks.push(td);
    sortByDue(project.tasks);
}

function removeTDProj(project, td) {
    project.tasks.splice(findIndexById(td.id, project.tasks), 1);
}

// initialize unsorted default project
const unsortedProj = new Project('Unsorted', '#8f9ca1', '00000000-0000-0000-0000-000000000000');