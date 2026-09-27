# Social Media Dashboard

A full-stack MERN social media dashboard with JWT authentication, real-time chat, follow system, and live analytics.

## Features
- **Authentication** — JWT-based register/login with protected routes
- **Posts** — Create, edit, delete, like, and comment on posts
- **Follow System** — Follow/unfollow other users
- **Real-time Chat** — Live messaging using Socket.IO, persisted in MongoDB
- **Analytics Dashboard** — Live stats (users, posts, likes) with bar chart visualization
- **Notifications** — Redis-powered notifications on likes/comments
- **Responsive UI** — Built with Tailwind CSS

## Tech Stack
**Frontend:** React.js, React Router, Tailwind CSS, Axios, Socket.IO Client, Recharts
**Backend:** Node.js, Express.js, MongoDB (Mongoose), Socket.IO, Redis, JWT, bcrypt

## Project Structure

social-media-dashboard/
├── backend/
│ ├── models/ # User, Post, Message schemas
│ ├── routes/ # auth, post, user, analytics routes
│ ├── middleware/ # JWT auth middleware
│ ├── redis/ # Redis notification logic
│ └── server.js
└── frontend/
└── src/
├── pages/ # Login, Register, Feed, Chat, Analytics, Users
├── components/ # Navbar
└── api.js # Axios instance with auth interceptor


## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- Redis (or [Memurai](https://www.memurai.com/) for Windows)

### Backend
```bash
cd backend
npm install
```

Create 

`.env` file in `backend/`:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key


Run the server:
```bash
node server.js
```

### Frontend
```bash
cd frontend
npm install
npm start
```

App will run on `http://localhost:3000` (or next available port).

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login, returns JWT | No |
| GET | `/api/posts` | Get all posts | No |
| POST | `/api/posts` | Create a post | Yes |
| PUT | `/api/posts/:id` | Edit own post | Yes |
| DELETE | `/api/posts/:id` | Delete own post | Yes |
| PUT | `/api/posts/like/:id` | Like a post | Yes |
| PUT | `/api/posts/comment/:id` | Comment on a post | Yes |
| GET | `/api/users/all` | Get all users | Yes |
| PUT | `/api/users/follow/:id` | Follow a user | Yes |
| PUT | `/api/users/unfollow/:id` | Unfollow a user | Yes |
| GET | `/api/analytics` | Get platform stats | Yes |


## Live Demo
- Frontend: https://social-media-dashboard-pearl-six.vercel.app/
- Backend API: https://social-media-dashboard-9d8n.onrender.com

## Author
**Vartika Tiwari**
[GitHub](https://github.com/VartikaTiwari17) | [LinkedIn](https://linkedin.com/in/vartika-tiwari-a59504291)
