import { allTD, filterPast, filterFuture, filterWithin, sortByDue, findById, deleteTD } from './lists.js';
import { allProjects, Project } from './project.js';
import { renderTDArr, checkTD, uncheckTD, expandTD, collapseTD, removeTD, editTD, finishEditTD, renderProjectsSide, projectOptions, reRenderHome } from './dom.js';
import { ToDoItem } from './todo.js';

const sidebar = document.getElementById('sidebar');
const main = document.getElementById('main');

const addProjectBtn = document.getElementById('add-project-btn');
addProjectBtn.addEventListener('click', () => {
    const addProjectView = document.getElementById('add-project-view');
    addProjectView.classList.remove('hidden');
})

const addTDBtn = document.getElementById('add-td-btn');
addTDBtn.addEventListener('click', () => {
    const addTDView = document.getElementById('add-todo-view');
    addTDView.classList.remove('hidden');
})

sidebar.addEventListener('click', (event) => {
    const addProjectView = document.getElementById('add-project-view');
    const titleInput = document.getElementById('project-title-input');
    const colorInput = document.getElementById('project-color-input');

    if (event.target.id == 'add-project-back') {
        addProjectView.classList.add('hidden');

        titleInput.value = '';
        colorInput.value = '#000000';
    }
    if (event.target.id == 'add-project-submit') {
        new Project (titleInput.value, colorInput.value);
        addProjectView.classList.add('hidden');

        titleInput.value = '';
        colorInput.value = '#000000';

        renderProjectsSide(allProjects);
        projectOptions(document.getElementById('todo-project-input'), allProjects);
    }
})

main.addEventListener('click', (event) => {
    const target = event.target;
    const id = target.id.slice(-36);
    if (target.classList.contains('delete-btn')) {
        deleteTD(id, allTD);      
        removeTD(id);
    }
    if (target.classList.contains('check-btn')) {
        const td = findById(id, allTD);
        td.isDone ? uncheckTD(id) : checkTD(id);
        td.toggleDone();
    }
    if (target.classList.contains('edit-btn')) {
        const editTDView = document.getElementById(`edit-todo-view-${id}`);
        projectOptions(document.getElementById(`todo-project-edit-${id}`), allProjects);
        editTDView.classList.remove('hidden');
    }
})

// edit todo functionality 
main.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('edit-todo-back') || target.classList.contains('edit-todo-submit')) {
        const id = target.id.slice(-36);
        const td = findById(id, allTD);
    
        const editTDView = document.getElementById(`edit-todo-view-${id}`);

        const newTitle = editTDView.querySelector('.todo-title-edit');
        const newDueDate = editTDView.querySelector('.todo-duedate-edit');
        const newPrio = editTDView.querySelector('.todo-prio-edit');
        const newProject = editTDView.querySelector('.todo-project-edit');
        const newNote = editTDView.querySelector('.todo-note-edit');
        
        function clearEditView() {
            newTitle.value = '';
            newNote.value = '';
            editTDView.classList.add('hidden');
        }

        if (target.classList.contains('edit-todo-back')) {
            clearEditView();
        }
        if (target.classList.contains('edit-todo-submit')) {
            td.editTD(newTitle.value, newDueDate.value, newPrio.value, newProject.value, newNote.value);
            reRenderHome();
            clearEditView();
        }
    }
})

main.addEventListener('click', (event) => {
    if (event.target.classList.contains('todo-title')) {
        const id = event.target.id.slice(-36);
        const container = document.getElementById(`todo-container-${id}`);
        console.log(container.classList);
        if (container.classList.contains('expanded-todo')) {
            collapseTD(id);
        } else expandTD(id);
    }
})

main.addEventListener('click', (event) => {
    const addTDView = document.getElementById('add-todo-view');
    const titleInput = document.getElementById('todo-title-input');
    const duedateInput = document.getElementById('todo-duedate-input');
    const priorityInput = document.getElementById('todo-prio-input');
    const projectInput = document.getElementById('todo-project-input');
    const noteInput = document.getElementById('todo-note-input');

    if (event.target.id == 'add-todo-back') {
        addTDView.classList.add('hidden');

        titleInput.value = '';
        noteInput.value = '';
    }
    if (event.target.id == 'add-todo-submit') {
        new ToDoItem (titleInput.value, duedateInput.value, priorityInput.value, projectInput.value, noteInput.value);
        addTDView.classList.add('hidden');

        titleInput.value = '';
        noteInput.value = '';

        console.log(allTD);

        // rerendering the displayed page: depends on if user is on home screen or project screen. make into a function for repeated calls. 
        reRenderHome();
    }
})

// initial functions to run when opens 
renderProjectsSide(allProjects);
projectOptions(document.getElementById('todo-project-input'), allProjects);

const upcomingTasks = document.getElementById('upcoming-tasks');
renderTDArr(upcomingTasks, filterFuture(allTD));

const overdueTasks = document.getElementById('overdue-tasks');
renderTDArr(overdueTasks, filterPast(allTD));

