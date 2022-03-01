// Line below stores the button DOM object to a variable
var buttonEl = document.querySelector("#save-task");
// Line below stores the ul DOM object to a variable
var tasksToDoEl = document.querySelector("#tasks-to-do");

// // Line below created event listen click to the run a function
// buttonEl.addEventListener("click", function() {
// // Line below creates a new list item    
//   var listItemEl = document.createElement("li");
// // Line below adds a class to the new list item
//   listItemEl.className = "task-item";
// // Line below adds text content to the new list item
//   listItemEl.textContent = "This is a new task.";
// // Line below adds the new list item to the unordered list object
//   tasksToDoEl.appendChild(listItemEl);
// });

// Creates a named function for creating a new task
var createTaskHandler = function() {
// // Line below creates a new list item  
    var listItemEl = document.createElement("li");
// // Line below adds a class to the new list item
    listItemEl.className = "task-item";
// // Line below adds text content to the new list item
    listItemEl.textContent = "This is a new task.";
// // Line below adds the new list item to the unordered list object
    tasksToDoEl.appendChild(listItemEl);
  }

// Line below selects the button DOM object variable uses the addEventListener method and the passes the argument click then runs the createTaskHandler function
buttonEl.addEventListener("click", createTaskHandler);