# Project-Geosoft-I
Datenbank "Main DB"
    C Collection User
    C Collection all_stops_and_departures
    C Collection departures (wieder verworfen, gelöscht)
    C Collection Logged_User
    Collection selected_Departures



TODOS
    -Überarbeiten (Zeit muss vernünftig angezeigt werden (2 Stunden dazuaddiert))! function convert_time(time) ES MUSS EINFACH GELÖSCHT WERDEN (ERLEDIGT)
  
    -Logout Schaltfläche scheint als Textfeld gelesen zu werden (Mauszeiger angucken!)
    -automatischer Logout wenn Browser schließt? Wenn man den schließt und noch eingeloggt ist, und dann nochmal versucht sich einzuloggen passiert nichts 
    -Code Friedhof umgraben (d. h. löschen!)
    -Dafür sorgen dass Collection all_stops_and_departures nur einmal befüllt wird (Main Methode schreiben? If Abfrage in Aufruf integrieren?) (ERLEDIGT)
    -gitIgnore Updaten (PNGs rausnehmen)
    
# Readme notes during the discussion and documentation of the code
Used API: Here API

Steps: 0: Install all dependencies with package.json
1.	start server with node.js
2.	npm start
3.	go on http://localhost:3000/
(...)

-	Was ist wenn 2 User sich gleichzeitig einloggen wollen, entsteht ein Konflikt…?
-	Anschauen was ist mit der /getUser Function (index.js)
-	App.get sollte eigentlich gelöscht werden (index.js)
-	Auf „besonderes Feature“ hinweisen: grün/rot Anzeige (index_B.html)
-	Checkbox anpassen – Hinweistext zur Funktionalität? (index_Doc.html)
-	Auf nur noch eine Spalte anpassen, row =1 (index_Login)
