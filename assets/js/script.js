// Line below stores the button DOM object to a variable
// var buttonEl = document.querySelector("#save-task");
// Line below stores the form DOM object to a variable
var formEl = document.querySelector("#task-form");
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
// added the event object to the function as an arugment to hold what should happen in place of the refreshing the browser
var createTaskHandler = function(event) {
// Without line below every time task is submitted the page will refesh and clear the unordered list.  Event.preventdefault stops this from happening
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

// // Line below creates a new list item  
    var listItemEl = document.createElement("li");
// // Line below adds a class to the new list item
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.className = "task-info";
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    
// // Line below adds text content to the new list item
    // listItemEl.textContent = taskNameInput;
    // adds the taskInfoEl to the listItemEl as a child
    listItemEl.appendChild(taskInfoEl);
// // Line below adds the new list item to the unordered list object
    tasksToDoEl.appendChild(listItemEl);
    console.dir(listItemEl);
  }

// Line below selects the button DOM object variable uses the addEventListener method and the passes the argument click then runs the createTaskHandler function
// buttonEl.addEventListener("click", createTaskHandler);
// Line below selects the form DOM object variable uses the addEventListener method and the passes the argument submit then runs the createTaskHandler function
formEl.addEventListener("submit", createTaskHandler);
