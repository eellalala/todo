import { allTD, allProjects, findProjByTitle } from './lists.js';
import { addTDProj, removeTDProj } from './project.js';
import { getLocalTDs, setLocalTDs } from './storage.js';
export { addTodo, ToDoItem };

class ToDoItem {
    constructor(todo) {
        this.isDone = false;
        this.title = todo.title;
        this.dueDate = todo.dueDate;
        this.isDone = todo.isDone ?? false;
        this.priority = todo.priority;
        this.projectTitle = todo.projectTitle;
        this.note = todo.note;
        this.id = todo.id ?? crypto.randomUUID();

        addTDProj(findProjByTitle(todo.projectTitle, allProjects), this);
    }

    toggleDone(){
        this.isDone = !this.isDone;
        
        setLocalTDs(allTD);
    }
    
    editTD(title, dueDate, priority, projectTitle, note) {
        const oldProjectArr = findProjByTitle(this.projectTitle, allProjects);
        const newProjectArr = findProjByTitle(projectTitle, allProjects);;
        removeTDProj(oldProjectArr, this); 

        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projectTitle = projectTitle;
        this.note = note;

        addTDProj(newProjectArr, this);

        setLocalTDs(allTD);
    }
}

function addTodo({title, dueDate, isDone, priority, projectTitle, note, id}) {
    const newTodo = new ToDoItem ({title, dueDate, isDone, priority, projectTitle, note, id});
    allTD.unshift(newTodo);
    
    setLocalTDs(allTD);

    return newTodo;
}