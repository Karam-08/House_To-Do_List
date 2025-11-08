cat > README.md << 'EOF'
# House To-Do List

**Note to teacher:** Some UI polish, the toggle-completed route, and stats panel are not implemented due to time constraints. Core MVP features work.

A simple full-stack CRUD app to manage household tasks by room and priority. Built with **Node.js, Express, MongoDB, Mongoose, and EJS**.

---

## Features (Required MVP)

- **Tasks CRUD**: Create, read, update, delete tasks
- **Task fields**:
  - `title` (required, 3–80 characters)
  - `room` (enum: Kitchen, Living Room, Bathroom, Bedroom, Garage, Yard, Other)
  - `priority` (enum: Low, Medium, High)
  - `assignee` (optional)
  - `dueDate` (optional)
  - `notes` (optional, max 500)
  - `completed` (boolean, default false)
  - timestamps enabled
- **Filtering & Search**: Filter by room and priority; search by title, notes, or assignee
- **Sticky forms**: Input values persist on form reload
- **Basic sorting**: Tasks sorted by newest created first
- **Validation**: Server-side validation for required fields and max lengths

---

## Known Issues / Missing Features

- Toggle completed task via a dedicated route (`POST /tasks/:id/toggle`) — currently can only edit manually
- Inline validation error messages in forms
- UI polish: no strikethrough/muted style for completed tasks, no overdue badges, no room/priority badges
- Stats panel (total, completed, overdue tasks)
- Sorting by dueDate or priority

---

## Installation / Running

1. Clone the repo  
   ```bash
   git clone <repo_url>
   cd house-to-do-list

2. Install dependencies
   ```bash
    npm install dotenv ejs express method-override mongoose
    npm --save-dev ejs-lint nodemon

3. Add this to the package.json script tag
   ```bash
    "dev": "nodemon --ext js,ejs app.js",
    "start": "node app.js",
    "lint:ejs": "ejs-lint \"views/**/*.ejs\"",
    "lint": "npm run lint:ejs"

4. Configure MongoDB
   ```bash
    Create a .env file with:
        PORT = 5000
        MONGO_DB_URI=<your_mongo_uri>

5. Start the server
   ```bash
    npm run dev

6. Open in browser
   ```bash
    http://localhost:5000