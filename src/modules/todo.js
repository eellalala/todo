import { allTD } from './lists.js';

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

    markDone(){
        this.isDone = true;
    }
    
    /* keep if needed
    get something(...) {}
    set something(...) {}
    */
}

// Testing area
const testTD1 = new ToDoItem('grocery shopping', new Date(2026, 5, 1), 'high', 'life', '');
const testTD2 = new ToDoItem('dog walk', new Date(2026, 5, 4), 'high', 'life', '');
const testTD3 = new ToDoItem('cooking', new Date(2026, 5, 5), 'high', 'life', '');

