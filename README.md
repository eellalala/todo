# ☑️ To-Do List
To-do list web app 

## ⭐️ Features
- Home page shows all tasks, sorted into **overdue** and **upcoming**
- Click todos to view extended information, edit or delete
- Todos sorted by due date
- Project view to categorize your todos
- Add your own todos and projects, all saved in local storage

## 💻 Technologies
- `HTML`
- `CSS`
- `JavaScript`

## 💫 Process
I started by separating functionality into modules, and ideating features and functions. Then, I would tackle one feature at a time (sorting lists, rendering, deleting todos, editing todos, adding projects, etc.). Styling was progressive through the development process, to help me visualize how it was coming along.

## 📲 Preview
<img width="1177" height="783" alt="Image" src="https://github.com/user-attachments/assets/c7602f9a-7f93-485b-bca0-2109c6e09560" />
<img width="1258" height="866" alt="Image" src="https://github.com/user-attachments/assets/6f874307-db72-4a43-b01c-5dc5a99f2d2e" />

## 🐈 Learning Outcomes
This project really emphasized the importance of having clean, well-named, separate functions. There were times where I thought including other things would save time, but only created more bugs in the future because I lost track of what functions really did. While I tried my best to organize data and modules cleanly, in hindsight there were things I could have done better that would have made code more maintainable. In the future, I will try to have a single source of truth as much as possible. Getting the array of all todos and the todos under each project to sync at the end was a huge headache.

## 💭 Future Improvements 
- Todos are already sorted by due date, implement sort by priority within due date
- On editing screen, pre-fill values with previous values, validate title and due date inputs (for convenience and preventing unexpected behaviour)
- Use ids for identification across entire app, project relies on title for some functions (posing problems if two projects have same title)
- Media queries for mobile compability
- Detect color inputs and adjust styling, as project text in sidebar is white, which may be problematic if user chooses a light color
