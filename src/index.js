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

Make todo renderings better: 
have an icon that color's changes according to project. 
Include due date

check button

store with localStorage
Change Add project and todo buttons type to submit instead of button (after localstorage itll persist after refresh)
potentially add another default color for the projects, otherwise remain as balck.  (see html and controls.js)

MAKE TITLE AND DATE FOR TODO MANDANTORY 
set predetermined date to today 

Future: Mobile compatibility

use proejct id more 

check if colors are light enough and usedark text when making own projects , for better robustness and accessibility

Better optimizination
Whiel quicksort is quite efficient, there could be improvememnts made in how it is called and where.
Also, when new items are added the entire lists are re-rendered rather than just adding on the new item 
*/
