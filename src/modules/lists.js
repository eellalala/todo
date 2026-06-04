import { isWithinInterval, startOfDay, addDays, isBefore } from 'date-fns';

export {allTD, filterWithin, sortByDue};

const allTD = [];

function filterWithin(tDs, days) {
    const filteredTDs = [];
    const today = startOfDay(new Date());
    const daysFromNow = addDays(today, days);

    tDs.forEach(todo => {
        const dueDay = todo.dueDate;
        if (isWithinInterval(dueDay, {
            start: today,
            end: daysFromNow
        }))
        filteredTDs.push(todo);
    })
    return filteredTDs;
}

function sortByDue(tDs) {
    if (tDs.length <= 1) return tDs;
    const p = tDs.pop();
    const leftArr = [];
    const rightArr = [];
    for (const tD of tDs) {
        if (isBefore(tD.dueDay, p.dueDay)) {
            leftArr.push(tD);
        } else {
            rightArr.push(tD);
        }
    }
    tDs.push(p);
    return [...sortByDue(leftArr), p, ...sortByDue(rightArr)];
}

/* nice to have feature: call sortByPrio if byDue they're the same
function sortByPrio(tDs) {

}
*/