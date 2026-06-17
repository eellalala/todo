import { allTD, findProjByTitle } from './lists.js';
import { addTDProj, removeTDProj, allProjects } from './project.js';
export { ToDoItem };

class ToDoItem {
    isDone = false;

    constructor(title, dueDate, priority, projectTitle, note) {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projectTitle = projectTitle;
        this.note = note;
        this.id = crypto.randomUUID();

        addTDProj(findProjByTitle(projectTitle, allProjects), this);
        allTD.unshift(this);
    }

    toggleDone(){
        this.isDone = !this.isDone;
    }
    
    editTD(title, dueDate, priority, projectTitle, note) {
        const oldProjectArr = findProjByTitle(this.projectTitle, allProjects);
        const newProjectArr = findProjByTitle(projectTitle, allProjects);;
        removeTDProj(oldProjectArr, this); 

        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projectTitle = projectTitle;
        this.note = note;

        addTDProj(newProjectArr, this);
    }
}

// default Todos on app launch
const testTD1 = new ToDoItem('Grocery shopping', new Date(2026, 5, 1), 'high', 'Home', 'bring grocery bag');
const testTD2 = new ToDoItem('Walk dog', new Date(2026, 5, 7), 'medium', 'Home', '');
const testTD3 = new ToDoItem('Clean bathroom', new Date(2026, 5, 13), 'low', 'Home', 'scrub shower and toilet');

