<div align="center">

# 🚗 Rydo — Ride Booking App

**A full-stack, real-time ride-booking platform built for safety, simplicity, and speed.**

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-In--Memory-47A248?logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue)

</div>

---

## 📑 Table of Contents

1. [Project Overview](#-project-overview)
2. [Features](#-features)
3. [Tech Stack](#-tech-stack)
4. [Architecture Diagram](#-architecture-diagram)
5. [Database Schema](#-database-schema)
6. [User Flow Diagram](#-user-flow-diagram)
7. [Booking Flow Diagram](#-booking-flow-diagram)
8. [Admin Flow Diagram](#-admin-flow-diagram)
9. [Driver Flow Diagram](#-driver-flow-diagram)
10. [API Reference](#-api-reference)
11. [Project Structure](#-project-structure)
12. [Getting Started](#-getting-started)
13. [Environment Variables](#-environment-variables)
14. [Pages & Routes](#-pages--routes)
15. [Future Roadmap](#-future-roadmap)

---

## 🎯 Project Overview

**Rydo** is a full-stack ride-booking web application that simulates a modern cab-hailing service. It covers the complete lifecycle of a ride — from user registration, fare estimation, and booking, through to real-time tracking, safety OTP verification, and an admin/driver portal.

The project is structured as a **monorepo** with a separate `backend` (Node.js/Express REST API) and `frontend` (React/Vite SPA), connected via a Vite dev proxy.

> **Key highlight:** No external database setup required — uses an in-memory MongoDB instance (`mongodb-memory-server`) for zero-configuration local development.

---

## ✨ Features

### 👤 User Features
| Feature | Description |
|---------|-------------|
| 🔐 Authentication | JWT-based register & login |
| 🗺️ Ride Booking | Pickup/dropoff, ride type (Standard/Premium/Carpool), trip mode |
| 💰 Fare Estimation | Live fare estimate based on distance & ride type |
| 💳 Payment Gateway | Mock card payment checkout UI |
| 📍 Ride Tracking | Live status updates + interactive Leaflet map |
| 🔢 Safety OTP | 4-digit OTP generated per booking for driver verification |
| 🆘 Emergency Alerts | Auto-notify emergency contact on ride start |
| 👤 Profile Management | Update name, phone, emergency contact settings |

### 🛡️ Admin Features
| Feature | Description |
|---------|-------------|
| 📊 Stats Dashboard | Total users, drivers, bookings, active rides |
| 📈 Revenue Chart | Interactive 7-day revenue bar chart (Recharts) |
| 📋 All Bookings | Paginated table of all rides with user, status & driver |

### 🚘 Driver Features
| Feature | Description |
|---------|-------------|
| 🔔 Pending Rides | Real-time list of rides with status `Searching` |
| ✅ Accept Ride | One-click ride acceptance, updates booking & driver status |
| 🔄 Auto-Refresh | Polls every 5 seconds for new ride requests |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.x | UI library |
| Vite | 8.x | Build tool & dev server |
| React Router DOM | 7.x | Client-side routing |
| Axios | 1.x | HTTP client |
| Leaflet + React-Leaflet | 1.9 / 5.0 | Interactive map |
| Recharts | 3.x | Revenue bar charts |
| Lucide React | Latest | Icon library |
| Inter (Google Fonts) | — | Typography |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 18+ | Runtime |
| Express | 5.x | Web framework |
| Mongoose | 9.x | MongoDB ODM |
| mongodb-memory-server | 11.x | In-memory DB (dev) |
| JSON Web Token (jsonwebtoken) | 9.x | Auth tokens |
| bcryptjs | 3.x | Password hashing |
| Nodemailer | 9.x | Email notification service |
| dotenv | 17.x | Environment variables |

---

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              RYDO APPLICATION                                │
└─────────────────────────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────┐
  │         FRONTEND (React + Vite)      │  http://localhost:5173
  │  ─────────────────────────────────  │
  │                                      │
  │   ┌──────────┐   ┌───────────────┐  │
  │   │  Router  │   │ AuthContext   │  │
  │   │ (React   │   │ (JWT + local  │  │
  │   │  Router) │   │  storage)     │  │
  │   └────┬─────┘   └───────┬───────┘  │
  │        │                 │           │
  │   ┌────▼─────────────────▼───────┐  │
  │   │           PAGES              │  │
  │   │  Login  Signup  Dashboard    │  │
  │   │  Book   Track   Profile      │  │
  │   │  Admin  Driver  Checkout     │  │
  │   └──────────────┬───────────────┘  │
  │                  │ Axios HTTP        │
  └──────────────────┼──────────────────┘
                     │
          ┌──────────▼──────────┐
          │    VITE DEV PROXY   │
          │  /auth  → :5000/api │
          │  /ride  → :5000/api │
          │  /admin → :5000/api │
          │  /driver→ :5000/api │
          └──────────┬──────────┘
                     │
  ┌──────────────────▼──────────────────┐
  │         BACKEND (Express)            │  http://localhost:5000
  │  ─────────────────────────────────  │
  │                                      │
  │   ┌─────────────────────────────┐   │
  │   │         MIDDLEWARE           │   │
  │   │  CORS │ JSON Parser │ Auth  │   │
  │   └──────────────┬──────────────┘   │
  │                  │                   │
  │   ┌──────────────▼──────────────┐   │
  │   │           ROUTES             │   │
  │   │  /api/auth    /api/ride      │   │
  │   │  /api/profile /api/admin     │   │
  │   │  /api/driver                 │   │
  │   └──────────────┬──────────────┘   │
  │                  │                   │
  │   ┌──────────────▼──────────────┐   │
  │   │         CONTROLLERS          │   │
  │   │  authCtrl    rideCtrl        │   │
  │   │  profileCtrl adminCtrl       │   │
  │   │  driverCtrl                  │   │
  │   └──────────────┬──────────────┘   │
  │                  │                   │
  │   ┌──────────────▼──────────────┐   │
  │   │         SERVICES             │   │
  │   │  notificationService         │   │
  │   │  (Nodemailer / mock email)   │   │
  │   └──────────────┬──────────────┘   │
  └──────────────────┼──────────────────┘
                     │
  ┌──────────────────▼──────────────────┐
  │    DATABASE (MongoDB In-Memory)      │
  │  ─────────────────────────────────  │
  │  Collections:                        │
  │  ┌──────────┐ ┌──────────────────┐  │
  │  │  users   │ │    bookings      │  │
  │  └──────────┘ └──────────────────┘  │
  │  ┌──────────┐                        │
  │  │  drivers │                        │
  │  └──────────┘                        │
  └─────────────────────────────────────┘
```

---

## 🗄️ Database Schema

```
┌───────────────────────────────────────────────────────────────────┐
│                         DATABASE SCHEMA                            │
└───────────────────────────────────────────────────────────────────┘

  ┌─────────────────────┐         ┌──────────────────────────────────┐
  │        USERS         │         │            BOOKINGS              │
  ├─────────────────────┤         ├──────────────────────────────────┤
  │ _id: ObjectId (PK)  │◄────────│ user: ObjectId (FK → users)      │
  │ name: String        │         │ driver: ObjectId (FK → drivers)  │
  │ email: String       │         │ pickup: String                   │
  │ password: String    │         │ dropoff: String                  │
  │ phone: String       │         │ rideType: String                 │
  │ emergencyContact:   │         │   (Standard / Premium / Carpool) │
  │   name: String      │         │ paymentMode: String              │
  │   email: String     │         │   (Cash / Card / UPI)            │
  │   phone: String     │         │ tripMode: String                 │
  │ emergencyAlerts:    │         │   (Now / Scheduled)              │
  │   Boolean           │         │ distance: String                 │
  │ createdAt: Date     │         │ fare: String                     │
  │ updatedAt: Date     │         │ time: String                     │
  └─────────────────────┘         │ otp: String (4-digit)            │
                                  │ status: Enum                     │
  ┌─────────────────────┐         │   Searching → Assigned →         │
  │       DRIVERS        │         │   Arriving → In Progress →       │
  ├─────────────────────┤         │   Completed / Cancelled          │
  │ _id: ObjectId (PK)  │◄────────│ createdAt: Date                  │
  │ name: String        │         │ updatedAt: Date                  │
  │ vehicle: String     │         └──────────────────────────────────┘
  │ plate: String       │
  │ phone: String       │
  │ rating: Number      │
  │ status: Enum        │
  │  (Available /       │
  │   Busy / Offline)   │
  │ createdAt: Date     │
  └─────────────────────┘
```

---

## 🔄 User Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                   USER JOURNEY FLOW                      │
└─────────────────────────────────────────────────────────┘

   START
     │
     ▼
 ┌───────┐      Not logged in       ┌──────────┐
 │  App  │ ─────────────────────► │  /login   │
 │  Load │                          │  /signup  │
 └───────┘                          └─────┬────┘
     │                                    │
     │  Logged in (JWT in localStorage)   │ Auth Success
     │◄────────────────────────────────── ┘
     │
     ▼
 ┌────────────┐
 │ /dashboard │  Personalized greeting, ride type cards,
 │            │  safety center, admin panel shortcut
 └─────┬──────┘
       │
       │ Click "Book Ride" / "Start Booking"
       ▼
 ┌────────────┐
 │   /book    │  Enter Pickup + Dropoff
 │            │  Select Ride Type (Standard/Premium/Carpool)
 │            │  Select Payment Mode (Cash/Card/UPI)
 └─────┬──────┘
       │
       │ On blur → GET /ride/estimate
       ▼
 ┌─────────────────┐
 │ Estimate Shown  │  Distance • Time • Fare (₹)
 └────────┬────────┘
          │
          │ Click "Confirm Booking"
          ▼
    ┌─────────────┐
    │ Payment Mode?│
    └──────┬──────┘
           │
     ┌─────┴──────┐
     │            │
   Card?        Cash/UPI?
     │            │
     ▼            ▼
 ┌──────────┐  ┌───────────────────┐
 │ /checkout │  │ POST /ride/book   │
 │ Mock Card │  │ Status: Searching │
 │ Form      │  └──────────┬────────┘
 └─────┬─────┘             │
       │ Pay               │
       │ POST /ride/book   │
       │                   │
       └─────────┬─────────┘
                 │
                 ▼
          ┌─────────────┐
          │  /track/:id │  Leaflet Map + OTP
          │             │  Polls every 5s
          │             │  Shows driver details
          └─────────────┘
                 │
                 │ (Driver accepts via /driver portal)
                 ▼
          Status: Assigned → Arriving → In Progress → Completed

   END
```

---

## 📦 Booking Flow Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│                     BOOKING LIFECYCLE                                 │
└──────────────────────────────────────────────────────────────────────┘

  USER                  FRONTEND               BACKEND              DATABASE
   │                       │                      │                     │
   │  Enter locations       │                      │                     │
   │─────────────────────► │                      │                     │
   │                       │ POST /ride/estimate   │                     │
   │                       │─────────────────────► │                     │
   │                       │                      │ Calculate fare       │
   │                       │◄───────────────────── │ (mock algorithm)    │
   │  See estimate          │                      │                     │
   │◄─────────────────────  │                      │                     │
   │                       │                      │                     │
   │  Click "Confirm"       │                      │                     │
   │─────────────────────► │                      │                     │
   │                       │ POST /ride/book       │                     │
   │                       │ (with JWT token)      │                     │
   │                       │─────────────────────► │                     │
   │                       │                      │ Generate OTP        │
   │                       │                      │ Create Booking      │
   │                       │                      │─────────────────── ►│
   │                       │                      │                     │ Save
   │                       │                      │◄────────────────────│
   │                       │                      │ Send emergency alert│
   │                       │                      │ (if enabled)        │
   │                       │◄───────────────────── │                     │
   │  Redirect /track       │                      │                     │
   │◄─────────────────────  │                      │                     │
   │                       │                      │                     │
   │                       │ GET /ride/:id (poll)  │                     │
   │                       │─────────────────────► │                     │
   │                       │                      │─────────────────── ►│
   │                       │                      │◄────────────────────│
   │                       │◄───────────────────── │                     │
   │  See live status       │                      │                     │
   │◄─────────────────────  │                      │                     │
```

---

## 🛡️ Admin Flow Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│                       ADMIN PORTAL FLOW                               │
└──────────────────────────────────────────────────────────────────────┘

  ADMIN USER             FRONTEND (/admin)         BACKEND              DB
      │                       │                       │                  │
      │  Navigate to /admin    │                       │                  │
      │─────────────────────► │                       │                  │
      │                       │                       │                  │
      │                       │ GET /admin/stats ─────►│                  │
      │                       │                       │─────────────────►│
      │                       │                       │  COUNT(users)    │
      │                       │                       │  COUNT(bookings) │
      │                       │                       │  COUNT(drivers)  │
      │                       │                       │  active rides    │
      │                       │                       │◄─────────────────│
      │                       │◄──────────────────────│                  │
      │                       │  Returns stats +       │                  │
      │                       │  mock revenueData      │                  │
      │                       │                        │                  │
      │                       │ GET /admin/bookings ──►│                  │
      │                       │                       │─────────────────►│
      │                       │                       │  find().populate  │
      │                       │                       │  (user, driver)  │
      │                       │                       │◄─────────────────│
      │                       │◄──────────────────────│                  │
      │                       │                        │                  │
      │  See Dashboard:        │                       │                  │
      │  ┌─────────────────┐  │                       │                  │
      │  │ Total Users: N  │  │                       │                  │
      │  │ Active Rides: N │  │                       │                  │
      │  │ Revenue Chart   │  │                       │                  │
      │  │ Bookings Table  │  │                       │                  │
      │  └─────────────────┘  │                       │                  │
      │◄─────────────────────  │                       │                  │
```

---

## 🚘 Driver Flow Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│                       DRIVER PORTAL FLOW                              │
└──────────────────────────────────────────────────────────────────────┘

  DRIVER USER           FRONTEND (/driver)         BACKEND              DB
      │                       │                       │                  │
      │  Navigate to /driver   │                       │                  │
      │─────────────────────► │                       │                  │
      │                       │                       │                  │
      │                       │ GET /driver/pending   │                  │
      │                       │ (polls every 5s) ────►│                  │
      │                       │                       │─────────────────►│
      │                       │                       │  find({status:   │
      │                       │                       │  'Searching'})   │
      │                       │                       │◄─────────────────│
      │                       │◄──────────────────────│                  │
      │                       │                        │                  │
      │  See available rides   │                       │                  │
      │◄─────────────────────  │                       │                  │
      │                       │                       │                  │
      │  Click "Accept Ride"   │                       │                  │
      │─────────────────────► │                       │                  │
      │                       │ POST /driver/accept   │                  │
      │                       │ { bookingId } ────────►│                  │
      │                       │                       │─────────────────►│
      │                       │                       │  Booking.status  │
      │                       │                       │  = 'Assigned'    │
      │                       │                       │  Driver.status   │
      │                       │                       │  = 'Busy'        │
      │                       │                       │◄─────────────────│
      │                       │◄──────────────────────│                  │
      │  "Ride Accepted!" ✅  │                       │                  │
      │◄─────────────────────  │                       │                  │
      │                       │                       │                  │
      │  (User's /track page   │                       │                  │
      │   now shows driver     │                       │                  │
      │   details & Assigned   │                       │                  │
      │   status via polling)  │                       │                  │
```

---

## 🔌 API Reference

### Auth Endpoints — `/api/auth`

| Method | Endpoint | Body | Auth | Description |
|--------|----------|------|------|-------------|
| `POST` | `/register` | `{ name, email, password }` | ❌ | Register new user, returns JWT |
| `POST` | `/login` | `{ email, password }` | ❌ | Login, returns JWT + user object |

### Ride Endpoints — `/api/ride`

| Method | Endpoint | Body | Auth | Description |
|--------|----------|------|------|-------------|
| `POST` | `/estimate` | `{ pickup, dropoff, rideType }` | ✅ | Returns fare estimate |
| `POST` | `/book` | `{ pickup, dropoff, rideType, paymentMode, tripMode, distance, fare, time }` | ✅ | Creates booking, generates OTP |
| `GET` | `/:id` | — | ✅ | Get booking status & driver info |

### Profile Endpoints — `/api/profile`

| Method | Endpoint | Body | Auth | Description |
|--------|----------|------|------|-------------|
| `GET` | `/` | — | ✅ | Get current user's profile |
| `PUT` | `/` | `{ name, phone, emergencyContact, emergencyAlertsEnabled }` | ✅ | Update profile & safety settings |

### Admin Endpoints — `/api/admin`

| Method | Endpoint | Body | Auth | Description |
|--------|----------|------|------|-------------|
| `GET` | `/stats` | — | ✅ | Total users, drivers, bookings, active rides + revenue chart data |
| `GET` | `/bookings` | — | ✅ | All bookings (populated with user & driver) |

### Driver Endpoints — `/api/driver`

| Method | Endpoint | Body | Auth | Description |
|--------|----------|------|------|-------------|
| `GET` | `/pending` | — | ✅ | List all rides with status `Searching` |
| `POST` | `/accept` | `{ bookingId }` | ✅ | Accept a ride (sets status to `Assigned`) |

> **Auth header:** `Authorization: Bearer <JWT_TOKEN>`

---

## 📁 Project Structure

```
rydo-app/
│
├── 📄 .gitignore
├── 📄 README.md
│
├── 📂 backend/
│   ├── 📄 server.js              # Express app entry point, DB connection
│   ├── 📄 package.json
│   ├── 📄 .env.example           # Environment variables template
│   │
│   ├── 📂 controllers/
│   │   ├── 📄 authController.js    # register, login
│   │   ├── 📄 rideController.js    # estimateFare, bookRide, getRideStatus
│   │   ├── 📄 profileController.js # getProfile, updateProfile
│   │   ├── 📄 adminController.js   # getStats, getAllBookings
│   │   └── 📄 driverController.js  # getPendingRides, acceptRide
│   │
│   ├── 📂 middleware/
│   │   └── 📄 authMiddleware.js    # JWT token verification
│   │
│   ├── 📂 models/
│   │   ├── 📄 User.js              # User schema
│   │   ├── 📄 Booking.js           # Booking schema (with OTP, status enum)
│   │   └── 📄 Driver.js            # Driver schema
│   │
│   ├── 📂 routes/
│   │   ├── 📄 authRoutes.js
│   │   ├── 📄 rideRoutes.js
│   │   ├── 📄 profileRoutes.js
│   │   ├── 📄 adminRoutes.js
│   │   └── 📄 driverRoutes.js
│   │
│   └── 📂 services/
│       └── 📄 notificationService.js  # Nodemailer emergency alerts
│
└── 📂 frontend/
    ├── 📄 vite.config.js          # Vite config + API proxy to :5000
    ├── 📄 package.json
    │
    └── 📂 src/
        ├── 📄 main.jsx             # React app entry + AuthProvider wrapper
        ├── 📄 App.jsx              # Router, routes, ProtectedRoute guard
        ├── 📄 index.css            # Global styles, design tokens, glassmorphism
        ├── 📄 App.css
        │
        ├── 📂 context/
        │   └── 📄 AuthContext.jsx  # JWT auth state, login/register/logout
        │
        ├── 📂 components/
        │   └── 📄 Navbar.jsx       # Nav with active-link highlighting
        │
        └── 📂 pages/
            ├── 📄 Login.jsx          # Login form
            ├── 📄 Signup.jsx         # Registration form
            ├── 📄 Dashboard.jsx      # Home — greeting, ride types, quick actions
            ├── 📄 RideBooking.jsx    # Booking form + fare estimate
            ├── 📄 RideTracking.jsx   # Live status + Leaflet map + OTP
            ├── 📄 Checkout.jsx       # Mock card payment gateway
            ├── 📄 Profile.jsx        # User profile & safety settings
            ├── 📄 AdminDashboard.jsx # Stats, Recharts chart, bookings table
            └── 📄 DriverDashboard.jsx # Pending rides + accept button
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [Git](https://git-scm.com/)
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/kuldeeppatil2911/rydo-app.git
cd rydo-app

# 2. Install backend dependencies
cd backend
npm install

# 3. Install frontend dependencies
cd ../frontend
npm install
```

### Running the App

You need **two terminal windows** — one for the backend and one for the frontend.

**Terminal 1 — Backend:**
```bash
cd rydo-app/backend
node server.js
# Output:
# Server running on port 5000
# MongoDB connected successfully at mongodb://127.0.0.1:XXXX/
```

**Terminal 2 — Frontend:**
```bash
cd rydo-app/frontend
npm run dev
# Output:
# VITE v8.x  ready in ~500ms
# ➜  Local:   http://localhost:5173/
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

> **No database setup required!** The backend uses `mongodb-memory-server` to spin up an in-memory MongoDB instance automatically.

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend/` directory. A template is provided at `backend/.env.example`:

```env
# backend/.env

# MongoDB URI (optional — if omitted, uses in-memory MongoDB)
MONGODB_URI=mongodb://localhost:27017/rydo

# JWT Secret (required)
JWT_SECRET=your_super_secret_jwt_key_here

# Email (for emergency alert notifications — optional)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `MONGODB_URI` | ❌ | in-memory | MongoDB connection string |
| `JWT_SECRET` | ✅ | — | Secret key for signing JWTs |
| `EMAIL_USER` | ❌ | — | Gmail address for notifications |
| `EMAIL_PASS` | ❌ | — | Gmail app password |

---

## 📄 Pages & Routes

### Frontend Routes

| URL | Page | Access | Description |
|-----|------|--------|-------------|
| `/` | Redirect | Public | Redirects to `/dashboard` |
| `/login` | Login | Public | Email/password login |
| `/signup` | Signup | Public | New account registration |
| `/dashboard` | Dashboard | 🔒 Auth | Home page with ride types & quick actions |
| `/book` | Ride Booking | 🔒 Auth | Book a new ride |
| `/checkout` | Checkout | 🔒 Auth | Mock card payment form |
| `/track/:id` | Ride Tracking | 🔒 Auth | Live ride status + map |
| `/profile` | Profile | 🔒 Auth | User info & safety settings |
| `/admin` | Admin Dashboard | 🔒 Auth | Stats, charts, bookings overview |
| `/driver` | Driver Dashboard | 🔒 Auth | Pending rides, accept requests |

---

## 🗺️ Future Roadmap

| Feature | Priority | Status |
|---------|----------|--------|
| Real GPS geocoding (OpenCage / Google Maps API) | High | 📋 Planned |
| WebSocket real-time updates (Socket.io) | High | 📋 Planned |
| Role-based access control (User / Driver / Admin) | High | 📋 Planned |
| Stripe / Razorpay real payment integration | High | 📋 Planned |
| Driver registration portal | Medium | 📋 Planned |
| Ride history page for users | Medium | 📋 Planned |
| Push notifications (PWA) | Medium | 📋 Planned |
| Star rating for drivers | Medium | 📋 Planned |
| Scheduled / advance ride booking | Low | 📋 Planned |
| Multi-language support (i18n) | Low | 📋 Planned |
| Dark/Light theme toggle | Low | 📋 Planned |

---

## 👨‍💻 Author

**Kuldeep Patil**
- GitHub: [@kuldeeppatil2911](https://github.com/kuldeeppatil2911)

---

## 📜 License

This project is licensed under the **ISC License**.

---

<div align="center">

Made with ❤️ for the Rydo project

⭐ Star this repo if you found it helpful!

</div>
