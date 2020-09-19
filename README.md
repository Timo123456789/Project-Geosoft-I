# Information about the procurement and integration of keys
We use the HERE API. To use our app, please register on the following page: https://www.here.com/ 
Create a token and add this API KEY to the tokenfile.

# Starting the App
- The webapp starts with `$ docker-compose up`
- Without docker the web-app starts via `$ npm install && npm start`. This includes the installation of all dependencies with package.json.
- The tests start with `$ npm test`, or are accessible via the path `/test` in the browser.

# Author names: 
Timo Lietmeyer & Judith Bresser

# Github-link: 
https://github.com/Timo123456789/Project-Geosoft-I

# User Instructions
- To continue using our app go on http://localhost:3000/
- A user can log in with a username and password at the initial page view.
- With the logout function the user can log out properly.

## Traveller
- A traveller can select a taken trip on the editor page. This trip will be marked in the server as taken by the user.
- If at least one of the past trips of a user is marked as a risk trip, the user will be notified on the start page the next time the page is called up.
- The user can select his trips and view the risk for his saved trips.

## Doctor
- In case of a positive diagnosis, a doctor can mark a user's trips on the Doctors Page.

# Used libraries / frameworks: 
No other libraries and frameworks were used.

# Description of built-in additional features or special features you want to draw attention to
- The user profiles are password protected
- At the end of the footer, the user has the possibility to use the offered print function on every HTML page without much effort.

# Readme notes during the discussion and documentation of the code
-	Anschauen was ist mit der /getUser Function (index.js)
-	App.get sollte eigentlich gelöscht werden (index.js)

Noch einzufügen in die JavaScript Dateien!
/
* Musterlösung zu Aufgabe 4, Geosoft 1, SoSe 2020
* @author {Name der studierenden Person}   matr.Nr.: {Matrikelnummer}
*/

//**various jshint configs**
// jshint esversion: 8
// jshint browser: true
// jshint node: true
// jshint -W117
// jshint -W083
"use strict";
