import "./styles.css";
import { format, isBefore } from 'date-fns'; //import other functions from data-fns as needed

import './modules/controls.js';
import './modules/dom.js';
import './modules/lists.js';
import './modules/project.js';
import './modules/todo.js'; // later, change maybe to initialize function in controls.js that determines inital run

/* 
Home page shows most urgent tasks (including overdue section, and upcoming section)
Sort by Urgency
exists a default project (titled General/home/default - Grey)

!!! when checking off list for one, the item should be universally deleted off of all lists too!

Make todo renderings better: 
have an icon that color's changes according to project. 
Include due date

check button

store to-do objects in an array. and have arrays for the different categories



NOT SURE WHERE THIS GOES
let dueToday = filterWithin(allTD, 1);
let dueThreeDays = all.filterWithin(allTD, 3);
let dueWeek = all.filterWithin(allTD, 7);

store with localStorage
Change Add project and todo buttons type to submit instead of button (after localstorage itll persist after refresh)
potentially add another default color for the projects, otherwise remain as balck.  (see html and controls.js)

Future: Mobile compatibility
mobile devices don't have hover, so the hover to reveal delete button doesnt work 
Better optimizination
Whiel quicksort is quite efficient, there could be improvememnts made in how it is called and where.
Also, when new items are added the entire lists are re-rendered rather than just adding on the new item 
*/
