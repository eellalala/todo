import { allTD, findProjByTitle } from './lists.js';
import { addTDProj, removeTDProj, allProjects } from './project.js';
export { ToDoItem };

class ToDoItem {
    isDone = false;

    constructor(title, dueDate, priority, projectT, note) {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = projectT;
        this.note = note;
        this.id = crypto.randomUUID();

        addTDProj(findProjByTitle(projectT, allProjects), this);
        allTD.unshift(this);
    }

    toggleDone(){
        this.isDone = !this.isDone;
    }
    
    editTD(title, dueDate, priority, projectT, note) {
        const oldProjectArr = findProjByTitle(this.project, allProjects);
        const newProjectArr = findProjByTitle(project, allProjects);;
        removeTDProj(oldProjectArr, this); 

        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = projectT;
        this.note = note;

        addTDProj(newProjectArr, this);
    }
}

// default Todos on app launch
const testTD1 = new ToDoItem('Grocery shopping', new Date(2026, 5, 1), 'high', 'Home', 'bring grocery bag');
const testTD2 = new ToDoItem('Walk dog', new Date(2026, 5, 7), 'medium', 'Home', '');
const testTD3 = new ToDoItem('Clean bathroom', new Date(2026, 5, 13), 'low', 'Home', 'scrub shower and toilet');

