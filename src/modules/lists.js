import { isWithinInterval, startOfDay, addDays, isBefore, isSameDay } from 'date-fns';

export { allTD, filterPast, filterFuture, filterWithin, sortByDue, findById, findIndexById, deleteItem, findProjByTitle};

const allTD = [];

function filterPast(tDArr) {
    const filteredTDs = [];
    const today = startOfDay(new Date());

    tDArr.forEach(td => {
        if (isBefore(td.dueDate, today)) filteredTDs.push(td);
    })
    return filteredTDs;
}

function filterFuture(tDArr) {
    const filteredTDs = [];
    const today = startOfDay(new Date());

    tDArr.forEach(td => {
        if (isBefore(today, td.dueDate) || isSameDay(today, td.dueDate)) filteredTDs.push(td);
    })
    return filteredTDs;
}

function filterWithin(tDArr, days) {
    const filteredTDs = [];
    const today = startOfDay(new Date());
    const daysFromNow = addDays(today, days);

    tDArr.forEach(td => {
        if (isWithinInterval(td.dueDate, {
            start: today,
            end: daysFromNow
        }))
        filteredTDs.push(td);
    })
    return filteredTDs;
}

function sortByDue(tDArr) {
    if (tDArr.length <= 1) return tDArr;
    const p = tDArr.pop();
    const leftArr = [];
    const rightArr = [];
    for (const tD of tDArr) {
        if (isBefore(tD.dueDate, p.dueDate)) {
            leftArr.push(tD);
        } else {
            rightArr.push(tD);
        }
    }
    tDArr.push(p);
    return [...sortByDue(leftArr), p, ...sortByDue(rightArr)];
}

function findIndexById(id, arr) {
    return arr.findIndex((item) => item.id === id);
}

function findById(id, arr) {
    return arr.find((item) => item.id === id);
}

function deleteItem(id, arr) {
    const index = findIndexById(id, arr);
    arr.splice(index, 1);
}

function updateAllLists(allTD) {
    // maybe needed? updates all lists at once when allTD changes
}

function findProjByTitle(title, projArr) {
    return projArr.find((proj) => proj.title === title)
}


/* nice to have feature: call sortByPrio if byDue they're the same
function sortByPrio(tDArr) {

}
*/