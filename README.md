# driveEASE


Dananjana:Test run successful

Achini:Test run successful

Shenuri:Test run successful

Jenifer : test run successful


 **driveEASE**

**Smart Driving School Management System**

driveEASE is a full-stack MERN application built to digitize the day-to-day operations of a driving school — student registration, instructor and vehicle management, lesson booking, payments, and admin oversight — all in one platform.

Built as the final project for ICT2022 (Full Stack Development) by Group 04



# Project Description

Driving schools typically rely on manual registers, phone calls, and spreadsheets to manage students, instructors, vehicles, and lesson schedules. driveEASE replaces this with a centralized system where:

 **Admins**- manage user accounts, approve registrations, configure system settings, and view activity logs, payments, and reports

 **Students**  - register, browse course packages, book driving lessons, track payment history, and receive notifications

 **Instructors**  - manage their availability, view assigned students, and update lesson progress

The system enforces role-based access control (Admin / Instructor / Student) with JWT authentication, so each user only sees and does what their role permits. Automated background jobs send lesson reminders, and invoices/reports can be generated as downloadable PDFs.


  # Technologies Used

**Frontend** (client/)
- React 19 (Vite)
- React Router DOM
- Axios (API calls)
- Tailwind CSS v4
- Recharts (dashboard charts and analytics)
- Lucide React (icons)

**Backend** (server/)
- Node.js
- Express 5
- Mongoose (MongoDB ODM)
- JWT (jsonwebtoken) — authentication
- bcryptjs — password hashing
- Multer — file/document uploads
- PDFKit — invoice and report PDF generation
- node-cron — scheduled background jobs (lesson reminders)

**Database**
- MongoDB Atlas (cloud-hosted)

**Testing & Tooling**
- Postman (backend manual  API tests)
- ESLint (frontend linting)

**DevOps & Collaboration**
- Git & GitHub (feature-branch workflow)
- GitHub Actions — CI pipeline that installs dependencies, checks backend syntax, and builds the frontend on every push/PR to main


# Installation Setups 

Before you start, make sure you have installed:
- [Node.js](https://nodejs.org/) (v20 recommended, to match the CI pipeline)
- [Git](https://git-scm.com/)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier works)


 1. Clone the repository
```bash
git clone https://github.com/AnjaanaJ/driveEASE.git
cd driveEASE
```

2. Set up the backend
```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder with:
```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:
```bash
npm run dev
```
The backend runs on `http://localhost:5000`.

 3. Set up the frontend
Open a new terminal window:
```bash
cd client
npm install
npm run dev
```
The frontend runs on `http://localhost:5173` (default Vite port).

 4. Create the first admin account
Public registration only creates student accounts. To bootstrap the first admin:
1. Register a normal account through the app.
2. Open your MongoDB Atlas dashboard, find that user in the `users` collection.
3. Manually edit the document: set `role` to `"admin"` and `isApproved` to `true`.
4. Log in again — you now have full admin access.

 5. Open the app
Visit `http://localhost:5173` in your browser.




# Group Members — Group 04


| Member 1 (Integration Lead) | S.J.A.Kamburugamuwa        | AS20240972 | Authentication & Administration |
| Member 2                    | H.S.B.U. Caldera           | AS20240952 | Student Management & Course/Package Management |
| Member 3                    | A.S.Jenifer                | AS20240948 | Instructor Management & Vehicle Management |
| Member 4                    | P.A.A. Thesanya            | AS20240950 | Driving Lesson Booking & Notification System |
| Member 5                    | K.W.W.W.M.C.D. Wijesooriya | AS20240967 | Payment Management, Dashboard & Analytics, Report Generation |




# Key Features
- CI pipeline via GitHub Actions validating every push/PR to `main`
- JWT authentication with role-based access control (Admin / Instructor / Student)
- Admin approval workflow for new accounts, with activity logging
- Student registration, course/package management
- Instructor availability scheduling and vehicle fleet/maintenance tracking
- Lesson booking with conflict detection (instructor + vehicle double-booking prevention)
- Automated lesson reminder notifications via scheduled background jobs
- Payment tracking with PDF invoice generation
- Role-specific dashboards with charts (revenue, vehicle usage) via Recharts
- Admin reports (student, instructor, financial) with date-range filtering and PDF export

