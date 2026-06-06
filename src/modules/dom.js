import { allTD, filterWithin, sortByDue} from './lists.js';
export { renderTDArr, removeTD, editTD, finishEditTD }
/* remember to separate the function calls with controls.js to avoid clutter later. this should only 
be dom manipulation things only. event listeners are on controls.js */


function renderTDArr(parent, tDArr) {
    const tDTemplate = document.getElementById('todo-template');
    tDArr.forEach((td) => {
        const tDItem = tDTemplate.content.cloneNode(true);
        const tDContainer = tDItem.querySelector('div');
        const tDTitle = tDContainer.querySelector('span');
        tDTitle.textContent = td.title;

        const checkBtn = tDContainer.querySelectorAll('button')[0];
        checkBtn.id = `check-btn${td.id}`;
        const editBtn = tDContainer.querySelectorAll('button')[1];
        editBtn.id = `edit-btn-${td.id}`;
        const deleteBtn = tDContainer.querySelectorAll('button')[2];
        deleteBtn.id = `delete-btn-${td.id}`;
        tDContainer.id = `todo-container-${td.id}`;

        parent.appendChild(tDContainer);
    })
}

function removeTD(tDId) {
    const tDContainer = document.getElementById(`todo-container-${tDId}`);
    tDContainer.remove();
}

function editTD() {
    /// !!! when clicking on edit button, shows up popup
}

function finishEditTD() {
    //!!! when clicking on done editing, reflects changes
}