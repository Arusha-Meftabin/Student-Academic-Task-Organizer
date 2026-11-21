Study Mate

Your Academic Life, Organized in One Place

Study Mate is a Windows desktop application created to help students handle their everyday academic responsibilities in a more organized way. From tracking assignments to planning study sessions and keeping examination dates in view, the application brings useful academic tools together in one workspace.

Instead of managing different academic activities separately, students can use Study Mate to keep their study-related information organized and accessible.

Why Study Mate?

Managing academic responsibilities can become difficult when assignments, project submissions, examinations, and regular study activities all have different deadlines.

Study Mate was developed with the idea of making these responsibilities easier to handle. It gives students a dedicated place to record their tasks, arrange their study time, and observe their academic progress.

The main goal is to make academic organization simple and convenient.

What Can You Do With It?

Study Mate includes several tools for different parts of a student's academic routine.

Tool

What it helps with

Task Manager

Record assignments, projects, and other academic work

Study Planner

Arrange study activities across the week

Subject Organizer

Keep academic work grouped by subject

Priority Control

Identify which tasks need attention first

Exam Countdown

Check how much time remains before an examination

Academic Calendar

View tasks and important dates in calendar form

Progress Analytics

Review productivity and task completion

Daily Study Tracker

Keep records of study sessions

Deadline Alerts

Notice tasks that have passed their deadlines

Backup and Restore

Save and recover application data

A Look at the Technology

The application is built with web technologies and packaged as a desktop program using Electron.js.

Development tools

HTML5 — builds the application interface.

CSS3 — controls the visual appearance and layout.

JavaScript — manages the application's operations.

Electron.js — provides the Windows desktop environment.

Local Storage — keeps information saved on the user's computer.

GitHub — hosts the source code and tracks project changes.

How the Application Works

Study Mate is organized around three main parts:

Interface: Students interact with the application through its pages, controls, and dashboard.

Functionality: JavaScript processes user actions, updates tasks, manages study information, and calculates progress.

Data saving: Local storage keeps the application's information available between sessions.

The application does not require a separate database server.

Inside the Project

The source code is separated into different files and folders to make the project easier to maintain.

Student-Academic-Task-Organizer/
│
├── css/             # Styles and interface design
├── js/              # Application functionality
│
├── index.html       # Main application page
├── main.js          # Electron main process
├── preload.js       # Secure communication bridge
├── icon.ico         # Application icon
│
├── package.json     # Project configuration
├── package-lock.json
├── .gitignore
└── README.md        # Project documentation

Application Preview

Screenshots of the application will be placed here to demonstrate its interface and the different tools available in Study Mate.

Dashboard and feature screenshots will be added as the project documentation is completed.

Getting Started

You can run the project locally on a Windows computer.

What you need:

Windows 10 or Windows 11

Node.js and npm

Follow these steps:

1. Download the source code

git clone https://github.com/Arusha-Meftabin/Student-Academic-Task-Organizer.git

2. Enter the project directory

cd Student-Academic-Task-Organizer

3. Install dependencies

npm install

4. Launch Study Mate

npm start

Creating a Windows Installer

To package the application for Windows, execute:

npm run build

The generated build files will be available in the dist directory.

Design Approach

Study Mate focuses on a clear interface and practical academic tools. Its design uses a combination of deep blue, light pink, light green, white, and black to create a distinctive visual identity.

The project also emphasizes local data handling, allowing students to use its main features without connecting to an external database.

Possible Future Improvements

Additional study-planning options.

More detailed productivity reports.

Improved calendar functionality.

Additional customization options.

Further improvements to the user experience.

About This Project

Name: Study Mate
Category: Student Academic Management
Application Type: Windows Desktop Application
Version: 1.0.0
Developer: Arusha Meftabin
Built With: Electron.js, HTML, CSS, and JavaScript
