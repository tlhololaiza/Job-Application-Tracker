# JobTracker 🎯

A modern, elegant job application tracking system built with React, TypeScript, and Vite. Keep track of your job applications with a beautiful, Linear/Notion-inspired interface.

![JobTracker](https://img.shields.io/badge/React-19.1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Vite](https://img.shields.io/badge/Vite-7.1.0-purple)

## ✨ Features

- **User Authentication** - Secure registration and login system
- **Dashboard Analytics** - Track total applications, interviewed, applied, and rejected statuses
- **Job Management** - Add, edit, view, and delete job applications
- **Advanced Search** - Search by company name or role
- **Status Filtering** - Filter applications by Applied, Interviewed, or Rejected status
- **Date Sorting** - Sort applications by newest or oldest first
- **Detailed Views** - View full job details including requirements, duties, and notes
- **Toast Notifications** - Beautiful success and error notifications
- **Custom Dialogs** - Styled confirmation dialogs for actions
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **User Isolation** - Each user has their own separate job applications

## 🎨 Design System

- **Color Palette**: Navy blue (#2c3e50) and Teal (#3498db) with off-white backgrounds
- **Typography**: Space Grotesk for headings, Inter for body text
- **Components**: Custom-built Button, Text, JobCard, Toast, and ConfirmDialog components
- **UI Style**: Modern SaaS aesthetic inspired by Linear and Notion

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Job-Application-Tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the JSON server** (in a separate terminal)
   ```bash
   npx json-server --watch db.json --port 3001
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1
- **Language**: TypeScript 5.8.3
- **Build Tool**: Vite 7.1.0
- **Routing**: React Router DOM 7.8.0
- **Styling**: CSS Modules with CSS Variables
- **Backend**: JSON Server (development)
- **Linting**: ESLint 9.32.0

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Usage

### Creating an Account
1. Navigate to the Register page
2. Enter a username and password (minimum 6 characters)
3. Click "Create Account"

### Adding a Job Application
1. Log in to your account
2. Click "Add Application" button on the dashboard
3. Fill in the job details:
   - Company Name (required)
   - Role (required)
   - Status (Applied, Interviewed, Rejected)
   - Date Applied
   - Description, Requirements, Duties, etc. (optional)
4. Click "Add Job"

### Managing Applications
- **View Details**: Click "View Details" on any job card
- **Edit**: Click "Edit" on a job card to modify details
- **Delete**: Click "Delete" and confirm in the dialog
- **Search**: Use the search bar to find applications by company or role
- **Filter**: Select a status from the dropdown to filter applications
- **Sort**: Choose newest or oldest first from the sort dropdown

## 🎨 Status System

Applications can have three statuses:
- **Applied** (Blue 📝) - Initial application submitted
- **Interviewed** (Amber 💼) - Interview scheduled or completed
- **Rejected** (Red ✖) - Application unsuccessful

## 🔐 Data Storage

- User data and job applications are stored via JSON Server
- Each user's applications are isolated and secure
- Session persistence using localStorage

## 🌟 Future Enhancements

- [ ] Export applications to PDF/CSV
- [ ] Email notifications for follow-ups
- [ ] Calendar integration for interview scheduling
- [ ] Application statistics and insights
- [ ] Company research integration
- [ ] Cover letter and resume management
- [ ] Application deadline reminders

## 👨‍💻 Author

Built by Tlholo.

---

```
