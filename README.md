# sugar-budget
Tool to analyze added sugar content in Sioux Falls School District school meals.

I captured the reasoning behind why I would like to quanitify the added sugare in SFSD public schools here :

https://youtu.be/TN869ORkAaU

I intend to create some tools that will enable the following 
1. define a sugar budget for a single meal, as a portion of the recommedations of the American Heart Association, American Academy of Pediatrics and World Health Organization standards for added or free sugars. 
2. create a red, yellow, green rating scale for meals given the allocated sugar budget
3. analyze a single meal at a single school and grade it according to the sugar budget and rating
4. create a report for a single school for a period of time to show compliance with the sugar budget

The Sioux Falls School District makes use of the Meal Viewer application.

After examining the web UI and some of the content I discerned there was an API available.

https://api.mealviewer.com/api/v4/school/AllCity-JaneAddamsElementary/08-31-2021/08-31-2021
https://api.mealviewer.com/api/v4/school/LincolnHighSchoolSF/08-31-2021/08-31-2021
