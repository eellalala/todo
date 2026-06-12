import { allTD } from './lists.js';
import { addTDProj, removeTDProj } from './project.js';
export { ToDoItem };

class ToDoItem {
    isDone = false;

    constructor(title, dueDate, priority, project, note) {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.note = note;
        this.id = crypto.randomUUID();

        addTD(project, this);
        allTD.unshift(this);
    }

    toggleDone(){
        this.isDone = !this.isDone;
    }
    
    editTD(title, dueDate, priority, project, note) {
        removeTD(this.project, this); 

        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.note = note;

        addTD(project, this);
    }
}

// default Todos on app launch
const testTD1 = new ToDoItem('Grocery shopping', new Date(2026, 5, 1), 'high', 'Home', 'bring grocery bag');
const testTD2 = new ToDoItem('Walk dog', new Date(2026, 5, 7), 'medium', 'Home', '');
const testTD3 = new ToDoItem('Clean bathroom', new Date(2026, 5, 13), 'low', 'Home', 'scrub shower and toilet');

