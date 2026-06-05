import "./styles.css";
import { format, isBefore } from 'date-fns'; //import other functions from data-fns as needed

import './modules/controls.js';
import './modules/dom.js';
import './modules/lists.js';
import './modules/project.js';
import './modules/todo.js'; // later, change maybe to initialize function in controls.js that determines inital run

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


NOT SURE WHERE THIS GOES
let dueToday = filterWithin(allTD, 1);
let dueThreeDays = all.filterWithin(allTD, 3);
let dueWeek = all.filterWithin(allTD, 7);

store with localStorage

Future: Mobile compatibility
mobile devices don't have hover, so the hover to reveal delete button doesnt work 
*/
