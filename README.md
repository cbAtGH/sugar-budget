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

Unofficial API documentation and sample requests/responses viewable at https://app.swaggerhub.com/apis-docs/hawkess/mealviewer/1.0.0.

To set up the server and client environment, install the latest version of NodeJS (16.16.0 LTS currently). Run `npm install ---global yarn`.
Optionally verify Yarn is installed with `yarn --version` or navigate to the /server directory and run `yarn install && cd client/ && yarn install`.

### Running the server

From the /server directory, run `NODE_ENV=dev node index.js` to start the server with development flags.

### Running the client

From the /server/client directory, run `vite` and a browser window should automatically open at localhost:3000. If not, you can manually do so.
