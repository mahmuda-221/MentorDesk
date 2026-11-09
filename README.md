# MentorDesk

## Project Overview
MentorDesk is a web-based mentoring support platform designed to help interns submit questions, receive guidance from mentors, and track the progress of their questions.

## Project Objectives
- Allow interns to submit and manage questions.
- Enable mentors to review questions and provide responses.
- Track question statuses and follow-up comments.
- Provide dashboards and search/filter functionality.

## User Roles
- **Intern:** Submit questions and track progress.
- **Mentor:** Review questions, respond, and update question status.
- **Administrator:** Proposed role, subject to supervisor approval.

## Technology Stack

- **Frontend:** React.js, JavaScript, HTML, CSS
- **Development Tool:** Vite
- **Backend (Proposed):** Node.js and Express.js
- **Database (Proposed):** PostgreSQL

## Implemented Frontend Features

- Login page UI
- Sign Up page UI
- Login and Sign Up page switching
- Basic form validation
- Intern Dashboard UI
- Dashboard summary cards
- Recent Questions section
- Logout navigation

## Current Project Status

**Phase:** Frontend Development

The authentication pages and initial Intern Dashboard have been implemented using React.js.

Currently, the application uses demonstration interactions and mock data. Backend integration and database connectivity have not yet been implemented.

## Planned Features

- Submit Question page
- My Questions page
- Question Details page
- Mentor Dashboard
- Question responses and status management
- Search and filtering
- Backend and database integration

## Project Documentation

The repository includes:
- `MentorDesk_PRD_v1.0.pdf`
- PostgreSQL Architecture Diagram
- User Flow Diagram

## Installation and Setup

1. Clone the repository.
2. Open the project folder in VS Code.
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL displayed in the terminal.

## Repository Structure

```text
MentorDesk/
├── diagrams/
├── public/
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── MentorDesk_PRD_v1.0.pdf
├── README.md
├── package.json
└── vite.config.js
```

## Project Goal

To build a user-friendly mentoring platform that improves communication between interns and mentors and makes question tracking easier.