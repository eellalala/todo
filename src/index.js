import "./styles.css";
import { format, isBefore } from 'date-fns'; //import other functions from data-fns as needed

import './modules/controls.js';
import { renderProjectsSide, projectOptions, renderHome } from './modules/dom.js';
import './modules/lists.js';
import { addProject } from './modules/project.js';
import { addTodo } from './modules/todo.js'; // later, change maybe to initialize function in controls.js that determines inital run
import { getLocalTDs, setLocalTDs, getLocalProjects, setLocalProjects } from './modules/storage.js';
import { allTD, allProjects } from "./modules/lists.js";

/* 
Sort by Urgency

Make todo renderings better: 
have an icon that color's changes according to project. 

Change Add project and todo buttons type to submit instead of button (after localstorage itll persist after refresh)
potentially add another default color for the projects, otherwise remain as balck.  (see html and controls.js)

MAKE TITLE AND DATE FOR TODO MANDANTORY 
set predetermined date to today 

Future: Mobile compatibility

use proejct id more, currently proejct relies on title which can pose problems if two proj have ths ame title

check if colors are light enough and usedark text when making own projects , for better robustness and accessibility

Better optimizination
Whiel quicksort is quite efficient, there could be improvememnts made in how it is called and where.
Also, when new items are added the entire lists are re-rendered rather than just adding on the new item 

Better encapsulation and modularization. Being more selective of which data is shared between modules, using function calls to encapsulate better.
render project still uses some title idnetification which may pose problems if two projects share the same title
*/

/* nice to have feature: call sortByPrio if byDue they're the same
function sortByPrio(tDArr) {

}
*/

// run on startup

function restoreTDs() {
    const storedTDs = getLocalTDs();
    storedTDs.forEach(todo => {
        todo.dueDate = new Date(todo.dueDate);
        addTodo(todo);
    })
}

function restoreProjects() {
    const storedProjects = getLocalProjects();
    storedProjects.forEach(project => {
        addProject(project);
    })
}

// on launch

// initialize defaults project -- check that they dont exist first
restoreProjects();
restoreTDs();

console.log(getLocalProjects().length);

if (getLocalProjects().length == 0) { // check if they don't exist first 
    // initialize default projects and todos
    const unsortedProj = addProject({title: 'Unsorted', color: '#8f9ca1', id:'00000000-0000-0000-0000-000000000000'});
    const myProject = addProject({title: 'My Project', color: '#8f9ca1'});

    console.log(allTD);

    const testTD1 = addTodo({title: 'Grocery shopping', dueDate: new Date(2026, 5, 1), priority: 'high', projectTitle: 'Unsorted', note: 'bring grocery bag'});
    console.log(testTD1); // confirmed these are ToDos!
    const testTD2 = addTodo({title: 'Walk dog', dueDate: new Date(2026, 5, 7), priority: 'medium', projectTitle: 'Unsorted', note: ''});
    const testTD3 = addTodo({title: 'Clean bathroom', dueDate: new Date(2026, 5, 13), priority: 'low', projectTitle: 'Unsorted', note: 'scrub shower and toilet'});
    console.log(allTD);
    console.log(getLocalTDs());
}

/* 
The problem is that functions are calling getLocalTDs, but that returns objects instead of Todo items (which have b een restored into allTD)
Instead, they should be calling allTD and allTD is only saved to localstorage/taken from localstorage when necessary. 

*/

console.log(allProjects);
console.log(allTD);

renderProjectsSide(getLocalProjects());
projectOptions(document.getElementById('todo-project-input'), getLocalProjects());

renderHome();