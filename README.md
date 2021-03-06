# Pressure Tracker

This is the back-end API for my data charting web application.
My second go at building an app focused on tracking the effect of quick
barometric pressure change on chronic health issues.
It does this by collecting user health symptoms and local barometric pressure.

Pressure Tracker is a RESTful API created using Node.js and Express.
I'm using a CronJob to get the barometric pressure for my zipcode every hour,
and save it in my PostgreSQL database.

The front-end
repo is here: [github.com/faetea/weatherFront](https://github.com/faetea/weatherFront)

Deployed application is here: [faetea.github.io/weatherFront](http://faetea.github.io/weatherFront/)

## Installation

`git clone` and `npm install`.

## Running / Development

Run `npm start`, visit your app at [http://localhost:3000](http://localhost:3000).

## ROUTES

|  Verb   |  URI Pattern        |  Notes                                    |
|---------|---------------------|-------------------------------------------|
| POST    | `/signup`           | uses bcrypt to salt and hash              |
| GET     | `/login`            | what info login expects                   |
| POST    | `/login`            | passport.authenticate                     |
| DELETE  | `/logout`           | broken??                                  |
| POST    | `/entries`          | passport auth, user creates new log       |
| GET     | `/entries`          | passport auth, lists all of user's logs   |
| GET     | `/health`           | passport auth, json for user health chart |
| GET     | `/pressure?weeks=1` | json for barometric pressure chart *      |

```md
* /pressure?weeks=1 limits query by number that represents weeks
```

## Technologies Used

-   [Passport.js](http://passportjs.org/)
-   [Node.js](http://nodejs.org/)
-   [Express.js](http://expressjs.com/)
-   [Sequelize.js](http://sequelize.readthedocs.org/en/latest/)
-   [PostgreSQL](http://www.postgresql.org/docs/9.4/static/tutorial-sql.html)

## Other Useful Links

-   [openWeatherMap API](http://openweathermap.org/current)
-   [The Kick Ass Guide to Creating Nodejs Cron Tasks](http://handyjs.org/article/the-kick-ass-guide-to-creating-nodejs-cron-tasks)
-   [Sequelize.js docs model](http://docs.sequelizejs.com/en/latest/api/model/)
-   [Sequelize.js docs querying](http://docs.sequelizejs.com/en/latest/docs/querying/)
-   [PostgreSQL docs commands](http://www.postgresql.org/docs/9.4/static/sql-commands.html)
-   [PostgreSQL docs datetime](http://www.postgresql.org/docs/9.4/static/functions-datetime.html)
