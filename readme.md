# JavaScript Calculator
## FAC Course Prerequisite Project

##### Features to add:  
* Set display length character limit for displayCurrent
* DisplayHistory should show latest history when overflow

##### All working, but code is complicated/hard to read. For refactor:  
* Should not use eval(), replace with if/switch statement that points to different functions for each operator (or dispatch table - a data structure that holds functions)
* Start by writing the calculation functions
* Rewrite numberClicked function (maybe with switch statement and regex?)
* Use "let lastButtonClicked" (e.g. can check if user clicks another operator and will replace selectedOperator, and no need to check for "=" in displayHistory.innerHTML)