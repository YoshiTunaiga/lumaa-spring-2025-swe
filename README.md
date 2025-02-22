# Screen Recording

[Loom Recording Link](https://www.loom.com/share/fb3a160f0d6140d3b1fbb705b731ab8d?sid=ec535856-c74d-4576-abf8-52a5ad8f07b8)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Installation

Install the project dependencies using npm:

```bash
npm install
```

**Database Setup**

1. Create a PostgreSQL database:

```bash
psql postgres
CREATE DATABASE taskmanager;
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
BE_PORT=8080
DB_NAME=taskmanager
JWT_SECRET=your_jwt_secret
REACT_APP_API_URL=http://localhost:8080
```

**Migrations**

Run database migrations as follows:

```bash
npx node server/migrate.js
```

## Available Scripts

In the project directory, you can run:

```bash
npm start
```

On a different terminal in the same project directory, you can run the server as:

```bash
npm run start-server
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

```bash
npm test
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```bash
npm run build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

```bash
npm run eject
```

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
