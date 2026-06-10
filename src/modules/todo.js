import { allTD } from './lists.js';
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

        allTD.unshift(this);
    }

    toggleDone(){
        this.isDone = !this.isDone;
    }
    
    /* keep if needed
    get something(...) {}
    set something(...) {}
    */
}

// Testing area
const testTD1 = new ToDoItem('grocery shopping', new Date(2026, 5, 1), 'High', 'life', 'note');
const testTD2 = new ToDoItem('dog walk', new Date(2026, 5, 7), 'Medium', 'life', 'note');
const testTD3 = new ToDoItem('cooking', new Date(2026, 5, 13), 'Low', 'life', 'note');

