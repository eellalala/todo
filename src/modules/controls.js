import { allTD, filterWithin, sortByDue, deleteTd } from './lists.js';
import { allProjects } from './project.js'
import { renderTDArr, removeTD, editTD, finishEditTD, renderProjectsSide } from './dom.js';

const main = document.getElementById('main');

// FOR DELTE FUNCTION -- DO first. then implement edit
main.addEventListener('click', (event) => {
    const target = event.target;
    const id = target.id.slice(-36);
    if (target.classList.contains('delete-btn') || target.classList.contains('check-btn')) {
        deleteTd(id, allTD);      
        removeTD(id);
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
    renderTDArr(upcomingTasks, allTD);
})

const overdueTestBtn = document.getElementById('overdue-test-btn');
overdueTestBtn.addEventListener('click', () => {
    const overdueTasks = document.getElementById('overdue-tasks');
    renderTDArr(overdueTasks, allTD);
})
