# Smart Leads Dashboard

A full-stack Lead Management Dashboard built with the MERN stack and TypeScript. Designed for sales teams to efficiently track, filter, and manage potential customers.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, TailwindCSS, React Router v6, TanStack Query v5, Zustand, Axios |
| Backend | Node.js 20, Express.js, TypeScript |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcrypt |
| Tooling | Vite, tsx, ESLint, Prettier, Docker |

---

## Features

- **JWT Authentication** — Register, Login, Protected Routes, bcrypt password hashing
- **Lead CRUD** — Create, Read, Update, Delete leads with full ownership control
- **Advanced Filtering** — Filter by Status, Source, search by Name/Email, sort by date
- **Multi-filter support** — All filters compose together in a single API call
- **Backend Pagination** — 10 records per page using skip/limit, pagination metadata in response
- **Debounced Search** — 400ms debounce to avoid excessive API calls
- **CSV Export** — Export current filtered view as downloadable CSV
- **Role-Based Access Control** — Admin sees all leads; Sales users see only their own
- **Docker Setup** — docker-compose for mongo + server + client
- **Responsive UI** — Works on mobile, tablet, and desktop

---

## Project Structure

```
smart-leads-dashboard/
├── docker-compose.yml
├── .env.example
├── server/                    # Express + TypeScript API
│   └── src/
│       ├── config/            # DB connection
│       ├── controllers/       # Route handlers
│       ├── middleware/        # Auth, RBAC, error handler
│       ├── models/            # Mongoose schemas
│       ├── routes/            # Express routers
│       ├── services/          # Business logic
│       ├── types/             # Shared TS interfaces & enums
│       ├── utils/             # JWT, response helpers, CSV export
│       └── validators/        # express-validator chains
└── client/                    # React + TypeScript frontend
    └── src/
        ├── api/               # Axios calls
        ├── components/        # Reusable UI + feature components
        ├── hooks/             # Custom React hooks
        ├── pages/             # Route-level pages
        ├── store/             # Zustand auth store
        └── types/             # Shared TS types
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB (local or Atlas)
- Docker + Docker Compose (optional)

### Without Docker

**Backend**
```bash
cd server
cp ../.env.example .env      # fill in your values
npm install
npm run dev
```

**Frontend**
```bash
cd client
cp .env.example .env
npm install
npm run dev
```

### With Docker

```bash
cp .env.example .env         # fill in values
docker-compose up --build
```

- API: http://localhost:5000
- Client: http://localhost:3000
- MongoDB: localhost:27017

---

## Environment Variables

### Root `.env`

```env
MONGO_URI=mongodb://mongo:27017/smart-leads
JWT_SECRET=your_super_secret_key_change_in_production
PORT=5000
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

### `client/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

---

## API Reference

### Auth

| Method | Endpoint | Body | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | `{ name, email, password, role }` | ❌ |
| POST | `/api/auth/login` | `{ email, password }` | ❌ |

### Leads

| Method | Endpoint | Query Params | Auth | Role |
|---|---|---|---|---|
| GET | `/api/leads` | `status, source, search, sort, page, limit` | ✅ | Admin, Sales |
| POST | `/api/leads` | — | ✅ | Admin, Sales |
| GET | `/api/leads/export` | same as GET leads | ✅ | Admin, Sales |
| GET | `/api/leads/:id` | — | ✅ | Admin, Sales |
| PUT | `/api/leads/:id` | `{ name?, email?, status?, source? }` | ✅ | Admin, Sales (own) |
| DELETE | `/api/leads/:id` | — | ✅ | Admin only |

### Response Format

```json
{
  "success": true,
  "message": "Success",
  "data": { ... }
}
```

Paginated:
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "data": [...],
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

---

## Scripts

### Server

```bash
npm run dev       # Development with hot-reload (tsx watch)
npm run build     # Compile TypeScript → dist/
npm run start     # Run compiled build
npm run lint      # ESLint check
```

### Client

```bash
npm run dev       # Vite dev server
npm run build     # Production build → dist/
npm run preview   # Preview production build
npm run lint      # ESLint check
```

---

## Role-Based Access

| Action | Admin | Sales |
|---|---|---|
| View all leads | ✅ | ❌ (own only) |
| Create lead | ✅ | ✅ |
| Edit own lead | ✅ | ✅ |
| Edit others' leads | ✅ | ❌ |
| Delete lead | ✅ | ❌ |
| Export CSV | ✅ | ✅ (own only) |
