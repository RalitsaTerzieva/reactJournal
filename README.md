# A react application to store data about your life

This is a simple journal that can help you track your daily activities and collect data about your habits and health status. Actually, there are two separate apps. The Client which serves the front-end (using React), and the API which is the back-end (using Express).

## Backend
* Express - web framework
* JWT - authentication
* PostgreSQL - database
* Sequelize - ORM
* Babel - ES6 js compiler


## Frontend
* React - UI library
* Formik & yup - form validation
* React mui - material ui component library
* Redux toolkit - shared state management
* Recharts - interactive charts

## How to run the API
1. In your terminal, navigate to the api directory.
2. Run `yarn install` to install all dependencies.
3. Create a PostgreSQL database and configure sequelize by passing the `DATABASE_URL` environment variable
   e.g. `postgres://user:pass@dbhost:5432/journal`
4. Run `yarn sequelize db:migrate` to apply database migrations
5. Run `yarn sequelize db:seed:all` to apply demo seeds
6. Run `yarn dev` to start the app in development mode

## How to run the Client
1. In another terminal, navigate to the client directory.
2. Run `yarn install` to install all dependencies.
3. Run `yarn start` to start the app.

## Deployment
* The api is deployed on Heroku at: https://react-journal-app.herokuapp.com/
* The client is deployed on Netlify at: https://re-journal.netlify.app/