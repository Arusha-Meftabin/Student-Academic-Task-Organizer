// ==========================================
// STUDY MATE - COMPLETE APPLICATION
// TASK, SUBJECT, STUDY PLANNER, CALENDAR,
// EXAM COUNTDOWN, ANALYTICS AND SETTINGS
// ==========================================


// ==========================================
// 1. LOAD SAVED DATA
// ==========================================

function loadData(key) {
    try {
        const savedData = localStorage.getItem(key);
        return savedData ? JSON.parse(savedData) : [];
    } catch (error) {
        console.error("Unable to load " + key, error);
        return [];
    }
}

let tasks = loadData("studyMateTasks");
let subjects = loadData("studyMateSubjects");
let studySessions = loadData("studyMateSessions");
let exams = loadData("studyMateExams");

let editingTaskId = null;
let editingSubjectId = null;
let editingSessionId = null;
let editingExamId = null;


// ==========================================
// 2. GET HTML ELEMENTS
// ==========================================

// Main views
const dashboardView = document.getElementById("dashboardView");
const subjectView = document.getElementById("subjectView");
const myTasksSection = document.getElementById("myTasksSection");
const studyPlannerView = document.getElementById("studyPlannerView");
const calendarView = document.getElementById("calendarView");
const examView = document.getElementById("examView");
const analyticsView = document.getElementById("analyticsView");
const settingsView = document.getElementById("settingsView");

// Navigation
const navDashboard = document.getElementById("navDashboard");
const navTasks = document.getElementById("navTasks");
const navSubjects = document.getElementById("navSubjects");
const navStudyPlanner = document.getElementById("navStudyPlanner");
const navCalendar = document.getElementById("navCalendar");
const navExams = document.getElementById("navExams");
const navAnalytics = document.getElementById("navAnalytics");
const navSettings = document.getElementById("navSettings");

// Task elements
const taskForm = document.getElementById("taskForm");
const academicTaskForm = document.getElementById("academicTaskForm");
const addTaskButton = document.getElementById("addTaskButton");
const cancelTaskButton = document.getElementById("cancelTaskButton");
const taskTableBody = document.getElementById("taskTableBody");

const searchTask = document.getElementById("searchTask");
const filterStatus = document.getElementById("filterStatus");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const overdueTasks = document.getElementById("overdueTasks");

const taskTitle = document.getElementById("taskTitle");
const taskSubject = document.getElementById("taskSubject");
const taskType = document.getElementById("taskType");
const taskDeadline = document.getElementById("taskDeadline");
const taskPriority = document.getElementById("taskPriority");

// Subject elements
const subjectForm = document.getElementById("subjectForm");
const academicSubjectForm = document.getElementById("academicSubjectForm");

const addSubjectButton = document.getElementById("addSubjectButton");
const cancelSubjectButton = document.getElementById("cancelSubjectButton");
const subjectGrid = document.getElementById("subjectGrid");
const searchSubject = document.getElementById("searchSubject");

const subjectName = document.getElementById("subjectName");
const subjectCode = document.getElementById("subjectCode");
const subjectDescription = document.getElementById("subjectDescription");

// Study Planner elements
const plannerForm = document.getElementById("plannerForm");
const studySessionForm = document.getElementById("studySessionForm");

const addSessionButton = document.getElementById("addSessionButton");
const cancelSessionButton = document.getElementById("cancelSessionButton");

const sessionTitle = document.getElementById("sessionTitle");
const sessionSubject = document.getElementById("sessionSubject");
const sessionDay = document.getElementById("sessionDay");
const sessionStart = document.getElementById("sessionStart");
const sessionEnd = document.getElementById("sessionEnd");

const weeklyTimetable = document.getElementById("weeklyTimetable");

// Calendar elements
const calendarMonthYear = document.getElementById("calendarMonthYear");
const calendarDays = document.getElementById("calendarDays");

const prevMonthButton = document.getElementById("prevMonthButton");
const nextMonthButton = document.getElementById("nextMonthButton");
const todayButton = document.getElementById("todayButton");

const selectedDateTitle = document.getElementById("selectedDateTitle");
const selectedDateTasks = document.getElementById("selectedDateTasks");

// Exam elements
const examForm = document.getElementById("examForm");
const academicExamForm = document.getElementById("academicExamForm");

const addExamButton = document.getElementById("addExamButton");
const cancelExamButton = document.getElementById("cancelExamButton");

const examName = document.getElementById("examName");
const examSubject = document.getElementById("examSubject");
const examDate = document.getElementById("examDate");

const examGrid = document.getElementById("examGrid");
const searchExam = document.getElementById("searchExam");
const filterExam = document.getElementById("filterExam");

// Analytics elements
const analyticsTotal = document.getElementById("analyticsTotal");
const analyticsCompleted = document.getElementById("analyticsCompleted");
const analyticsRemaining = document.getElementById("analyticsRemaining");
const analyticsRate = document.getElementById("analyticsRate");
const completionProgress = document.getElementById("completionProgress");
const completionCaption = document.getElementById("completionCaption");
const subjectAnalytics = document.getElementById("subjectAnalytics");
const statusAnalytics = document.getElementById("statusAnalytics");
const weeklyAnalytics = document.getElementById("weeklyAnalytics");


// ==========================================
// 3. SAVE DATA
// ==========================================

function saveTasks() {
    localStorage.setItem("studyMateTasks", JSON.stringify(tasks));
}

function saveSubjects() {
    localStorage.setItem("studyMateSubjects", JSON.stringify(subjects));
}

function saveStudySessions() {
    localStorage.setItem("studyMateSessions", JSON.stringify(studySessions));
}

function saveExams() {
    localStorage.setItem("studyMateExams", JSON.stringify(exams));
}


// ==========================================
// 4. COMMON FUNCTIONS
// ==========================================

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, function (character) {
        const characters = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return characters[character];
    });
}

function getToday() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function isOverdue(task) {
    return task.status !== "completed" &&
        task.deadline < getToday();
}


// ==========================================
// 5. PAGE NAVIGATION
// ==========================================

function setActiveNavigation(activeItem) {

    [
        navDashboard,
        navTasks,
        navSubjects,
        navStudyPlanner,
        navCalendar,
        navExams,
        navAnalytics,
        navSettings
    ].forEach(item => {
        if (item) {
            item.classList.remove("active");
        }
    });

    if (activeItem) {
        activeItem.classList.add("active");
    }
}


function hideAllViews() {

    [
        dashboardView,
        myTasksSection,
        subjectView,
        studyPlannerView,
        calendarView,
        examView,
        analyticsView,
        settingsView
    ].forEach(view => {
        if (view) {
            view.style.display = "none";
        }
    });

    taskForm.style.display = "none";
    subjectForm.style.display = "none";
    plannerForm.style.display = "none";
    examForm.style.display = "none";
}


function showDashboard() {
    hideAllViews();
    dashboardView.style.display = "block";
    setActiveNavigation(navDashboard);
    updateStatistics();
    window.scrollTo(0, 0);
}


function showTasks() {
    hideAllViews();
    myTasksSection.style.display = "block";
    setActiveNavigation(navTasks);
    updateStatistics();
    displayTasks();
    window.scrollTo(0, 0);
}


function showSubjects() {
    hideAllViews();
    subjectView.style.display = "block";
    setActiveNavigation(navSubjects);
    renderSubjects();
    window.scrollTo(0, 0);
}


function showStudyPlanner() {
    hideAllViews();
    studyPlannerView.style.display = "block";
    setActiveNavigation(navStudyPlanner);
    updateSessionSubjectDropdown();
    renderStudySessions();
    window.scrollTo(0, 0);
}


function showCalendar() {
    hideAllViews();
    calendarView.style.display = "block";
    setActiveNavigation(navCalendar);
    renderCalendar();
    window.scrollTo(0, 0);
}


function showExams() {
    hideAllViews();
    examView.style.display = "block";
    setActiveNavigation(navExams);
    updateExamSubjectDropdown();
    renderExams();
    window.scrollTo(0, 0);
}


function showAnalytics() {
    hideAllViews();
    analyticsView.style.display = "block";
    setActiveNavigation(navAnalytics);
    renderAnalytics();
    window.scrollTo(0, 0);
}


function showSettings() {
    hideAllViews();
    settingsView.style.display = "block";
    setActiveNavigation(navSettings);
    window.scrollTo(0, 0);
}


// ==========================================
// 6. SUBJECT DROPDOWN IN TASK FORM
// ==========================================

function updateSubjectDropdown(selectedValue = "") {

    const existingTaskSubjects = tasks
        .map(task => task.subject)
        .filter(Boolean);

    const savedSubjectNames = subjects.map(subject => subject.name);

    const oldSubjects = [...new Set(existingTaskSubjects)]
        .filter(name => !savedSubjectNames.includes(name));

    let options = '<option value="">Select a subject</option>';

    subjects.forEach(subject => {
        options += `
            <option value="${escapeHTML(subject.name)}">
                ${escapeHTML(subject.name)} (${escapeHTML(subject.code)})
            </option>
        `;
    });

    oldSubjects.forEach(name => {
        options += `
            <option value="${escapeHTML(name)}">
                ${escapeHTML(name)} (Existing task)
            </option>
        `;
    });

    taskSubject.innerHTML = options;
    taskSubject.value = selectedValue;
}


// ==========================================
// 7. SUBJECT MANAGEMENT - OPEN FORM
// ==========================================

addSubjectButton.addEventListener("click", function () {

    editingSubjectId = null;
    academicSubjectForm.reset();

    document.getElementById("subjectFormTitle").textContent =
        "Add New Subject";

    document.getElementById("saveSubjectButton").textContent =
        "Save Subject";

    subjectForm.style.display = "block";
    subjectName.focus();
});


// ==========================================
// 8. SUBJECT MANAGEMENT - CANCEL FORM
// ==========================================

cancelSubjectButton.addEventListener("click", function () {

    subjectForm.style.display = "none";
    academicSubjectForm.reset();
    editingSubjectId = null;
});


// ==========================================
// 9. ADD AND EDIT SUBJECT
// ==========================================

academicSubjectForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = subjectName.value.trim();
    const code = subjectCode.value.trim();
    const description = subjectDescription.value.trim();

    if (!name || !code) {
        showAppPopup("warning", "Please enter the subject name and code.");
        return;
    }

    const duplicateSubject = subjects.some(subject => {

        const sameName =
            subject.name.toLowerCase() === name.toLowerCase();

        const sameCode =
            subject.code.toLowerCase() === code.toLowerCase();

        return (sameName || sameCode) &&
            subject.id !== editingSubjectId;
    });

    if (duplicateSubject) {
        showAppPopup("warning", "A subject with this name or code already exists.");
        return;
    }

    if (editingSubjectId !== null) {

        const subject = subjects.find(subject =>
            subject.id === editingSubjectId
        );

        if (subject) {

            const oldName = subject.name;

            subject.name = name;
            subject.code = code;
            subject.description = description;

            if (oldName !== name) {

                tasks.forEach(task => {
                    if (task.subject === oldName) {
                        task.subject = name;
                    }
                });

                studySessions.forEach(session => {
                    if (session.subject === oldName) {
                        session.subject = name;
                    }
                });

                exams.forEach(exam => {
                    if (exam.subject === oldName) {
                        exam.subject = name;
                    }
                });

                saveTasks();
                saveStudySessions();
                saveExams();
            }
        }

    } else {

        subjects.push({
            id: Date.now().toString(),
            name: name,
            code: code,
            description: description
        });
    }

    saveSubjects();

    renderSubjects();
    updateSubjectDropdown();
    updateSessionSubjectDropdown();
    updateExamSubjectDropdown();

    academicSubjectForm.reset();
    subjectForm.style.display = "none";
    editingSubjectId = null;

    updateStatistics();
    displayTasks();
    renderStudySessions();
    renderExams();
    renderAnalytics();

    showAppPopup("success", "Subject saved successfully!");
});


// ==========================================
// 10. DISPLAY SUBJECTS
// ==========================================

function renderSubjects() {

    const searchValue = searchSubject.value
        .trim()
        .toLowerCase();

    const filteredSubjects = subjects.filter(subject => {

        return subject.name.toLowerCase().includes(searchValue) ||
            subject.code.toLowerCase().includes(searchValue);
    });

    if (filteredSubjects.length === 0) {

        subjectGrid.innerHTML = `
            <div class="empty-subject-message">
                <h3>No subjects found</h3>
                <p>Add a new subject to get started.</p>
            </div>
        `;

        return;
    }

    subjectGrid.innerHTML = filteredSubjects.map(subject => {

        const relatedTasks = tasks.filter(task =>
            task.subject === subject.name
        );

        const completedCount = relatedTasks.filter(task =>
            task.status === "completed"
        ).length;

        return `
            <div class="subject-card">

                <div class="subject-card-header">
                    <div class="subject-icon">S</div>
                    <span class="subject-code">
                        ${escapeHTML(subject.code)}
                    </span>
                </div>

                <h3>${escapeHTML(subject.name)}</h3>

                <p class="subject-description">
                    ${escapeHTML(subject.description || "No description provided.")}
                </p>

                <div class="subject-info">
                    <span>Total Tasks: ${relatedTasks.length}</span>
                    <span>Completed: ${completedCount}</span>
                </div>

                <div class="subject-actions">

                    <button
                        class="edit-subject-btn"
                        data-action="edit-subject"
                        data-id="${escapeHTML(subject.id)}">
                        Edit
                    </button>

                    <button
                        class="delete-subject-btn"
                        data-action="delete-subject"
                        data-id="${escapeHTML(subject.id)}">
                        Delete
                    </button>

                </div>
            </div>
        `;
    }).join("");
}


// ==========================================
// 11. SEARCH SUBJECTS
// ==========================================

searchSubject.addEventListener("input", renderSubjects);


// ==========================================
// 12. EDIT AND DELETE SUBJECT
// ==========================================

subjectGrid.addEventListener("click", function (event) {

    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const subjectId = button.dataset.id;
    const action = button.dataset.action;

    const subject = subjects.find(subject =>
        subject.id === subjectId
    );

    if (!subject) return;

    if (action === "edit-subject") {

        editingSubjectId = subject.id;

        subjectName.value = subject.name;
        subjectCode.value = subject.code;
        subjectDescription.value = subject.description || "";

        document.getElementById("subjectFormTitle").textContent =
            "Edit Subject";

        document.getElementById("saveSubjectButton").textContent =
            "Update Subject";

        subjectForm.style.display = "block";
        subjectName.focus();
    }

    if (action === "delete-subject") {

        const hasTasks = tasks.some(task =>
            task.subject === subject.name
        );

        const hasSessions = studySessions.some(session =>
            session.subject === subject.name
        );

        const hasExams = exams.some(exam =>
            exam.subject === subject.name
        );

        if (hasTasks || hasSessions || hasExams) {

            showAppPopup(
    "warning",
    "This subject is being used by existing tasks, study sessions, or exams. Please reassign or delete them before deleting this subject."
);

            return;
        }

        
showAppConfirm("Are you sure you want to delete " + subject.name + "?")
    .then(confirmed => {

        if (!confirmed) {
            return;
        }

        subjects = subjects.filter(subject =>
            subject.id !== subjectId
        );

        saveSubjects();

        renderSubjects();
        updateSubjectDropdown();
        updateSessionSubjectDropdown();
        updateExamSubjectDropdown();
        renderAnalytics();

        showAppPopup("success", "Subject deleted successfully!");
    });

    }
});


// ==========================================
// 13. TASK MANAGEMENT - STATISTICS
// ==========================================

function updateStatistics() {

    const total = tasks.length;

    const completed = tasks.filter(task =>
        task.status === "completed"
    ).length;

    const pending = tasks.filter(task =>
        task.status === "pending" && !isOverdue(task)
    ).length;

    const overdue = tasks.filter(task =>
        isOverdue(task)
    ).length;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;
    overdueTasks.textContent = overdue;
}


// ==========================================
// 14. DISPLAY TASKS
// ==========================================

function displayTasks() {

    const searchValue = searchTask.value.toLowerCase();
    const selectedFilter = filterStatus.value;

    const filteredTasks = tasks.filter(task => {

        const matchesSearch =
            task.title.toLowerCase().includes(searchValue) ||
            (task.subject || "").toLowerCase().includes(searchValue);

        let matchesFilter = true;

        if (selectedFilter === "pending") {
            matchesFilter =
                task.status === "pending" && !isOverdue(task);
        }

        if (selectedFilter === "completed") {
            matchesFilter = task.status === "completed";
        }

        if (selectedFilter === "overdue") {
            matchesFilter = isOverdue(task);
        }

        return matchesSearch && matchesFilter;
    });

    if (filteredTasks.length === 0) {

        taskTableBody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-message">
                    No tasks found.
                </td>
            </tr>
        `;

        return;
    }

    taskTableBody.innerHTML = filteredTasks.map(task => {

        let statusText = "Pending";
        let statusClass = "pending";

        if (task.status === "completed") {
            statusText = "Completed";
            statusClass = "completed";
        } else if (isOverdue(task)) {
            statusText = "Overdue";
            statusClass = "overdue";
        }

        const priorityClass = (task.priority || "medium").toLowerCase();

        return `
            <tr>

                <td>
                    <strong>${escapeHTML(task.title)}</strong>
                    <br>
                    <small>${escapeHTML(task.type)}</small>
                </td>

                <td>${escapeHTML(task.subject)}</td>
                <td>${escapeHTML(task.deadline)}</td>

                <td>
                    <span class="priority-badge ${priorityClass}">
                        ${escapeHTML(task.priority)}
                    </span>
                </td>

                <td>
                    <span class="status-badge ${statusClass}">
                        ${statusText}
                    </span>
                </td>

                <td>
                    <div class="action-buttons">

                        <button class="complete-btn"
                            data-action="complete"
                            data-id="${escapeHTML(task.id)}">
                            ${task.status === "completed" ? "Undo" : "Done"}
                        </button>

                        <button class="edit-btn"
                            data-action="edit"
                            data-id="${escapeHTML(task.id)}">
                            Edit
                        </button>

                        <button class="delete-btn"
                            data-action="delete"
                            data-id="${escapeHTML(task.id)}">
                            Delete
                        </button>

                    </div>
                </td>

            </tr>
        `;
    }).join("");
}


// ==========================================
// 15. OPEN TASK FORM
// ==========================================

addTaskButton.addEventListener("click", function () {

    editingTaskId = null;
    academicTaskForm.reset();

    updateSubjectDropdown();

    document.getElementById("formTitle").textContent =
        "Add New Task";

    document.getElementById("saveTaskButton").textContent =
        "Save Task";

    taskForm.style.display = "block";
    taskTitle.focus();
});


// ==========================================
// 16. CANCEL TASK FORM
// ==========================================

cancelTaskButton.addEventListener("click", function () {

    taskForm.style.display = "none";
    academicTaskForm.reset();
    editingTaskId = null;
});



// ==========================================
// 17. ADD AND UPDATE TASK
// ==========================================

academicTaskForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const title = taskTitle.value.trim();
    const subject = taskSubject.value;
    const type = taskType.value;
    const deadline = taskDeadline.value;
    const priority = taskPriority.value;

    if (!title || !subject || !deadline) {
        showAppPopup("warning", "Please fill in all required fields.");
        return;
    }

    // Confirm if the deadline is in the past
    if (deadline < getToday() && editingTaskId === null) {

        const confirmed = await showAppConfirm(
            "This deadline is in the past. Do you want to continue?"
        );

        if (!confirmed) {
            return;
        }
    }

    // Update existing task
    if (editingTaskId !== null) {

        const task = tasks.find(task =>
            task.id === editingTaskId
        );

        if (task) {
            task.title = title;
            task.subject = subject;
            task.type = type;
            task.deadline = deadline;
            task.priority = priority;
        }

    } else {

        // Add new task
        tasks.push({
            id: Date.now().toString(),
            title: title,
            subject: subject,
            type: type,
            deadline: deadline,
            priority: priority,
            status: "pending"
        });
    }

    saveTasks();

    updateStatistics();
    displayTasks();
    renderSubjects();
    renderCalendar();
    renderAnalytics();

    academicTaskForm.reset();
    taskForm.style.display = "none";
    editingTaskId = null;

    showAppPopup("success", "Task saved successfully!");
});



// ==========================================
// 18. TASK EDIT, DELETE AND COMPLETE
// ==========================================

taskTableBody.addEventListener("click", function (event) {

    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const taskId = button.dataset.id;
    const action = button.dataset.action;

    const task = tasks.find(task =>
        task.id === taskId
    );

    if (!task) return;

    if (action === "complete") {

        task.status =
            task.status === "completed" ? "pending" : "completed";

        saveTasks();

        updateStatistics();
        displayTasks();
        renderSubjects();
        renderCalendar();
        renderAnalytics();
    }

    if (action === "edit") {

        editingTaskId = task.id;

        taskTitle.value = task.title;
        updateSubjectDropdown(task.subject);
        taskType.value = task.type;
        taskDeadline.value = task.deadline;
        taskPriority.value = task.priority;

        document.getElementById("formTitle").textContent =
            "Edit Task";

        document.getElementById("saveTaskButton").textContent =
            "Update Task";

        taskForm.style.display = "block";
        taskTitle.focus();
    }

if (action === "delete") {

    const deletedTask = { ...task };

    tasks = tasks.filter(item => item.id !== taskId);

    saveTasks();

    updateStatistics();
    displayTasks();
    renderSubjects();
    renderCalendar();
    renderAnalytics();

    showUndoMessage("Task deleted successfully!", function () {

        tasks.push(deletedTask);

        saveTasks();

        updateStatistics();
        displayTasks();
        renderSubjects();
        renderCalendar();
        renderAnalytics();

    });
}
});


// ==========================================
// 19. TASK SEARCH AND FILTER
// ==========================================

searchTask.addEventListener("input", displayTasks);
filterStatus.addEventListener("change", displayTasks);


// ==========================================
// 20. STUDY PLANNER
// ==========================================

function updateSessionSubjectDropdown(selectedValue = "") {

    sessionSubject.innerHTML =
        '<option value="">Select a subject</option>';

    subjects.forEach(subject => {

        const option = document.createElement("option");

        option.value = subject.name;
        option.textContent = subject.name + " (" + subject.code + ")";

        sessionSubject.appendChild(option);
    });

    sessionSubject.value = selectedValue;
}


addSessionButton.addEventListener("click", function () {

    editingSessionId = null;
    studySessionForm.reset();

    updateSessionSubjectDropdown();

    document.getElementById("plannerFormTitle").textContent =
        "Add Study Session";

    document.getElementById("saveSessionButton").textContent =
        "Save Session";

    plannerForm.style.display = "block";
    sessionTitle.focus();
});


cancelSessionButton.addEventListener("click", function () {

    plannerForm.style.display = "none";
    studySessionForm.reset();
    editingSessionId = null;
});


studySessionForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const title = sessionTitle.value.trim();
    const subject = sessionSubject.value;
    const day = sessionDay.value;
    const start = sessionStart.value;
    const end = sessionEnd.value;

    if (!title || !subject || !day || !start || !end) {
       showAppPopup("warning", "Please complete all fields.");
        return;
    }

    if (start >= end) {
        showAppPopup("warning", "End time must be later than start time.");
        return;
    }

    const overlapping = studySessions.some(session => {

        if (session.day !== day || session.id === editingSessionId) {
            return false;
        }

        return start < session.end && end > session.start;
    });

    if (overlapping) {
        showAppPopup("warning", "This time overlaps with another study session.");
        return;
    }

    if (editingSessionId !== null) {

        const session = studySessions.find(item =>
            item.id === editingSessionId
        );

        if (session) {
            session.title = title;
            session.subject = subject;
            session.day = day;
            session.start = start;
            session.end = end;
        }

    } else {

        studySessions.push({
            id: Date.now().toString(),
            title: title,
            subject: subject,
            day: day,
            start: start,
            end: end
        });
    }

    saveStudySessions();
    renderStudySessions();

    studySessionForm.reset();
    plannerForm.style.display = "none";
    editingSessionId = null;
});


function renderStudySessions() {

    const days = [
        "Saturday", "Sunday", "Monday", "Tuesday",
        "Wednesday", "Thursday", "Friday"
    ];

    days.forEach(day => {

        const dayColumn = weeklyTimetable.querySelector(
            `.day-column[data-day="${day}"]`
        );

        if (!dayColumn) return;

        const sessionList = dayColumn.querySelector(".session-list");

        const daySessions = studySessions
            .filter(session => session.day === day)
            .sort((a, b) => a.start.localeCompare(b.start));

        if (daySessions.length === 0) {
            sessionList.innerHTML =
                '<p class="no-session">No study sessions</p>';
            return;
        }

        sessionList.innerHTML = daySessions.map(session => `

            <div class="study-session-card">

                <h4>${escapeHTML(session.title)}</h4>
                <p>${escapeHTML(session.subject)}</p>

                <span>
                    ${escapeHTML(session.start)} - ${escapeHTML(session.end)}
                </span>

                <div class="session-actions">

                    <button type="button"
                        data-action="edit-session"
                        data-id="${escapeHTML(session.id)}">
                        Edit
                    </button>

                    <button type="button"
                        data-action="delete-session"
                        data-id="${escapeHTML(session.id)}">
                        Delete
                    </button>

                </div>
            </div>
        `).join("");
    });
}


weeklyTimetable.addEventListener("click", function (event) {

    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const sessionId = button.dataset.id;
    const action = button.dataset.action;

    const session = studySessions.find(item =>
        item.id === sessionId
    );

    if (!session) return;

    if (action === "edit-session") {

        editingSessionId = session.id;

        sessionTitle.value = session.title;
        updateSessionSubjectDropdown(session.subject);
        sessionDay.value = session.day;
        sessionStart.value = session.start;
        sessionEnd.value = session.end;

        document.getElementById("plannerFormTitle").textContent =
            "Edit Study Session";

        document.getElementById("saveSessionButton").textContent =
            "Update Session";

        plannerForm.style.display = "block";
        sessionTitle.focus();
    }

    if (action === "delete-session") {

       const deletedSession = { ...session };

studySessions = studySessions.filter(item =>
    item.id !== sessionId
);

saveStudySessions();
renderStudySessions();

showUndoMessage("Study session deleted successfully!", function () {

    studySessions.push(deletedSession);

    saveStudySessions();
    renderStudySessions();

});
    }
});


// ==========================================
// 21. TASK CALENDAR
// ==========================================

let calendarDate = new Date();
let selectedCalendarDate = getToday();


function formatCalendarDate(year, month, day) {

    const formattedMonth = String(month + 1).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");

    return `${year}-${formattedMonth}-${formattedDay}`;
}


function renderCalendar() {

    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();

    const monthName = calendarDate.toLocaleString("en-US", {
        month: "long"
    });

    calendarMonthYear.textContent = `${monthName} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const previousMonthDays = new Date(year, month, 0).getDate();

    const today = getToday();

    let calendarHTML = "";

    for (let i = firstDay - 1; i >= 0; i--) {

        const day = previousMonthDays - i;
        const date = new Date(year, month - 1, day);

        calendarHTML += createCalendarDay(
            day,
            formatCalendarDate(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
            ),
            true,
            today
        );
    }

    for (let day = 1; day <= daysInMonth; day++) {

        const dateString = formatCalendarDate(year, month, day);

        calendarHTML += createCalendarDay(
            day,
            dateString,
            false,
            today
        );
    }

    const totalCells = firstDay + daysInMonth;
    const remainingCells = (7 - (totalCells % 7)) % 7;

    for (let day = 1; day <= remainingCells; day++) {

        const date = new Date(year, month + 1, day);

        calendarHTML += createCalendarDay(
            day,
            formatCalendarDate(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
            ),
            true,
            today
        );
    }

    calendarDays.innerHTML = calendarHTML;
    displaySelectedDateTasks();
}


function createCalendarDay(day, dateString, otherMonth, today) {

    const dayTasks = tasks.filter(task =>
        task.deadline === dateString
    );

    let classes = "calendar-day";

    if (otherMonth) classes += " other-month";
    if (dateString === today) classes += " today";
    if (dateString === selectedCalendarDate) classes += " selected";

    let taskIndicators = "";

    if (dayTasks.length > 0) {

        const hasPending = dayTasks.some(task =>
            task.status !== "completed" && !isOverdue(task)
        );

        const hasCompleted = dayTasks.some(task =>
            task.status === "completed"
        );

        const hasOverdue = dayTasks.some(task =>
            isOverdue(task)
        );

        if (hasPending) {
            taskIndicators += '<span class="calendar-dot pending-dot"></span>';
        }

        if (hasCompleted) {
            taskIndicators += '<span class="calendar-dot completed-dot"></span>';
        }

        if (hasOverdue) {
            taskIndicators += '<span class="calendar-dot overdue-dot"></span>';
        }
    }

    return `
        <button type="button"
            class="${classes}"
            data-date="${dateString}">

            <span class="calendar-day-number">${day}</span>

            <span class="calendar-indicators">
                ${taskIndicators}
            </span>

            ${dayTasks.length > 0
                ? `<small>${dayTasks.length} task${dayTasks.length > 1 ? "s" : ""}</small>`
                : ""
            }

        </button>
    `;
}


prevMonthButton.addEventListener("click", function () {

    calendarDate = new Date(
        calendarDate.getFullYear(),
        calendarDate.getMonth() - 1,
        1
    );

    renderCalendar();
});


nextMonthButton.addEventListener("click", function () {

    calendarDate = new Date(
        calendarDate.getFullYear(),
        calendarDate.getMonth() + 1,
        1
    );

    renderCalendar();
});


todayButton.addEventListener("click", function () {

    calendarDate = new Date();
    selectedCalendarDate = getToday();

    renderCalendar();
});


calendarDays.addEventListener("click", function (event) {

    const dayButton = event.target.closest("button[data-date]");

    if (!dayButton) return;

    selectedCalendarDate = dayButton.dataset.date;

    const [year, month] = selectedCalendarDate.split("-").map(Number);

    calendarDate = new Date(year, month - 1, 1);

    renderCalendar();
});


function displaySelectedDateTasks() {

    const [year, month, day] = selectedCalendarDate.split("-").map(Number);

    const formattedDate = new Date(year, month - 1, day)
        .toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });

    selectedDateTitle.textContent = `Tasks for ${formattedDate}`;

    const selectedTasks = tasks.filter(task =>
        task.deadline === selectedCalendarDate
    );

    if (selectedTasks.length === 0) {

        selectedDateTasks.innerHTML = `
            <p class="no-calendar-task">
                No tasks scheduled for this date.
            </p>
        `;

        return;
    }

    selectedDateTasks.innerHTML = selectedTasks.map(task => {

        let status = "Pending";
        let statusClass = "pending";

        if (task.status === "completed") {
            status = "Completed";
            statusClass = "completed";
        } else if (isOverdue(task)) {
            status = "Overdue";
            statusClass = "overdue";
        }

        return `
            <div class="calendar-task-card">

                <div>
                    <h4>${escapeHTML(task.title)}</h4>
                    <p>${escapeHTML(task.subject)} · ${escapeHTML(task.type)}</p>
                    <small>Priority: ${escapeHTML(task.priority)}</small>
                </div>

                <span class="status-badge ${statusClass}">
                    ${status}
                </span>

            </div>
        `;
    }).join("");
}


// ==========================================
// 22. EXAM COUNTDOWN
// ==========================================

function updateExamSubjectDropdown(selectedValue = "") {

    examSubject.innerHTML =
        '<option value="">Select a subject</option>';

    subjects.forEach(subject => {

        const option = document.createElement("option");

        option.value = subject.name;
        option.textContent = subject.name + " (" + subject.code + ")";

        examSubject.appendChild(option);
    });

    examSubject.value = selectedValue;
}


function getDaysRemaining(dateString) {

    const today = getToday();

    const todayDate = new Date(today + "T00:00:00");
    const examDateValue = new Date(dateString + "T00:00:00");

    const difference = examDateValue - todayDate;

    return Math.round(difference / (1000 * 60 * 60 * 24));
}


function getExamStatus(exam) {

    if (exam.status === "completed") {
        return "completed";
    }

    if (exam.date < getToday()) {
        return "passed";
    }

    return "upcoming";
}


addExamButton.addEventListener("click", function () {

    editingExamId = null;
    academicExamForm.reset();

    updateExamSubjectDropdown();

    document.getElementById("examFormTitle").textContent =
        "Add New Exam";

    document.getElementById("saveExamButton").textContent =
        "Save Exam";

    examForm.style.display = "block";
    examName.focus();
});


cancelExamButton.addEventListener("click", function () {

    examForm.style.display = "none";
    academicExamForm.reset();
    editingExamId = null;
});


academicExamForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = examName.value.trim();
    const subject = examSubject.value;
    const date = examDate.value;

    if (!name || !subject || !date) {
        showAppPopup("warning", "Please fill in all exam fields.");
        return;
    }

    if (editingExamId !== null) {

        const exam = exams.find(item =>
            item.id === editingExamId
        );

        if (exam) {
            exam.name = name;
            exam.subject = subject;
            exam.date = date;
        }

    } else {

        exams.push({
            id: Date.now().toString(),
            name: name,
            subject: subject,
            date: date,
            status: "upcoming"
        });
    }

    saveExams();
    renderExams();

    academicExamForm.reset();
    examForm.style.display = "none";
    editingExamId = null;

   showAppPopup("success", "Exam saved successfully!");
});


function renderExams() {

    const searchValue = searchExam.value.trim().toLowerCase();
    const selectedFilter = filterExam.value;

    const filteredExams = exams.filter(exam => {

        const matchesSearch =
            exam.name.toLowerCase().includes(searchValue) ||
            exam.subject.toLowerCase().includes(searchValue);

        const status = getExamStatus(exam);

        let matchesFilter = true;

        if (selectedFilter === "upcoming") {
            matchesFilter = status === "upcoming";
        }

        if (selectedFilter === "completed") {
            matchesFilter = status === "completed";
        }

        if (selectedFilter === "passed") {
            matchesFilter = status === "passed";
        }

        return matchesSearch && matchesFilter;
    });

    filteredExams.sort((a, b) =>
        a.date.localeCompare(b.date)
    );

    if (filteredExams.length === 0) {

        examGrid.innerHTML = `
            <div class="empty-exam-message">
                <h3>No exams found</h3>
                <p>Add an exam or change your search and filter.</p>
            </div>
        `;

        return;
    }

    examGrid.innerHTML = filteredExams.map(exam => {

        const status = getExamStatus(exam);
        const daysRemaining = getDaysRemaining(exam.date);

        let countdownText = "";
        let statusText = "";
        let statusClass = "";

        if (status === "completed") {

            countdownText = "Exam completed";
            statusText = "Completed";
            statusClass = "completed";

        } else if (status === "passed") {

            countdownText = "Exam date has passed";
            statusText = "Date Passed";
            statusClass = "passed";

        } else if (daysRemaining === 0) {

            countdownText = "Today is your exam!";
            statusText = "Today";
            statusClass = "today";

        } else if (daysRemaining === 1) {

            countdownText = "1 day remaining";
            statusText = "Upcoming";
            statusClass = "upcoming";

        } else {

            countdownText = daysRemaining + " days remaining";
            statusText = "Upcoming";
            statusClass = "upcoming";
        }

        const formattedDate = new Date(exam.date + "T00:00:00")
            .toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });

        const completeButtonText =
            status === "completed" ? "Undo Completed" : "Mark Completed";

        return `
            <div class="exam-card">

                <div class="exam-card-header">
                    <span class="exam-status ${statusClass}">
                        ${statusText}
                    </span>
                </div>

                <h3>${escapeHTML(exam.name)}</h3>

                <p class="exam-subject">
                    ${escapeHTML(exam.subject)}
                </p>

                <p class="exam-date">
                    Exam Date: ${escapeHTML(formattedDate)}
                </p>

                <div class="exam-countdown">
                    ${escapeHTML(countdownText)}
                </div>

                <div class="exam-actions">

                    <button type="button"
                        data-action="edit-exam"
                        data-id="${escapeHTML(exam.id)}">
                        Edit
                    </button>

                    <button type="button"
                        data-action="complete-exam"
                        data-id="${escapeHTML(exam.id)}">
                        ${completeButtonText}
                    </button>

                    <button type="button"
                        data-action="delete-exam"
                        data-id="${escapeHTML(exam.id)}">
                        Delete
                    </button>

                </div>
            </div>
        `;
    }).join("");
}


searchExam.addEventListener("input", renderExams);
filterExam.addEventListener("change", renderExams);


examGrid.addEventListener("click", function (event) {

    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const examId = button.dataset.id;
    const action = button.dataset.action;

    const exam = exams.find(item =>
        item.id === examId
    );

    if (!exam) return;

    if (action === "edit-exam") {

        editingExamId = exam.id;

        examName.value = exam.name;
        updateExamSubjectDropdown(exam.subject);
        examDate.value = exam.date;

        document.getElementById("examFormTitle").textContent =
            "Edit Exam";

        document.getElementById("saveExamButton").textContent =
            "Update Exam";

        examForm.style.display = "block";
        examName.focus();
    }

    if (action === "complete-exam") {

        exam.status =
            exam.status === "completed" ? "upcoming" : "completed";

        saveExams();
        renderExams();
    }

    if (action === "delete-exam") {

        const deletedExam = { ...exam };

exams = exams.filter(item => item.id !== examId);

saveExams();
renderExams();

showUndoMessage("Exam deleted successfully!", function () {

    exams.push(deletedExam);

    saveExams();
    renderExams();

});
    }
});


// ==========================================
// 23. ANALYTICS
// ==========================================

function renderAnalytics() {

    const total = tasks.length;

    const completed = tasks.filter(task =>
        task.status === "completed"
    ).length;

    const remaining = total - completed;

    const rate = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    // Summary cards
    analyticsTotal.textContent = total;
    analyticsCompleted.textContent = completed;
    analyticsRemaining.textContent = remaining;
    analyticsRate.textContent = rate + "%";

    // Completion progress bar
    completionProgress.style.width = rate + "%";

    completionCaption.textContent =
        completed + " out of " + total +
        " tasks completed (" + rate + "%).";


    // Subject-wise statistics
    if (subjects.length === 0) {

        subjectAnalytics.innerHTML = `
            <p class="analytics-empty">
                No subjects added yet.
            </p>
        `;

    } else {

        subjectAnalytics.innerHTML = subjects.map(subject => {

            const subjectTasks = tasks.filter(task =>
                task.subject === subject.name
            );

            const subjectCompleted = subjectTasks.filter(task =>
                task.status === "completed"
            ).length;

            const subjectTotal = subjectTasks.length;

            const subjectRate = subjectTotal === 0
                ? 0
                : Math.round((subjectCompleted / subjectTotal) * 100);

            return `
                <div class="analytics-row">

                    <div class="analytics-row-info">
                        <strong>${escapeHTML(subject.name)}</strong>
                        <span>
                            ${subjectCompleted} / ${subjectTotal} completed
                        </span>
                    </div>

                    <div class="analytics-bar-track">
                        <div class="analytics-bar-fill"
                            style="width: ${subjectRate}%">
                        </div>
                    </div>

                    <span class="analytics-percentage">
                        ${subjectRate}%
                    </span>

                </div>
            `;
        }).join("");
    }


   
    // Task status pie chart

    const overdueCount = tasks.filter(task =>
        isOverdue(task)
    ).length;

    const pendingCount = tasks.filter(task =>
        task.status !== "completed" && !isOverdue(task)
    ).length;

    const statusTotal = completed + pendingCount + overdueCount;

    let completedPercent = 0;
    let pendingPercent = 0;

    if (statusTotal > 0) {
        completedPercent = (completed / statusTotal) * 100;
        pendingPercent = (pendingCount / statusTotal) * 100;
    }

    const pendingEnd = completedPercent + pendingPercent;

    const pieBackground = statusTotal === 0
        ? "#E5EAF2"
        : `conic-gradient(
            #2EAD75 0% ${completedPercent}%,
            #3978C8 ${completedPercent}% ${pendingEnd}%,
            #E85B9B ${pendingEnd}% 100%
        )`;

    statusAnalytics.innerHTML = `
        <div class="status-chart-container">

            <div class="status-pie-chart"
                style="background: ${pieBackground};">
            </div>

            <div class="status-chart-legend">

                <div class="status-legend-item">
                    <span class="legend-color completed-color"></span>
                    <span>Completed</span>
                    <strong>${completed}</strong>
                </div>

                <div class="status-legend-item">
                    <span class="legend-color pending-color"></span>
                    <span>Pending</span>
                    <strong>${pendingCount}</strong>
                </div>

                <div class="status-legend-item">
                    <span class="legend-color overdue-color"></span>
                    <span>Overdue</span>
                    <strong>${overdueCount}</strong>
                </div>

                <div class="status-total">
                    Total Tasks: ${statusTotal}
                </div>

            </div>
        </div>
    `;



    // Weekly deadline statistics
    renderWeeklyAnalytics();
}


// ==========================================
// 24. WEEKLY DEADLINE CHART
// ==========================================

function renderWeeklyAnalytics() {

    const days = [
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
    ];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find the Saturday of the current week
    const daysSinceSaturday = (today.getDay() + 1) % 7;

    const saturday = new Date(today);
    saturday.setDate(today.getDate() - daysSinceSaturday);

    const weeklyCounts = [];

    days.forEach((day, index) => {

        const currentDate = new Date(saturday);
        currentDate.setDate(saturday.getDate() + index);

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const date = String(currentDate.getDate()).padStart(2, "0");

        const dateString = `${year}-${month}-${date}`;

        const count = tasks.filter(task =>
            task.deadline === dateString
        ).length;

        weeklyCounts.push({
            day: day,
            count: count
        });
    });

    const maximum = Math.max(
        ...weeklyCounts.map(item => item.count),
        1
    );

    weeklyAnalytics.innerHTML = weeklyCounts.map(item => {

        const height = item.count === 0
            ? 0
            : Math.max((item.count / maximum) * 100, 8);

        return `
            <div class="weekly-bar-item">

                <strong>${item.count}</strong>

                <div class="weekly-bar">
                    <div style="height: ${height}%"></div>
                </div>

                <span>${item.day.substring(0, 3)}</span>

            </div>
        `;
    }).join("");
}


// ==========================================
// 25. NAVIGATION BUTTON EVENTS
// ==========================================

navDashboard.addEventListener("click", function (event) {
    event.preventDefault();
    showDashboard();
});

navTasks.addEventListener("click", function (event) {
    event.preventDefault();
    showTasks();
});

navSubjects.addEventListener("click", function (event) {
    event.preventDefault();
    showSubjects();
});

navStudyPlanner.addEventListener("click", function (event) {
    event.preventDefault();
    showStudyPlanner();
});

navCalendar.addEventListener("click", function (event) {
    event.preventDefault();
    showCalendar();
});

navExams.addEventListener("click", function (event) {
    event.preventDefault();
    showExams();
});

navAnalytics.addEventListener("click", function (event) {
    event.preventDefault();
    showAnalytics();
});

navSettings.addEventListener("click", function (event) {
    event.preventDefault();
    showSettings();
});


// ==========================================
// 26. START APPLICATION
// ==========================================

updateSubjectDropdown();
updateSessionSubjectDropdown();
updateExamSubjectDropdown();

updateStatistics();

displayTasks();
renderSubjects();
renderStudySessions();
renderCalendar();
renderExams();
renderAnalytics();

showDashboard();

console.log("Study Mate started successfully!");

// ==========================================
// STUDENT PROFILE - SAVE AND DISPLAY NAME
// ==========================================

const studentProfileForm = document.getElementById("studentProfileForm");
const studentNameInput = document.getElementById("studentNameInput");
const profileSaveMessage = document.getElementById("profileSaveMessage");
const dashboardWelcome = document.getElementById("dashboardWelcome");

function updateStudentNameDisplay() {

    const savedName = localStorage.getItem("studyMateStudentName") || "";

    const displayName = savedName.trim() || "Student";

    document.querySelectorAll(".student-name-display").forEach(element => {
        element.textContent = displayName;
    });

    if (dashboardWelcome) {
        dashboardWelcome.textContent = savedName.trim()
            ? `Assalamualaikum , ${displayName}! Here's your academic overview.`
            : "Assalamualaikum , Here's your academic overview.";
    }

    if (studentNameInput) {
        studentNameInput.value = savedName;
    }
}

if (studentProfileForm) {

    studentProfileForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = studentNameInput.value.trim();

        if (!name) {
            showAppPopup("warning", "Assalamualaikum\n Please enter your name.");
            return;
        }

        localStorage.setItem("studyMateStudentName", name);

        updateStudentNameDisplay();

        profileSaveMessage.textContent = "Your name has been saved successfully!";

    });
}

// Load saved student name when Study Mate starts
updateStudentNameDisplay();

/* =====================================
   CUSTOM WINDOW CONTROLS
===================================== */

const minimizeWindowButton = document.getElementById("minimizeWindow");
const maximizeWindowButton = document.getElementById("maximizeWindow");
const closeWindowButton = document.getElementById("closeWindow");

if (window.studyMateWindow) {

    minimizeWindowButton.addEventListener("click", () => {
        window.studyMateWindow.minimize();
    });

    maximizeWindowButton.addEventListener("click", () => {
        window.studyMateWindow.maximize();
    });

    closeWindowButton.addEventListener("click", () => {
        window.studyMateWindow.close();
    });

    window.studyMateWindow.onMaximizeChange((isMaximized) => {
        maximizeWindowButton.innerHTML = isMaximized
            ? "&#9633;"
            : "&#9633;";

        maximizeWindowButton.title = isMaximized
            ? "Restore"
            : "Maximize";
    });
}
// ==========================================
// USER-FRIENDLY IMPROVEMENTS
// ==========================================


// 1. QUICK ACTIONS
document.getElementById("quickAddTask")?.addEventListener("click", () => {
    showTasks();
    addTaskButton.click();
});

document.getElementById("quickAddSubject")?.addEventListener("click", () => {
    showSubjects();
    addSubjectButton.click();
});

document.getElementById("quickAddSession")?.addEventListener("click", () => {
    showStudyPlanner();
    addSessionButton.click();
});


// 2. FIRST-TIME WELCOME SCREEN
const welcomeScreen = document.getElementById("welcomeScreen");
const welcomeNameInput = document.getElementById("welcomeNameInput");
const startStudyMate = document.getElementById("startStudyMate");

if (!localStorage.getItem("studyMateWelcomeSeen") && welcomeScreen) {
    welcomeScreen.style.display = "flex";
}

startStudyMate?.addEventListener("click", () => {
    const name = welcomeNameInput.value.trim();

    if (!name) {
        showAppPopup("warning", "Please enter your name to continue.");
        welcomeNameInput.focus();
        return;
    }

    localStorage.setItem("studyMateStudentName", name);
    localStorage.setItem("studyMateWelcomeSeen", "true");

    updateStudentNameDisplay();

    welcomeScreen.style.display = "none";
});


// ==========================================
// 3. UNDO DELETE SYSTEM
// ==========================================

function showUndoMessage(message, undoFunction) {

    let toast = document.getElementById("undoToast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "undoToast";
        toast.className = "undo-toast";
        document.body.appendChild(toast);
    }

    toast.innerHTML = `
        <span>${escapeHTML(message)}</span>
        <button type="button" id="undoDeleteButton">Undo</button>
    `;

    toast.style.display = "flex";

    const undoButton = document.getElementById("undoDeleteButton");

    undoButton.addEventListener("click", () => {
        undoFunction();
        toast.style.display = "none";
    });

    clearTimeout(window.undoToastTimer);

    window.undoToastTimer = setTimeout(() => {
        toast.style.display = "none";
    }, 6000);
}
// =====================================
// STUDY MATE - GLASS POPUP SYSTEM
// =====================================

function showAppPopup(type, message) {

    const popup = document.createElement("div");

    popup.className = `app-popup ${type}`;

    const icons = {
        success: "✓",
        delete: "✕",
        warning: "!",
        confirm: "?"
    };

    const titles = {
        success: "Success",
        delete: "Deleted",
        warning: "Warning",
        confirm: "Confirmation"
    };

    const icon = icons[type] || "!";
    const title = titles[type] || "Notification";

    popup.innerHTML = `
        <div class="popup-icon">${icon}</div>

        <div class="popup-content">
            <strong>${title}</strong>
            <p></p>
        </div>

        <button class="popup-close" type="button">&times;</button>
    `;

    popup.querySelector(".popup-content p").textContent = message;

    document.body.appendChild(popup);

    popup.querySelector(".popup-close").addEventListener("click", () => {
        popup.remove();
    });

    setTimeout(() => {
        popup.classList.add("popup-hide");

        setTimeout(() => popup.remove(), 300);

    }, 3500);
}

// =====================================
// STUDY MATE - GLASS CONFIRMATION POPUP
// =====================================

function showAppConfirm(message) {

    return new Promise(resolve => {

        const overlay = document.createElement("div");
        overlay.className = "app-confirm-overlay";

        overlay.innerHTML = `
            <div class="app-confirm-box">

                <div class="confirm-icon">?</div>

                <h3>Confirmation</h3>

                <p class="confirm-message"></p>

                <div class="confirm-buttons">
                    <button class="confirm-no" type="button">No</button>
                    <button class="confirm-yes" type="button">Yes, Continue</button>
                </div>

            </div>
        `;

        overlay.querySelector(".confirm-message").textContent = message;

        document.body.appendChild(overlay);

        const closePopup = (answer) => {
            overlay.remove();
            resolve(answer);
        };

        overlay.querySelector(".confirm-no").addEventListener("click", () => {
            closePopup(false);
        });

        overlay.querySelector(".confirm-yes").addEventListener("click", () => {
            closePopup(true);
        });

        overlay.addEventListener("click", event => {
            if (event.target === overlay) {
                closePopup(false);
            }
        });

    });
}
