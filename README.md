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

2.  Create an `.env` file:

        MONGO_DB_URI = mongodb+srv://admin:OoPpuCZ35Ck7o0Or@web-dev.ld3npzt.mongodb.net/House_To_Do_List
        PORT=5000

3.  Start the server:

        npm run dev

4.  Visit:

        http://localhost:5000

## Environment Variables

-   `MONGO_DB_URI` --- MongoDB connection string
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
