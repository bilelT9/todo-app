
# 📝 Full-Stack TODO App

A simple full-stack TODO list web application built using:

- 🌐 **Frontend**: React
- 🛠️ **Backend**: Node.js + Express
- 🗃️ **Database**: MariaDB (via phpMyAdmin)

This app allows users to create, update, delete, and complete tasks — all stored in a persistent database.

---

## 🚀 Features

- Add tasks with title and description
- Mark tasks as completed or undone
- Delete tasks
- Display a list of all tasks
- Persistent data using MariaDB

---

## 🧠 Technologies Used

| Layer     | Tech               |
|-----------|--------------------|
| Frontend  | React, Axios       |
| Backend   | Node.js, Express   |
| Database  | MariaDB (phpMyAdmin) |
| Data Flow | RESTful API, JSON  |

---

## 📁 Project Structure

```
todo-app/
├── backend/        # Node.js + Express API
│   ├── server.js   # API logic and DB connection
│   └── package.json
├── frontend/       # React App
│   ├── src/App.js
│   ├── src/App.css
│   └── package.json
└── README.md       # This documentation
```

---

## 🛠️ Setup Instructions

### 1. 📦 Backend Setup (`backend/`)

In the **backend** directory, run:

```bash
cd backend
npm install
node server.js
```

- **Ensure MariaDB is running** (e.g., via XAMPP or MAMP)
- Edit `server.js` to match your phpMyAdmin credentials:

```js
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',     // phpMyAdmin user
  password: '',     // Your password (empty by default in XAMPP)
  database: 'todo_db'
});
```

### 2. 💻 Frontend Setup (`frontend/`)

In the **frontend** directory, run:

```bash
cd frontend
npm install
npm start
```

- Open your browser at [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📦 Sample MariaDB Table

This is the SQL schema for the `tasks` table used in MariaDB:

```sql
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false
);
```

---

## ✅ API Endpoints

| Method | Endpoint         | Description           |
|--------|------------------|-----------------------|
| GET    | `/tasks`         | Get all tasks         |
| POST   | `/tasks`         | Add a new task        |
| PUT    | `/tasks/:id`     | Toggle task completed |
| DELETE | `/tasks/:id`     | Delete a task         |

---

## 🧑‍💻 Author

**Bilel Ghazouani**  
[GitHub Profile](https://github.com/bilelT9)  
[LinkedIn (optional)](https://www.linkedin.com/in/ghazouani-bilel-1a41b2198/)

---

## 📌 Notes

- Built for educational/demo purposes.
- Can be extended with authentication, filtering, pagination, etc.
