# IronPadel

![IronPadel]('insert pic here')

<!-- <img src="./wireframes.ironpaddel.png"> -->

## Description

Due to external reasons, IronHack has been forced to restrict entrance to the rooftop area. Because of this,
they have decided to build a paddle court. IronHackers will be able to book games through IronPadel and find
other IronHackers to play with.

<!-- TO DO -->

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
**Four connected models** - User, Item, Collections and Outfit !!!!!!!!
**Three types of players** - Creator, Participant, Viewer
**Add new players** - Users and Non-users(email invitation)
**Responsive**

## Backlog

**Private and Public bookings**
**Close a booking**
**Achievements** - Getting a badge every time the user reaches a milestone
**Statistics** - Showing victories, games played...
**In-game chat**
**Challenge other users**
**mini e-commerce**

## Tech challenge

**MERRRRRRRRN**
**Scheduling a booking**

## Structure

**Backend structure**
ironpadel_server/

        ├── .gitignore
        ├── .env
        ├── package.json
        ├── app.js
        ├── readme.md
        ├── bin
        │   └── www
        ├── config
        │   └── cloudinary.js
        ├── helpers
        │   └── middlewares.js
        ├── models
        │   ├── User.js
        │   ├── Booking.js
        │   ├── Notification.js
        │   └── Achievement.js
        └── routes

            ├── home.js
            ├── auth.js
            ├── community.js
            └── private
                ├── user.js
                └── court.js

**Frontend structure**
ironpadel_client/

        ├── .gitignore
        ├── .env
        ├── package.json
        ├── README.md
        ├── public
        │   └── index.html
        ├── src
            │── App.js
            │── App.css
            │── index.js
            │── components
            │       │── AnonRoute.js
            │       │── Navbar.js
            │       │── PrivateRoute.js
            │       └──
            │── lib
            │    │── auth-service.js
            │    │── AuthProvider.js
            │    │── court-service.js
            │    │── home-service.js
            │    │── user-service.js
            │    └── community-service.js
            │    └──
            └──pages
                │── Home.js
                │── Login.js
                │── Signup.js
                │── Bookings.js
                └── Community.js

## Routes

**public**

POST/login Sends Login form data to the server.{ email, password }
POST/signup Sends SignUp info to the server and creates user in the DB.{ username, email, password }
POST/logout Destroys user's session

**private**
_user_
GET/user Gets information of the current user. {username, email, description, image, bookings, wins, notifications, achievements}
POST/profile/:id Sends updated information of the user. {username, email, description, image}
POST/delete-notification/:id Deletes the notification.

_booking_
POST/booking Creates a new booking with the details of said booking. {name, time, creator, players, winners, losers}
GET/booking/:id Gets information about this booking. {name, time, creator, players, winners, losers}
POST/booking/:id Sends updated information of the booking. {name, time, creator, players, winners, losers}
POST/booking/:id/delete-booking Deletes the whole booking.

## Models

**User Model**
{
username: {type: String, required: true},
email: {type: String, required: true},
password: {type: String, required: true},
description: String,

<!-- level: Number, -->

image: { type: String, default: './images/profile-default.png' },
bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
wins: Number,

<!-- items: [{ type: Schema.Types.ObjectId, ref: 'Item' }], -->

notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
achievements: [{ type: Schema.Types.ObjectId, ref: 'Achievement' }]
}

<!-- Admin Model -->

<!-- **Item Model**
{
    name: String,
    description: String,
    image: String,
    brand: String,
    price: Number
} -->

**Booking Model**
{  
 creator: { type: Schema.Types.ObjectId, ref: 'User' },
name: String,
time: ???,

<!-- date: Date,
    finish: Date,
    duration: String, -->
<!-- levelMin: Number,
    levelMax: Number, -->

players: [{ type: Schema.Types.ObjectId, ref: 'User' }] ,
winners: [{ type: Schema.Types.ObjectId, ref: 'User' }],
losers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}

**Notification Model**
{
booking: { type: Schema.Types.ObjectId, ref: 'Booking' },
achievement: { type: Schema.Types.ObjectId, ref: 'Achievement' }
}

**Achievement Model**
{
name: String,
description: String,
image: String,
}

## Links

**GitHub_server** https://github.com/EBM90/ironpadel_server
**GitHub_client** https://github.com/EBM90/ironpadel_client
**Heroku** https://ironpadel.herokuapp.com/
**Trello** https://trello.com/b/ZfofYARC/ironpaddle
**References**
