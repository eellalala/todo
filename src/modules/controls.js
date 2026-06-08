import { allTD, filterPast, filterFuture, filterWithin, sortByDue, findById, deleteTD } from './lists.js';
import { allProjects } from './project.js';
import { renderTDArr, checkTD, removeTD, editTD, finishEditTD, renderProjectsSide } from './dom.js';
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
        checkTD(id);
        console.log(id);
        const td = findById(id, allTD);
        console.log(td);
        td.markDone();
        console.log(td);
        // Mark the object TOdo as done 
    }
    if (target.classList.contains('edit-btn')) {
        // delete the actual item --  add an ID property for todo with crypto.randomUUID().
            // how to save the id: when the item is rendered, set the ID of the edit button to edit-btn-ID
            // then, stringplice the last 36 characters to get the ID again
        // edit from dom - 1. 
    }
})


//testing area 
const testBtn = document.getElementById('test-btn');

testBtn.addEventListener('click', () => { 
    console.log(allTD.map(todo => (todo.title))); //before sorting and filter

    const sorted = sortByDue(allTD);
    console.log(sorted.map(todo => (todo.title))); //after sorting

    const filterWeek = filterWithin(allTD, 7);
    console.log(filterWeek.map(todo => (todo.title))); //after filter
})

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
