import { format } from 'date-fns';
import { allTD, filterWithin, findById, sortByDue} from './lists.js';
export { renderTDArr, checkTD, uncheckTD, expandTD, collapseTD, removeTD, editTD, finishEditTD, renderProjectsSide };
/* remember to separate the function calls with controls.js to avoid clutter later. this should only 
be dom manipulation things only. event listeners are on controls.js */


function renderTDArr(parent, tDArr) {;
    tDArr.forEach((td) => {
        renderTD(td, parent);
    })
}

function renderTD(td, parent) {
        const tDTemplate = document.getElementById('todo-template');

        const tDItem = tDTemplate.content.cloneNode(true);
        const tDContainer = tDItem.querySelector('div');
        const tDTitle = tDContainer.querySelectorAll('span')[0];
        tDTitle.textContent = td.title;
        tDTitle.id = `todo-title-${td.id}`;
        const tDDate = tDContainer.querySelectorAll('span')[1];
        tDDate.textContent = format(td.dueDate, 'eee MMM d');

        const checkBtn = tDContainer.querySelectorAll('button')[0];
        checkBtn.id = `check-btn-${td.id}`;
        const editBtn = tDContainer.querySelectorAll('button')[1];
        editBtn.id = `edit-btn-${td.id}`;
        const deleteBtn = tDContainer.querySelectorAll('button')[2];
        deleteBtn.id = `delete-btn-${td.id}`;
        tDContainer.id = `todo-container-${td.id}`;

        parent.appendChild(tDContainer);
}

function checkTD(tDId) {
    const checkBtn = document.getElementById(`check-btn-${tDId}`);
    checkBtn.textContent = '✓';
}

function uncheckTD(tDId) {
    const checkBtn = document.getElementById(`check-btn-${tDId}`);
    checkBtn.textContent = '';
}

function expandTD(tDId) {
    const tDContainer = document.getElementById(`todo-container-${tDId}`);
    tDContainer.classList.add('expanded-todo');

    const td = findById(tDId, allTD);

    const tDProject = document.createElement('div');
    const tDProjectText = document.createElement('span');
    tDProjectText.textContent = td.project;
    tDProject.appendChild(tDProjectText);
    
    const tDDate = tDContainer.querySelectorAll('span')[1];
    tDDate.textContent = `Due: ${format(td.dueDate, 'eeee, MMMM do yyyy')}`;

    tDContainer.insertBefore(tDProject, tDDate);
}

function collapseTD(tDId) {
    const tDContainer = document.getElementById(`todo-container-${tDId}`);
    tDContainer.classList.remove('expanded-todo'); 

    const td = findById(tDId, allTD);

    const tDDate = tDContainer.querySelectorAll('span')[2];
    tDDate.textContent = format(td.dueDate, 'eee, MMM d');

    const tDProject = tDContainer.querySelector('div');
    tDProject.remove();
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

function renderProjectsSide (projectArr) { 
    const sidebar = document.getElementById('sidebar');
    const projectTemplate = document.getElementById('side-project-template');
    projectArr.forEach((project) => {
        const projectItem = projectTemplate.content.cloneNode(true);
        const projectContainer = projectItem.querySelector('div');
        const projectTitle = projectItem.querySelector('span');
        projectTitle.textContent = project.title;
        projectContainer.style.backgroundColor = project.color;

        projectContainer.id = `side-project-container-${project.id}`;

        sidebar.appendChild(projectContainer);
    })
}