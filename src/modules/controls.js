import { filterPast, filterFuture, filterWithin, sortByDue, findById, deleteItem, findProjByTitle } from './lists.js';
import { allProjects, Project, addProject } from './project.js';
import { renderTDArr, checkTD, uncheckTD, expandTD, collapseTD, removeTD, editTD, finishEditTD, renderProjectsSide, projectOptions, renderHome, renderProjectView, unRenderProjectView, deleteProjMsg } from './dom.js';
import { addTodo } from './todo.js';
import { setTDs, getTDs, getProjects, setProjects } from './storage.js';

const sidebar = document.getElementById('sidebar');
const main = document.getElementById('main');

const title = document.getElementById('title');
title.addEventListener('click', () => {
    unRenderProjectView();
    renderHome();
})

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

        addProject(titleInput.value, colorInput.value);
        addProjectView.classList.add('hidden');

        titleInput.value = '';
        colorInput.value = '#000000';

        renderProjectsSide(allProjects);
        projectOptions(document.getElementById('todo-project-input'), allProjects);
    }
})

main.addEventListener('click', (event) => {
    const target = event.target;
    const id = target.id.slice(-36);
    if (target.classList.contains('delete-btn')) {
        deleteItem(id, getTDs());    
        removeTD(id);
    }
    if (target.classList.contains('check-btn')) {
        const td = findById(id, getTDs());
        td.isDone ? uncheckTD(id) : checkTD(id);
        td.toggleDone();
    }
    if (target.classList.contains('edit-btn')) {
        const editTDView = document.getElementById(`edit-todo-view-${id}`);
        projectOptions(document.getElementById(`todo-project-edit-${id}`), allProjects);
        editTDView.classList.remove('hidden');
    }
})

// edit todo functionality 
main.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('edit-todo-back') || target.classList.contains('edit-todo-submit')) {
        const id = target.id.slice(-36);
        const td = findById(id, getTDs());
    
        const editTDView = document.getElementById(`edit-todo-view-${id}`);

        const newTitle = editTDView.querySelector('.todo-title-edit');
        const newDueDate = editTDView.querySelector('.todo-duedate-edit');
        const newPrio = editTDView.querySelector('.todo-prio-edit');
        const newProject = editTDView.querySelector('.todo-project-edit');
        const newNote = editTDView.querySelector('.todo-note-edit');
        
        function clearEditView() {
            newTitle.value = '';
            newNote.value = '';
            editTDView.classList.add('hidden');
        }

        if (target.classList.contains('edit-todo-back')) {
            clearEditView();
        }
        if (target.classList.contains('edit-todo-submit')) {
            td.editTD(newTitle.value, newDueDate.value, newPrio.value, newProject.value, newNote.value);
            if (document.getElementById('lists-container')) {
                renderHome();
            } else {
                unRenderProjectView();
                renderProjectView(findProjByTitle(newProject.value, allProjects));
            }
            clearEditView();
        }
    }
})

main.addEventListener('click', (event) => {
    if (event.target.classList.contains('todo-title')) {
        const id = event.target.id.slice(-36);
        const container = document.getElementById(`todo-container-${id}`);
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

    if (event.target.id == 'add-todo-back') {
        addTDView.classList.add('hidden');

        titleInput.value = '';
        noteInput.value = '';
    }
    if (event.target.id == 'add-todo-submit') {
        addTodo({title: titleInput.value, dueDate: duedateInput.value, priority: priorityInput.value, project: projectInput.value, note: noteInput.value});
        addTDView.classList.add('hidden');

        titleInput.value = '';
        noteInput.value = '';

        if (document.getElementById('lists-container')) {
            renderHome();
        } else {
            unRenderProjectView();
            renderProjectView(findProjByTitle(projectInput.value, allProjects));
        }
    }
})

sidebar.addEventListener('click', (event) => {
    if (event.target.matches('.side-project-container span')) {
        const projectTitle = event.target.textContent;
        const project = findProjByTitle(projectTitle, allProjects);
        unRenderProjectView();
        renderProjectView(project); 
    }
})

//project edit and delete
main.addEventListener('click', (event) => {
    const target = event.target;
    const id = target.id.slice(-36);
    if (target.classList.contains('delete-project-btn')) {
        deleteProjMsg(id, allProjects);
        deleteItem(id, allProjects);
        renderProjectsSide(allProjects);
    }
    if (target.classList.contains('edit-project-btn')) {
        const editProjView = document.getElementById(`edit-project-view-${id}`); // implement render project edit view when rendering project
        editProjView.classList.remove('hidden');
    }
})

// edit project functionality 
main.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('edit-project-back') || target.classList.contains('edit-project-submit')) {
        const id = target.id.slice(-36);
        const project = findById(id, allProjects);

        const editProjView = document.getElementById(`edit-project-view-${id}`);

        const newTitle = editProjView.querySelector('.project-title-edit');
        const newColor = editProjView.querySelector('.project-color-edit');
        
        function clearEditView() {
            newTitle.value = '';
            newColor.value = '';
            editProjView.classList.add('hidden');
        }

        if (target.classList.contains('edit-project-back')) {
            clearEditView();
        }
        if (target.classList.contains('edit-project-submit')) {
            project.editProj(newTitle.value, newColor.value);
            renderProjectsSide(allProjects);
            unRenderProjectView();
            renderProjectView(project);
            clearEditView();
        }
    }
})