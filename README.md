# IronPadel


<img src="/public/ironpadel_azul claro.png">

## Description

Due to external reasons, IronHack has been forced to restrict entrance to the rooftop area. Because of this,
they have decided to build a paddle court. IronHackers will be able to book games through IronPadel and find
other IronHackers to play with, as well as earn achievements and checkout their statistics and others'.

## User Stories

Sign-up
Log-in
Log-out
Home page (Notifications & My bookings)
Booking
Community
User Profile
CRUD bookings
CRUD profile

## MVP

The MVP will cover the following:
**CRUD**
**Sign-up / Log-in / Log-out**
**Public pages** - Home & Community
**Private pages** - User profile & Booking
**Five connected models** - User, Booking, Date, Notification and Achievement
**Three types of players** - Creator, Participant, Viewer
**Add new players**
**Responsive**

## Backlog

**Private and Public bookings**
**Close a booking**
**Achievements** - Mora badges
**Statistics** - More statistics
**In-game chat**
**Challenge other users**
**mini e-commerce**

## Tech challenge

**MERRRRRRRRN**
**Scheduling a booking**

## Structure

**Frontend structure**
ironpadel_client/

        ├── .gitignore
        ├── .env.developement
        ├── .env.production
        ├── package.json
        ├── app.js
        ├── README.md
        ├── public
        ├── build
        └── src
        ├── App.js
        ├── App.css
        ├── index.js
        ├── pages
        │       ├── auth.css
        │       ├── Home.css
        │       ├── Home.js
        │       ├── Login.js
        │       ├── Private.js
        │       └── Signup.js
        ├── lib
        │   ├── auth-service.js
        │   ├── AuthProvider.js
        │   ├── booking-service.js
        │   ├── community-service.js
        │   ├── home-service.js
        │   └── profile-service.js
        └── components
        ├── booking
        │       ├── Booking.css
        │       ├── Booking.js
        │       └── EditBooking.js
        ├── community
        │       ├── Community.css
        │       └── Community.js
        ├── componentRoutes
        │       ├── AnonRoute.js
        │       └── PrivateRoute.js
        ├── ctaBooking
        │       ├── CTABooking.css
        │       └── CTABooking.js
        ├── CTACommunity
        │       ├── CTACommunity.css
        │       └── CTACommunity.js
        ├── ctaNewUsers
        │       ├── CTANewUsers.css
        │       └── CTANewUsers.js
        ├── fixedComponents
        │       ├── Button.js
        │       ├── Button.css
        │       └── navbar
        │               ├── Navbar.css
        │               └── Navbar.js
        └── profile
        ├── Profile.css
        └── Profile.js

## Links

**GitHub_server** https://github.com/EBM90/ironpadel_server
**GitHub_client** https://github.com/EBM90/ironpadel_client
**Heroku** https://ironpadel.herokuapp.com/
**Trello** https://trello.com/b/ZfofYARC/ironpaddle
**References**
