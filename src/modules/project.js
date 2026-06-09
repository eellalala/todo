import { sortByDue } from './lists.js';
export { allProjects, Project };

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

function addTD(project, td) {
    project.tasks.push(td);
    sortByDue(project);
}

//testing area
const testPro1 = new Project('Home', 'Green');