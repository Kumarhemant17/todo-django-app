// CSRF TOKEN
function getCSRFToken() {
    return document.querySelector('[name=csrfmiddlewaretoken]').value;
}

// ADD TASK
function addTask() {
    const title = document.getElementById('title').value;
    const due_date = document.getElementById('due_date').value;
    const priority = document.getElementById('priority').value;

    if (!title) return alert("Enter task name");

    fetch('/add/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCSRFToken()
        },
        body: new URLSearchParams({ title, due_date, priority })
    })
    .then(res => res.json())
    .then(data => {

        const taskList = document.getElementById('task-list');

        let dueText = '';
        if (data.due_date) {
            const d = new Date(data.due_date); // ✅ NO timezone hack

            dueText = d.toLocaleString('en-US', {
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        }

        const newTask = document.createElement('div');
        newTask.className = 'task';
        newTask.id = `task-${data.id}`;

        newTask.innerHTML = `
            <div>
                <span class="task-title">${data.title}</span><br>
                <small style="color:gray; margin-left:5px;">
                    ${dueText ? `(${dueText})` : ''}
                </small>
                <span class="priority ${data.priority.toLowerCase()}">${data.priority}</span>
            </div>
            <div>
                <button onclick="toggleComplete(${data.id})">✔</button>
                <button onclick="openEditModal(${data.id}, '${data.title}', '${data.due_date}', '${data.priority}')">✏️</button>
                <button onclick="deleteTask(${data.id})">🗑</button>
            </div>
        `;

        taskList.prepend(newTask);

        document.getElementById('title').value = '';
        document.getElementById('due_date').value = '';
    });
}

// DELETE
function deleteTask(id) {
    fetch(`/delete/${id}/`, {
        method: 'POST',
        headers: { 'X-CSRFToken': getCSRFToken() }
    })
    .then(res => res.json())
    .then(() => {
        document.getElementById(`task-${id}`).remove();
    });
}

// COMPLETE
function toggleComplete(id) {
    fetch(`/complete/${id}/`, {
        method: 'POST',
        headers: { 'X-CSRFToken': getCSRFToken() }
    })
    .then(res => res.json())
    .then(data => {
        const el = document.querySelector(`#task-${id} .task-title`);
        el.classList.toggle('completed', data.completed);
    });
}

// OPEN MODAL
function openEditModal(id, title, due_date, priority) {
    document.getElementById('editModal').style.display = 'block';

    document.getElementById('edit_id').value = id;
    document.getElementById('edit_title').value = title;
    document.getElementById('edit_priority').value = priority;

    if (due_date && due_date !== 'None') {
        const d = new Date(due_date);
        const formatted = d.toISOString().slice(0, 16);
        document.getElementById('edit_due_date').value = formatted;
    } else {
        document.getElementById('edit_due_date').value = '';
    }
}

// CLOSE MODAL
function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

// UPDATE TASK
function updateTask() {
    const id = document.getElementById('edit_id').value;
    const title = document.getElementById('edit_title').value;
    const due_date = document.getElementById('edit_due_date').value;
    const priority = document.getElementById('edit_priority').value;

    fetch(`/edit/${id}/`, {
        method: 'POST',
        headers: { 'X-CSRFToken': getCSRFToken() },
        body: new URLSearchParams({ title, due_date, priority })
    })
    .then(res => res.json())
    .then(data => {

        document.querySelector(`#task-${id} .task-title`).innerText = data.title;

        const priorityEl = document.querySelector(`#task-${id} .priority`);
        priorityEl.innerText = data.priority;
        priorityEl.classList.remove('low', 'medium', 'high');
        priorityEl.classList.add(data.priority.toLowerCase());

        const small = document.querySelector(`#task-${id} small`);
        if (data.due_date) {
            const d = new Date(data.due_date); // ✅ NO timezone hack

            const formatted = d.toLocaleString('en-US', {
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
            small.innerText = `(${formatted})`;
        } else {
            small.innerText = '';
        }

        closeModal();
    })
    .catch(err => {
        console.error("Update Error:", err);
    });
}