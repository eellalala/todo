import { allTD, filterPast, filterFuture, filterWithin, sortByDue, findById, deleteTD } from './lists.js';
import { allProjects } from './project.js';
import { renderTDArr, checkTD, uncheckTD, expandTD, collapseTD, removeTD, editTD, finishEditTD, renderProjectsSide } from './dom.js';
import { ToDoItem } from './todo.js';

const main = document.getElementById('main');

// FOR DELTE FUNCTION -- DO first. then implement edit
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

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('todo-title')) {
        const id = event.target.id.slice(-36);
        const container = document.getElementById(`todo-container-${id}`);
        console.log(container.classList);
        if (container.classList.contains('expanded-todo')) {
            collapseTD(id);
        } else expandTD(id);
    }
})

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
