<h1>ASSIGNMENT 6:</h1>

<h2>Please find below the pointers that I have worked on as part of this assignment;</h2>


1. Learnt about styling elements using **Javascript** to traverse a **HTML DOM tree**.

2. Used **XMLHTTPRequest** to get the data from a `.json` file.

3. After retrieving the JSON object (which has a set of pre-defined tasks), I performed CRUD operations of that object. 

4. The **TO-DO task list Application** works as follows;
	* <b>Create a new task:</b>
	  * <b>User point of view:</b>
		* The User can clicks on the `ADD TASK` button and enter the required details, press the submit button and voila, the task has been created.
		
	  * <b>Developer point of view:</b>
		* When the `ADD TASK` button is clicked, an `EventListners` waits for the `click` event, renders the addTask popup.
		* Added the input field validations.
		* As soon as the user clicks on the `SAVE` button, the data is fetched from the input text fields and added to an `object` which in turn is pushed in the JSON object.

	* <b>View task details:</b>
	  * <b>User point of view:</b>
		* When the User can clicks on the `VIEW DETAILS` button, they can view all the details of the task that they entered.
      
	  * <b>Developer point of view:</b>
		* When the `VIEW DETAILS` button is clicked, an `EventListners` waits for the `click` event, renders the viewDetails popup.
		* Based on which element the event was triggered using `event.target()` method, the data of that perticular list item is mapped to the viewDetails pop up.
		* Since the class name of the div elements are allocated dynamically through the code, I added an `EventListner` to the main `li` element, which listens to any events on the buttons in the same div element in the `capture-phase`.

	* <b>Delete task details:</b>
	  * <b>User point of view:</b>
		* When the User clicks on the small 'X' button at the extreme right of each task, an alter comes up to confirm if they want to delete the task. If 'yes', then the task is deleted and no longer viewed, if 'no', then the User goes back to the task list.
      
	  * <b>Developer point of view:</b>
		* When the `X` button is clicked, an `EventListners` waits for the `click` event.
		* After the event, a `confirm()` method, pops up to take the users confirmation if they actually want to delete the task.
		* Based on which element the event was triggered using `event.target()` method, the data of that perticular list item is `spliced` from the main JSON array.
		* Post this, the entire array is rendered again, and only the un-deleted tasks are displayed.
