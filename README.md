# LoanLink – Microloan Request & Approval Tracker System

LoanLink is a full-stack web application designed to streamline the process of microloan requests, review, approval, and management for small financial organizations, NGOs, and microloan providers.

---

## 🔗 Live Links

- **Client (Frontend):** https://mrats-client.vercel.app
- **Server (Backend):** https://mrats-server.vercel.app

---

## 📌 Project Purpose

Many microloan providers struggle to manage loan applications, approvals, and repayments in one centralized system.  
LoanLink solves this by offering a secure, role-based, and user-friendly loan management platform.

---

## 🚀 Key Features

### 🔐 Authentication & Security

- Firebase Authentication (Email/Password & Google Login)
- JWT-based authorization using HTTP-only cookies
- Protected private routes
- Role-based access control (Admin, Manager, Borrower)

### 🏠 Public Pages

- Home page with featured loans
- All Loans page with search and filter
- Loan Details page
- About Us and Contact sections
- Responsive UI (mobile, tablet, desktop)
- Dark / Light theme toggle

### 📊 Dashboard & UI

- Unified dashboard layout using React Router Outlet
- Loading spinners during data fetching
- Toast notifications for all actions
- Dynamic page titles
- Custom 404 page

### 👤 Borrower Features

- Apply for microloans
- Auto-filled loan application when coming from loan card
- Manual loan selection when accessing apply page directly
- View personal loan applications
- Cancel pending loan applications
- Pay application fee (Stripe – demo integration)

---

## 🧩 Technologies Used

### Frontend

- React (Vite)
- React Router DOM
- React Hook Form
- TanStack React Query
- Tailwind CSS
- Framer Motion
- Axios
- Firebase Authentication
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB (Atlas)
- JWT (JSON Web Token)
- Cookie Parser
- CORS
- Vercel (Serverless Deployment)

---

---working---

### 🧑‍💼 Manager Features

- Add new loan products
- Manage own loans
- View pending applications
- Approve or reject loan requests
- View approved loans

### 🛠️ Admin Features

- Manage users and roles
- Suspend users with reason
- View all loans
- Control which loans appear on Home page
- View all loan applications with filters
