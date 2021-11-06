import '../scss/main.scss';

const URI = 'task.json';
const taskXHR = new XMLHttpRequest();
let tasks;
let tasksJSONString;
let jsonObj = {
    "Title": "",
    "Desctiption": "",
    "DueDate": "",
    "DueTime": "",
    "IsComplete": false
};

// Make an XHR call to get the object from .json file
callXHR();

/**
 * 
 * XMLHTTPRequest call
 * 
 */
function callXHR() {
    taskXHR.open('GET', URI);
    taskXHR.onload = function () {
        if (this.status === 200) {
            tasksJSONString = this.responseText;
            tasks = JSON.parse(tasksJSONString);
            load(tasks);
        }
    };
    taskXHR.send();
}

/**
 * When a new task is added, this method, appends the newly added child to the parent element
 * 
 * @param {Task} task 
 * @param {Parent} parent 
 * @param {Iteration} iteration 
 */
const createTask = (task, parent, iteration) => {
    const li = document.createElement('li'); // create a li element
    const div = document.createElement('div'); // create a div element
    const p = document.createElement('p'); // create a p element to display the task name
    const completeButton = document.createElement('button'); // create a completeTask button element
    div.className = `li-div-${iteration}`; // assign a class to the div
    completeButton.className = `complete-button-${iteration}`; //assign a class to the button
    completeButton.setAttribute("name", `complete-button-${iteration}`); // assigna an attribute to the button
    completeButton.innerHTML = "COMPLETE?"; // add a text to the completeTask button

    const detailButton = document.createElement('button'); // create a viewDetails button
    detailButton.className = `detail-button-${iteration}`; // assign a class name to the button
    detailButton.setAttribute("name", `detail-button-${iteration}`); // assign an attribute to the button
    detailButton.innerHTML = "VIEW DETAILS"; // add a text to the viewDetail button

    const deleteButton = document.createElement('button');
    deleteButton.className = `delete-button-${iteration}`;
    deleteButton.setAttribute("name", `delete-button-${iteration}`);
    deleteButton.innerHTML = "X";

    p.textContent = `${task.Title}`; // set text to the p element so that the task name is displayed

    // make the hierarchy tree of the newly created elements
    div.appendChild(p);
    div.appendChild(completeButton);
    div.appendChild(detailButton);
    div.appendChild(deleteButton);
    li.appendChild(div);
    parent.appendChild(li);
};

/**
 * Iterate over all the tasks in the object and call the createTask method 
 * to construct the DOM tree
 * 
 * @param {TaskList} tasks 
 */
const load = (tasks) => {
    const ul = document.getElementById('list');
    ul.innerHTML = '';
    tasks.forEach((element, index) => {
        createTask(element, ul, index);
    });
    noTasks(tasks);
}

// Event listener to show a popup when the add button is clicked
document.getElementById('submit').addEventListener('click', () => {
    document.querySelector('.popup').style.display = 'flex';
});

// Event listener to dismiss the popup when the close button is clicked
document.getElementById('close-button').addEventListener('click', () => {
    document.querySelector('.popup').style.display = 'none';
    noTasks(tasks);

    // Refresh the custom styles if any from the previous session
    validationStyle(document.getElementById('title').value, document.getElementById('description').value, document.getElementById('due-date').value, document.getElementById('due-time').value, '1px', 'grey');
});

// Event listener on the main li element to listen to the capture events on the Complete button and View Details button
document.getElementById('list').addEventListener('click', (e) => {
    let buttonClass = e.target.className;
    let iteratingValue = buttonClass.substring(buttonClass.length - 1, buttonClass.length);

    // set the values to the view details p element based on the index where the event was triggered
    if (buttonClass.substring(0, 13) === 'detail-button') {

        // Add a span element to the p element so that the actual value of the task model can be styled differently
        document.getElementById('title-detail').innerHTML = `${document.getElementById('title-detail').innerHTML} <span id="span1"> ${tasks[iteratingValue].Title} </span>`;
        document.getElementById('span1').style.fontWeight = 'bold';
        document.getElementById('span1').style.fontFamily = 'sans-serif';

        // Add a span element to the p element so that the actual value of the task model can be styled differently
        document.getElementById('description-detail').innerHTML = `${document.getElementById('description-detail').innerHTML} <span id="span2"> ${tasks[iteratingValue].Desctiption} </span>`;
        document.getElementById('span2').style.fontWeight = 'bold';
        document.getElementById('span2').style.fontSize = '13px';
        document.getElementById('span1').style.fontFamily = 'sans-serif';

        // Add a span element to the p element so that the actual value of the task model can be styled differently
        document.getElementById('due-date-detail').innerHTML = `${document.getElementById('due-date-detail').innerHTML} <span id="span3"> ${tasks[iteratingValue].DueDate} </span>`;
        document.getElementById('span3').style.fontWeight = 'bold';
        document.getElementById('span1').style.fontFamily = 'sans-serif';

        // Add a span element to the p element so that the actual value of the task model can be styled differently
        document.getElementById('due-time-detail').innerHTML = `${document.getElementById('due-time-detail').innerHTML} <span id="span4"> ${tasks[iteratingValue].DueTime} </span>`;
        document.getElementById('span4').style.fontWeight = 'bold';
        document.getElementById('span1').style.fontFamily = 'sans-serif';


        // If the task is marked as complete or otherwise, the 'Completed' field is styled accordingly
        if (tasks[iteratingValue].IsComplete) {
            document.getElementById('completed-detail').innerHTML = `${document.getElementById('completed-detail').innerHTML} <span id="span5"> Completed! </span>`;
            document.getElementById('span5').style.fontWeight = 'bold';
            document.getElementById('span5').style.color = "#2eb82e";
        } else {
            document.getElementById('completed-detail').innerHTML = `${document.getElementById('completed-detail').innerHTML} <span id="span5"> Not Yet! </span>`;
            document.getElementById('span5').style.fontWeight = 'bold';
            document.getElementById('span5').style.color = "#e63900";
        }
        document.querySelector('.popup-detail-view').style.display = 'flex';
    }

    // set "isCompleted" to true based on the div on which the COMPLETE button was clicked
    if (buttonClass.substring(0, 15) === 'complete-button') {
        tasks[iteratingValue].IsComplete = true;
        document.querySelector(`.${buttonClass}`).innerHTML = 'COMPLETED!';
        document.querySelector(`.li-div-${iteratingValue}`).style.backgroundColor = '#d6f5d6';
        document.querySelector(`.li-div-${iteratingValue}`).style.transition = '0.4s';
        document.querySelector(`.li-div-${iteratingValue}`).style.borderRadius = '5px';

        document.querySelector(`.li-div-${iteratingValue}`).addEventListener('mouseenter', (e) => {
            document.querySelector(`.li-div-${iteratingValue}`).style.backgroundColor = '#99e699';
        });

        document.querySelector(`.li-div-${iteratingValue}`).addEventListener('mouseleave', (e) => {
            document.querySelector(`.li-div-${iteratingValue}`).style.backgroundColor = '#d6f5d6';
        });
    }

    // Implementation in case the delete button was clicked
    if (buttonClass.substring(0, 13) === 'delete-button') {

        // add a confirmation dialogue before deleting the task
        if (confirm(`Are you sure you want to delete the task "${tasks[iteratingValue].Title}"?`)) {
            tasks.splice(iteratingValue, 1);
            load(tasks);

            // style the completed tasks
            styleElements(tasks);
        } else {
            load(tasks);
            // style the completed tasks
            styleElements(tasks);
        }

    }
});

// Event listener to dismiss the View Details popup
document.getElementById('close-button-detail-view').addEventListener('click', () => {
    document.querySelector('.popup-detail-view').style.display = 'none';
    document.getElementById('title-detail').textContent = "Title: ";
    document.getElementById('description-detail').textContent = "Description: ";
    document.getElementById('due-date-detail').textContent = "Due Date: ";
    document.getElementById('due-time-detail').textContent = "Due Time: ";
    document.getElementById('completed-detail').textContent = "Completed: ";
})

// Push the new task element to the existing JSON object when the SAVE button on the Add task popup is clicked
document.getElementById('save-button').addEventListener('click', (e) => {
    jsonObj = {
        "Title": "",
        "Desctiption": "",
        "DueDate": "",
        "DueTime": "",
        "IsComplete": false
    };

    // Check if the input data in valid
    if (validateInput()) {
        jsonObj.Title = `${document.getElementById('title').value}`;
        jsonObj.Desctiption = `${document.getElementById('description').value}`;
        jsonObj.DueDate = `${document.getElementById('due-date').value}`;
        jsonObj.DueTime = `${document.getElementById('due-time').value}`;
        tasks.push(jsonObj);
        // e.preventDefault();
        load(tasks);
        styleElements(tasks);
        document.querySelector('.popup').style.display = 'none';
        document.getElementById('title').value = "";
        document.getElementById('description').value = "";
        document.getElementById('due-date').value = "";
        document.getElementById('due-time').value = "";

        // Refresh any custom styles on the input box if any from the previous sessions
        validationStyle(document.getElementById('title').value, document.getElementById('description').value, document.getElementById('due-date').value, document.getElementById('due-time').value, '1px', 'grey');
    } else {
        // If the data is invalid, add custom styles to the input boxes with invalid data
        validationStyle(document.getElementById('title').value, document.getElementById('description').value, document.getElementById('due-date').value, document.getElementById('due-time').value, '2px', 'red');
    }
});

/**
 * If the task is completed, change the style of that div element
 * 
 * @param {TaskList} tasks 
 */
function styleElements(tasks) {
    tasks.forEach((element, index) => {
        if (element.IsComplete) {
            document.querySelector(`.complete-button-${index}`).innerHTML = 'COMPLETED!';
            console.log(document.querySelector(`.complete-button-${index}`).backgroundColor);
            document.querySelector(`.li-div-${index}`).style.backgroundColor = '#d6f5d6';
            document.querySelector(`.li-div-${index}`).style.transition = '0.4s';
            document.querySelector(`.li-div-${index}`).style.borderRadius = '5px';

            document.querySelector(`.li-div-${index}`).addEventListener('mouseenter', (e) => {
                document.querySelector(`.li-div-${index}`).style.backgroundColor = '#99e699';
            });

            document.querySelector(`.li-div-${index}`).addEventListener('mouseleave', (e) => {
                document.querySelector(`.li-div-${index}`).style.backgroundColor = '#d6f5d6';
            });
        }
    });
}

/**
 * Validate if the input fields are populated
 * 
 * @returns boolean 
 * 
 */
function validateInput() {
    if (document.getElementById('title').value === "" || document.getElementById('description').value === "" || document.getElementById('due-date').value === "" || document.getElementById('due-time').value === "") {
        return false;
    } else {
        return true;
    }
}

/**
 * Add custom styles to the input fields that are not valid
 * 
 * @param {Title} title 
 * @param {Description} description 
 * @param {DueDate} dueDate 
 * @param {DueTime} dueTime 
 * @param {BorderThickness} borderThickness thickness of the border of the input box
 * @param {BorderColor} color color of the border of the input box
 */
function validationStyle(title, description, dueDate, dueTime, borderThickness, color) {
    title === "" ? document.getElementById('title').style.border = `${borderThickness} solid ${color}` : document.getElementById('title').style.border = '1px solid grey';
    description === "" ? document.getElementById('description').style.border = `${borderThickness} solid ${color}` : document.getElementById('description').style.border = '1px solid grey';
    dueDate === "" ? document.getElementById('due-date').style.border = `${borderThickness} solid ${color}` : document.getElementById('due-date').style.border = '1px solid grey';
    dueTime === "" ? document.getElementById('due-time').style.border = `${borderThickness} solid ${color}` : document.getElementById('due-time').style.border = '1px solid grey';
}

/**
 * In case there are no tasks, show the add task pop up
 * so that the user can add a new task
 * 
 * @param {Task} tasks 
 */
function noTasks(tasks) {
    if (tasks.length === 0) {
        document.querySelector('.popup').style.display = 'flex';
    }
}