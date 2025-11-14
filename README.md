# House To-Do List

A Node.js and Express web application for managing household tasks.

## Features

-   Create, edit, delete, and view tasks
-   Filter by room, priority, assignee, and completion
-   Sort by due date or priority
-   Highlight overdue and due-today tasks
-   Shows stats for due-today, overdue, and completion percentage

## Technologies

-   Node.js
-   Express
-   MongoDB & Mongoose
-   EJS
-   CSS
-   dotenv

## Installation

1.  Install dependencies:

        npm install dotenv ejs express method-override mongoose
        npm install --save-dev- ejs-lint nodemon

2.  Create a `.env` file:

        MONGODB_URI=mongodb://127.0.0.1:27017/house-todo
        PORT=5000

3.  Start the server:

        npm start

4.  Visit:

        http://localhost:5000

## Environment Variables

-   `MONGODB_URI` --- MongoDB connection string
-   `PORT` --- Server port

## Task Fields

-   Title
-   Room
-   Priority
-   Assignee
-   Due date
-   Notes
-   Completed status
-   Created date
