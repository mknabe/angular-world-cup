angular-world-cup
=================

Dashboard that displays all World Cup matches and scores using AngularJS and [Soccer for Good API](https://github.com/estiens/world_cup_json)

View live demo on [Heroku](http://angular-world-cup.herokuapp.com/)

# Running the app

1. Clone repo
2. `npm install`
3. Install MongoDB and have it running
4. `npm start`
5. Go to [http://localhost:8080](http://localhost:3000)

# TODO
- [ ] Responsive design, also design that responds to how many groups there are without hardcoding
- [ ] Load bracket dynamically
- [ ] Click on a match to see event details
    - [ ] Combine home and away team events and order them by time
    - [ ] Clean up data and add icons for different event types
- [ ] Add country flags
- [ ] Move date format to filter
- [x] Bug with teams that have the same points and goal differential