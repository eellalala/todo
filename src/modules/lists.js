import { isWithinInterval, startOfDay, addDays, isBefore } from 'date-fns';

export { allTD, filterWithin, sortByDue, deleteTd };

const allTD = [];

function filterPast(tDArr) {
    //!!!
}

function filterFuture(tDArr) {
    //!!!
}

function filterWithin(tDArr, days) {
    const filteredTDs = [];
    const today = startOfDay(new Date());
    const daysFromNow = addDays(today, days);

    tDArr.forEach(todo => {
        const dueDay = todo.dueDate;
        if (isWithinInterval(dueDay, {
            start: today,
            end: daysFromNow
        }))
        filteredTDs.push(todo);
    })
    return filteredTDs;
}

function sortByDue(tDArr) {
    if (tDArr.length <= 1) return tDArr;
    const p = tDArr.pop();
    const leftArr = [];
    const rightArr = [];
    for (const tD of tDArr) {
        if (isBefore(tD.dueDay, p.dueDay)) {
            leftArr.push(tD);
        } else {
            rightArr.push(tD);
        }
    }
    tDArr.push(p);
    return [...sortByDue(leftArr), p, ...sortByDue(rightArr)];
}

function findIndexById(id, tDArr) {
    tDArr.findIndex((td) => td.id === id);
}

function deleteTd(id, tDArr) {
    const index = findIndexById(id, tDArr);
    tDArr.splice(index, 1);
}

function updateAllLists(allTD) {
    // maybe needed? updates all lists at once when allTD changes
}

/* nice to have feature: call sortByPrio if byDue they're the same
function sortByPrio(tDArr) {

}
*/