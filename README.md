# 📝 Django To-Do App (Premium UI)

A modern, feature-rich To-Do application built with **Django + AJAX**, designed with a **premium UI/UX (glassmorphism + smooth animations)**.

---

## 🚀 Features

### ✅ Core Functionality

* Add, Edit, Delete tasks (AJAX)
* Mark tasks as complete/incomplete
* Session-based user name (no login required)
* Real-time UI updates (no page reload)

### ⏰ Advanced Features

* Due date & time support
* Priority levels (Low / Medium / High)
* Task filtering:

  * All
  * Completed
  * Pending
* Sort by priority

### 🎨 UI / UX Highlights

* Glassmorphism card design
* Gradient background (modern SaaS feel)
* Micro-interactions (hover, click, focus)
* Smooth page transitions
* Responsive centered layout
* Custom favicon & branding

---

## 🛠 Tech Stack

* **Backend:** Django (Python)
* **Frontend:** HTML, CSS, JavaScript (Vanilla)
* **AJAX:** Fetch API
* **Database:** SQLite (default)

---

## 📂 Project Structure

```
todo_project/
│
├── todo/
│   ├── migrations/
│   ├── static/todo/
│   │   ├── style.css
│   │   ├── script.js
│   │   └── favicon.jpeg
│   ├── templates/todo/
│   │   ├── task_list.html
│   │   └── set_name.html
│   ├── models.py
│   ├── views.py
│   └── urls.py
│
├── manage.py
└── db.sqlite3
```

---

## ⚙️ Setup & Run Locally

### 1️⃣ Clone repo

```bash
git clone https://github.com/Kumarhemant17/todo-django-app.git
cd todo-django-app
```

### 2️⃣ Create virtual environment

```bash
python -m venv venv
venv\Scripts\activate   # Windows
```

### 3️⃣ Install dependencies

```bash
pip install django
```

### 4️⃣ Run migrations

```bash
python manage.py migrate
```

### 5️⃣ Start server

```bash
python manage.py runserver
```

👉 Open: `http://127.0.0.1:8000`

---

## 📸 Screenshots

*(Add screenshots here for better presentation)*

---

## 💡 Future Improvements

* User authentication (login/signup)
* Cloud deployment (Render / Railway)
* Task categories & tags
* Dark mode toggle
* Notifications / reminders

---

## 🌐 Live Demo (optional)

*Add after deployment*

---

## 👨‍💻 Author

**Hemant Kumar**

* GitHub: https://github.com/Kumarhemant17

---

## ⭐ If you like this project

Give it a star ⭐ on GitHub
