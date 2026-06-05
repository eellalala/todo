import {allTD, filterWithin, sortByDue} from './lists.js';
export {renderTDArr }
/* remember to separate the function calls with controls.js to avoid clutter later. this should only 
be dom manipulation things only. event listeners are on controls.js */


function renderTDArr(parent, tdArr) {
    const tDTemplate = document.getElementById('todo-template');
    tdArr.forEach((td) => {
        const tDItem = tDTemplate.content.cloneNode(true);
        const tDTitle = tDItem.querySelector('span');
        tDTitle.textContent = td.title;
        parent.appendChild(tDItem);
    })
}

function deleteTD() {
    /// !!!
}

function editTD() {
    /// !!!
}