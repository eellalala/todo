import { format, isBefore } from 'date-fns'; //import other functions from data-fns as needed

/* 
Each to-do is an object.
Properties:
-Title (String)
-Priority (enumerated strings)
-Due Date ()
-notes
- Category (enumerated Strings)
-isCompleted (boolean)

Home page shows most urgent tasks (including overdue section, and upcoming section)
Sort by Urgency
Side bar with different projects
exists a default project (titled General)

click on todo to expand
check button
edit and delete button (appears when hovering on it)

store to-do objects in an array. and have arrays for the different categories

import datefns

createProject

store with localStorage

Future: Mobile compatibility
mobile devices don't have hover, so the hover to reveal delete button doesnt work 
*/

class ToDoItem {
    isCompleted = false;

    constructor(title, dueDate, priority, category, note) {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.category = category;
        this.note = note;
    }

    saySomething(){
        console.log('I am a todo');
    }
    
    /* keep if needed
    get something(...) {}
    set something(...) {}
    */
}