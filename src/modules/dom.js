import {allTD, filterWithin, sortByDue} from './lists.js';

/* remember to separate the function calls with controls.js to avoid clutter later. this should only 
be dom manipulation things only */

/*
function renderTDArr(parentList, tdArr) {
    tdArr.forEach((td) => {
        const tdItem = document.createElement('li');
        tdItem.textContent = td.title;
        parentList.appendChild(tdItem);
    })
}*/


function renderTDArr(parent, tdArr) {
    const tDTemplate = document.getElementById('todo-template');
    tdArr.forEach((td) => {
        const tDItem = tDTemplate.content.cloneNode(true);
        const tDTitle = tDItem.querySelector('span');
        tDTitle.textContent = td.title;
        parent.appendChild(tDItem);
    })
}

//testing area 
const testBtn = document.getElementById('test-btn');

testBtn.addEventListener('click', () => { 
    console.log(allTD.map(todo => (todo.title))); //before sorting and filter

    const sorted = sortByDue(allTD);
    console.log(sorted.map(todo => (todo.title))); //after sorting

    const filterWeek = filterWithin(allTD, 7);
    console.log(filterWeek.map(todo => (todo.title))); //after filter
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
// to do list items should probably actually not be li elements, rather divs with buttons in them 