// Line below stores the button DOM object to a variable
// var buttonEl = document.querySelector("#save-task");
// Line below stores the form DOM object to a variable
var formEl = document.querySelector("#task-form");
// Line below stores the ul tasks-to-do DOM object to a variable
var tasksToDoEl = document.querySelector("#tasks-to-do");
// Line below stores the ul tasks-in-progress DOM object to a variable
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
// Line below stores the ul tasks-completed DOM object to a variable
var tasksCompletedEl = document.querySelector("#tasks-completed");
// Line below create a task counter. this number will be given to each task to uniquely identify them
var taskIdCounter = 0;
// Line below creates a variable the selects the main html tag
var pageContentEl = document.querySelector("#page-content");
// Line below will store all task objects in an array to be saved in localStorage
var tasks = [];


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
// var createTaskHandler = function(event) {
// changed name to separate concerns 
var taskFormHandler = function(event) {
// Without line below every time task is submitted the page will refesh and clear the unordered list.  Event.preventdefault stops this from happening
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

// check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

// clears then form after user has submitted a task to be displayed
    formEl.reset();

// added to see if data in form is an existing task that needs to be edited
    var isEdit = formEl.hasAttribute("data-task-id");

// package up data as an object
    // var taskDataObj = {
    //     name: taskNameInput,
    //     type: taskTypeInput,
    //     status: "to do"
    // };

    // send it as an argument to createTaskEl
    // createTaskEl(taskDataObj);
    // Lines below replace the line above to determine if a task is being created or edited
    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } 
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
        var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
        status: "to do"
        };
    
        createTaskEl(taskDataObj);
    }

// Lines below were moved to var createTaskEl = function(taskDataObj) to separate out concerns
// // Line below creates a new list item  
//     var listItemEl = document.createElement("li");
// // // Line below adds a class to the new list item
//     listItemEl.className = "task-item";

//     // create div to hold task info and add to list item
//     var taskInfoEl = document.createElement("div");
//     // give it a class name
//     taskInfoEl.className = "task-info";
//     // add HTML content to div
//     taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    
// // // Line below adds text content to the new list item
//     // listItemEl.textContent = taskNameInput;
//     // adds the taskInfoEl to the listItemEl as a child
//     listItemEl.appendChild(taskInfoEl);
// // // Line below adds the new list item to the unordered list object
//     tasksToDoEl.appendChild(listItemEl);
//     console.dir(listItemEl);
  }

// Created new name function to separate concerns in each function
var createTaskEl = function(taskDataObj) {
  
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    // taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    // Changed from Input to .name to grab the data from the taskFormHandler function
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    // creates a new property of a task object and gives it a value of the task counter
    taskDataObj.id = taskIdCounter;
    // push method used to take the task object and place it in the task array to be stored in localStorage
    tasks.push(taskDataObj);

    // takes data and objects from createTaskActions function based on the task id number and appends to the task being displayed on the page
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    // increase task counter for next unique id
    taskIdCounter++;
    // runs the save task function to save task to local storage
    saveTasks()
}

// function to create buttons and there actions on the tasks
var createTaskActions = function(taskId) {
    // creates the containing div for the buttons
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    // appends edit button to container element
    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    // appends delete button to container element
    actionContainerEl.appendChild(deleteButtonEl);

    // create the select or drop down menu
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    // creates array for choices in the drop down menu
    var statusChoices = ["To Do", "In Progress", "Completed"];
    // for loop to go through the drop down menu
    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
      
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
      }
    // appends drop down menu to container element
    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
};





// Line below selects the button DOM object variable uses the addEventListener method and the passes the argument click then runs the createTaskHandler function
// buttonEl.addEventListener("click", createTaskHandler);
// Line below selects the form DOM object variable uses the addEventListener method and the passes the argument submit then runs the createTaskHandler function
// formEl.addEventListener("submit", createTaskHandler);
// Refactor the code to setup separation of concerns
formEl.addEventListener("submit", taskFormHandler);

// Function is a click handler it will listen to what is clicked on
var taskButtonHandler = function(event) {


    // get target element from event
    var targetEl = event.target;

    // if (event.target.matches(".delete-btn")) {
    //      var taskId = event.target.getAttribute("data-task-id");
    //      console.log(taskId);
    // // calls the delete task function on the task that was clicked on
    //      deleteTask(taskId);
    //   }

    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
      var taskId = targetEl.getAttribute("data-task-id");
      editTask(taskId);
    } 
    // delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
      var taskId = targetEl.getAttribute("data-task-id");
      deleteTask(taskId);
    }
};

// function takes data from the click handler function and deletes a task
var deleteTask = function(taskId) {
    // selects the list items based upon the data-task-id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // takes the selected list item and runs the remove method. this deletes the list item
    taskSelected.remove();

    // create new array to hold updated list of tasks
    var updatedTaskArr = [];

    // loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
    // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
    if (tasks[i].id !== parseInt(taskId)) {
        updatedTaskArr.push(tasks[i]);
      }
    }

    // reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;

    // runs the save task function to save task to local storage
    saveTasks()
  };

// function takes data from the click handler function and allows user to edit a task
var editTask = function(taskId) {
  /// following lines only grab the info from the task and display to the form lines 197 - 209
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;

    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);
};

// function called if a task needs to be edited
var completeEditTask = function(taskName, taskType, taskId) {
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop through tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
        tasks[i].name = taskName;
        tasks[i].type = taskType;
        }
    };
    alert("Task Updated!");

    // Two lines below resets the form back to normal
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";

    // runs the save task function to save task to local storage
    saveTasks()
};

// function called when task status changes
var taskStatusChangeHandler = function(event) {
    console.log(event.target);
    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // conditional statment used when task status is changed
    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
      } 
      else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
      } 
      else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
      }

      // update task's in tasks array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
        tasks[i].status = statusValue;
        }
    }

    // runs the save task function to save task to local storage
    saveTasks()
};

// function to save tasks to localStorage
var saveTasks = function() {
    // Line below saves tasks to local storage as objects
    // localStorage.setItem("tasks", tasks);
    // Local storage can only hold strings. Line below replaces line above to turn tasks saved in to strings
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Gets task items from localStorage.

// Converts tasks from the string format back into an array of objects.

// Iterates through a tasks array and creates task elements on the page from it.

// function to loads tasks from localStorage
var loadTasks = function() {

    var tasks = (localStorage.getItem("tasks"));
    // console.log(tasks);
    if (tasks === null) {
        tasks = [];
        return false;
    }
    tasks = JSON.parse(tasks);
    // console.log(tasks);
    for (var i = 0; i < tasks.length; i++) {
        // console.log(tasks[i]);
        tasks[i].id = taskIdCounter;
        var listItemEl = document.createElement("li");
        listItemEl.className = "task-item";
        listItemEl.setAttribute("data-task-id", tasks[i].id);
        console.log(listItemEl)

        var taskInfoEl = document.createElement("div");
        taskInfoEl.className = "task-info";
        taskInfoEl.innerHTML = "<h3 class='task-name'>" + tasks[i].name + "</h3><span class='task-type'>" + tasks[i].type + "</span>";
        listItemEl.appendChild(taskInfoEl);
        var taskActionsEl = createTaskActions(tasks[i].id);
        listItemEl.appendChild(taskActionsEl);
        console.log(listItemEl);

        if (tasks[i].status === "to do" ) {
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 0;
            tasksToDoEl.appendChild(listItemEl);
        }
        else if (tasks[i].status === "complete"  ) {
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 2;
            tasksCompletedEl.appendChild(listItemEl);
        }
        taskIdCounter++;
        console.log(listItemEl)
    }

}
console.log(tasks);

loadTasks();
pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);


