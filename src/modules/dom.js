import { format } from 'date-fns';
import { allTD, filterPast, filterFuture, filterWithin, findById, sortByDue} from './lists.js';
export { renderTDArr, checkTD, uncheckTD, expandTD, collapseTD, removeTD, reRenderHome, renderProjectsSide, projectOptions, renderProjectView, unRenderProjectView, deleteProjMsg};
/* remember to separate the function calls with controls.js to avoid clutter later. this should only 
be dom manipulation things only. event listeners are on controls.js */

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function renderTDArr(parent, tDArr) {;

    //remove existing children, prevent duplicate render
    parent.querySelectorAll('.todo-container').forEach(existingTD => {
        existingTD.remove();
    })

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
        tDDate.textContent = `Due: ${format(td.dueDate, 'eeee, MMMM do yyyy')}`;

        const checkBtn = tDContainer.querySelectorAll('button')[0];
        checkBtn.id = `check-btn-${td.id}`;

        const tDEditView = tDContainer.querySelector('div');
        tDEditView.id = `edit-todo-view-${td.id}`;

        const tDEditProjSelect = tDEditView.querySelector('.todo-project-edit');
        tDEditProjSelect.id = `todo-project-edit-${td.id}`;

        const editBackBtn = tDContainer.querySelector('.edit-todo-back');
        editBackBtn.id = `edit-todo-back-${td.id}`;

        const editSubmitBtn = tDContainer.querySelector('.edit-todo-submit');
        editSubmitBtn.id = `edit-todo-submit-${td.id}`;

        if (td.priority == 'high') tDContainer.classList.add('high-priority');
        if (td.priority == 'medium') tDContainer.classList.add('med-priority');
        if (td.priority == 'low') tDContainer.classList.add('low-priority');

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

    const tDInfo = document.createElement('div');
    tDInfo.classList.add('td-info');
    const tDInfoText = document.createElement('span');
    tDInfoText.textContent = `Project: ${td.projectTitle}`;
    tDInfo.appendChild(tDInfoText);
    const tDNote = document.createElement('span');
    tDNote.textContent = `Note: ${td.note}`;
    tDInfo.appendChild(tDNote);
    
    const tDDate = tDContainer.querySelectorAll('span')[1];
    tDDate.textContent = `Due: ${format(td.dueDate, 'eeee, MMMM do yyyy')}`;

    function makeBtn(type) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.classList.add(`${type}-btn`);
        btn.id = `${type}-btn-${td.id}`;
        btn.textContent = capitalizeFirst(type);

        tDContainer.appendChild(btn);
    }
    
    makeBtn('edit');
    makeBtn('delete');

    tDContainer.insertBefore(tDInfo, tDDate);
}

function collapseTD(tDId) {
    const tDContainer = document.getElementById(`todo-container-${tDId}`);
    tDContainer.classList.remove('expanded-todo'); 

    const td = findById(tDId, allTD);

    const tDInfo = tDContainer.querySelector('div');
    tDInfo.remove();

    const editBtn = tDContainer.querySelector('.edit-btn');
    const deleteBtn = tDContainer.querySelector('.delete-btn');
    editBtn.remove();
    deleteBtn.remove();
}

function removeTD(tDId) {
    const tDContainer = document.getElementById(`todo-container-${tDId}`);
    tDContainer.remove();
}

function reRenderHome() {
    if (document.getElementById('lists-container')) document.getElementById('lists-container').remove();

    const listsContainer = document.createElement('div');
    listsContainer.id = 'lists-container';

    function makeTDContainer(containerName, tDArr) {
        const tDContainer = document.createElement('section');
        tDContainer.classList.add('container-for-todos');
        tDContainer.id = `${containerName}-tasks`;

        const containerHead = document.createElement('h3');
        containerHead.textContent = capitalizeFirst(containerName);
        tDContainer.appendChild(containerHead);

        renderTDArr(tDContainer, tDArr);

        listsContainer.appendChild(tDContainer);
    }

    makeTDContainer('upcoming', filterFuture(allTD));
    makeTDContainer('overdue', filterPast(allTD));

    document.getElementById('main').appendChild(listsContainer);
}

function renderProjectsSide (projectArr) { 
    const sidebar = document.getElementById('sidebar');

    //remove existing children, prevent duplicate render
    sidebar.querySelectorAll('.side-project-container').forEach(existingProj => {
        existingProj.remove();
    })

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

function projectOptions(select, projectArr) {
    select.replaceChildren();
    
    projectArr.forEach((project) => {
        const option = document.createElement('option');
        option.textContent = project.title;
        option.setAttribute('value', project.title);

        select.appendChild(option);
    })
}

function renderProjectView(project) {
    document.getElementById('lists-container').remove();

    const id = project.id

    const projectView = document.createElement('section');
    projectView.id = 'project-view';
    projectView.classList.add('container-for-todos');

    const projectHead = document.createElement('h2');
    projectHead.textContent = project.title;
    projectView.appendChild(projectHead);

    renderTDArr(projectView, project.tasks);

    function makeBtn(type) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.classList.add(`${type}-project-btn`);
        btn.id = `${type}-project-btn-${id}`;
        btn.textContent = capitalizeFirst(type);

        projectView.appendChild(btn);
    }

    if (id != '00000000-0000-0000-0000-000000000000') {
        makeBtn('edit');
        makeBtn('delete');
    }

    // render edit view
    const editViewClone = document.getElementById('project-edit-template').content.cloneNode(true);
    const editView = editViewClone.querySelector('div');
    editView.id = `edit-project-view-${id}`;

    const editBackBtn = editView.querySelector('.edit-project-back');
    editBackBtn.id = `edit-project-back-${id}`;

    const editSubmitBtn = editView.querySelector('.edit-project-submit');
    editSubmitBtn.id = `edit-project-submit-${id}`;

    projectView.appendChild(editView);

    document.getElementById('main').appendChild(projectView);
}

function unRenderProjectView() {
    reRenderHome();
    document.getElementById('project-view').remove();
}

function deleteProjMsg(id, allProjects) {
    const projectView = document.getElementById('project-view');

    projectView.replaceChildren();

    const project = findById(id, allProjects);
    const deletedMsg = document.createElement('p');
    deletedMsg.textContent = `${project.title} deleted!`;

    projectView.appendChild(deletedMsg);
}