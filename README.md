# Live-Listen

Live-Listen is a real-time music streaming and collaborative listening (jamming) platform. It allows users to search for music, create and manage playlists, and join real-time listening rooms to experience music together.

## 🚀 Architecture

The project is structured into three main components:

-   **Backend:** A Node.js Express server handling core business logic, user authentication, and database interactions via Prisma.
-   **Frontend:** A modern React application built with Vite, Tailwind CSS (v4), and Radix UI components, featuring rich animations with Three.js.
-   **Websocket:** A dedicated real-time service for room management and synchronized events.

## 🛠️ Tech Stack

### **Backend**
-   **Runtime:** Node.js (v18+)
-   **Framework:** Express.js (v5)
-   **Language:** TypeScript
-   **Database:** PostgreSQL (via Prisma ORM)
-   **Caching:** Redis
-   **Authentication:** Passport.js (Google OAuth 2.0), JWT (JSON Web Tokens)
-   **Validation:** Zod

### **Frontend**
-   **Framework:** React (v19)
-   **Build Tool:** Vite
-   **Styling:** Tailwind CSS (v4), Framer Motion
-   **State Management:** Zustand
-   **UI Components:** Radix UI, Lucide Icons
-   **Visuals:** Three.js, React Three Fiber
-   **Routing:** React Router

### **Websocket**
-   **Library:** `ws`
-   **Language:** TypeScript
-   **Authentication:** JWT-based verification

## ✨ Key Features

-   **User Authentication:** Secure signup/login with JWT and Google OAuth 2.0 integration.
-   **Playlist Management:** Create, update, delete playlists and add songs to them.
-   **Song Search:** Discover music through a search interface.
-   **Real-time Jamming:** Create or join "Rooms" for collaborative listening.
-   **Responsive Design:** Optimized for both desktop and mobile devices.
-   **Modern UI:** Dark mode support and interactive visual effects.

## 📊 Database Schema

The database consists of the following core models:

-   **User:** Stores user profiles and authentication details.
-   **Playlist:** User-created collections of songs.
-   **Songs & Album:** Metadata for tracks and albums.
-   **PlaylistSongs:** A join table for many-to-many relationships between playlists and songs.
-   **Rooms:** Stores active jamming room configurations.
-   **RefreshToken:** Manages secure session persistence.

## ⚙️ Setup & Installation

### **1. Clone the repository**
```bash
git clone https://github.com/your-username/Live-Listen.git
cd Live-Listen
```

### **2. Configure Environment Variables**

Create `.env` files in each directory:

#### **Backend (`backend/.env`)**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/live_listen
PORT=3000
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

#### **Frontend (`frontend/.env`)**
```env
VITE_BACKEND_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_WEBSOCKET_URL=ws://localhost:3002
```

#### **Websocket (`websocket/.env`)**
```env
JWT_SECRET=your_jwt_secret
```

### **3. Prerequisites**

-   **PostgreSQL** installed and running.
-   **Redis** installed and running (for caching).
-   **Node.js** (v18+) and npm/pnpm.

### **4. Install Dependencies & Run**

Open three terminal windows:

**Backend:**
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Websocket:**
```bash
cd websocket
npm install
npm run dev
```

## 📜 License
This project is licensed under the [ISC License](LICENSE).
