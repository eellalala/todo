import { isWithinInterval, startOfDay, addDays, isBefore } from 'date-fns';

export {allTD, filterWithin, sortByDue};

const allTD = [];

function filterPast(tdArr) {
    //!!!
}

function filterFuture(TDArtdArrr) {
    //!!!
}

function filterWithin(tdArr, days) {
    const filteredTDs = [];
    const today = startOfDay(new Date());
    const daysFromNow = addDays(today, days);

    tdArr.forEach(todo => {
        const dueDay = todo.dueDate;
        if (isWithinInterval(dueDay, {
            start: today,
            end: daysFromNow
        }))
        filteredTDs.push(todo);
    })
    return filteredTDs;
}

function sortByDue(tdArr) {
    if (tdArr.length <= 1) return tdArr;
    const p = tdArr.pop();
    const leftArr = [];
    const rightArr = [];
    for (const tD of tdArr) {
        if (isBefore(tD.dueDay, p.dueDay)) {
            leftArr.push(tD);
        } else {
            rightArr.push(tD);
        }
    }
    tdArr.push(p);
    return [...sortByDue(leftArr), p, ...sortByDue(rightArr)];
}

/* nice to have feature: call sortByPrio if byDue they're the same
function sortByPrio(tdArr) {

}
*/