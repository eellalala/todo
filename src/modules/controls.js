import { allTD, filterPast, filterFuture, filterWithin, sortByDue, findById, deleteTD } from './lists.js';
import { allProjects, Project } from './project.js';
import { renderTDArr, checkTD, uncheckTD, expandTD, collapseTD, removeTD, editTD, finishEditTD, renderProjectsSide, projectOptions } from './dom.js';
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
        projectOptions(allProjects);
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
        // delete the actual item --  add an ID property for todo with crypto.randomUUID().
            // how to save the id: when the item is rendered, set the ID of the edit button to edit-btn-ID
            // then, stringplice the last 36 characters to get the ID again
        // edit from dom - 1. 
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

    duedateInput.valueAsDate = new Date();

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
        const upcomingTasks = document.getElementById('upcoming-tasks');
        renderTDArr(upcomingTasks, filterFuture(allTD));
        const overdueTasks = document.getElementById('overdue-tasks');
        renderTDArr(overdueTasks, filterPast(allTD));
    }
})

// initial functions to run when opens 
renderProjectsSide(allProjects);
projectOptions(allProjects);

const upcomingTasks = document.getElementById('upcoming-tasks');
renderTDArr(upcomingTasks, filterFuture(allTD));

const overdueTasks = document.getElementById('overdue-tasks');
renderTDArr(overdueTasks, filterPast(allTD));

//testing area 

const projectsTestBtn = document.getElementById('projects-test-btn');
projectsTestBtn.addEventListener('click', () => {
    renderProjectsSide(allProjects);
})

const upcomingTestBtn = document.getElementById('upcoming-test-btn');
upcomingTestBtn.addEventListener('click', () => {
    const upcomingTasks = document.getElementById('upcoming-tasks');
    renderTDArr(upcomingTasks, filterFuture(allTD));

})

const overdueTestBtn = document.getElementById('overdue-test-btn');
overdueTestBtn.addEventListener('click', () => {
    const overdueTasks = document.getElementById('overdue-tasks');
    renderTDArr(overdueTasks, filterPast(allTD));
})
