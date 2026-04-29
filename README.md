# Real-time Messenger Application

A full-stack real-time messaging application built with React, Node.js, Express, MongoDB, and Socket.io. This application allows users to sign up, log in, manage contacts, and chat with friends in real-time.

## 🚀 Features

- **Real-time Messaging**: Instant message delivery using Socket.io.
- **User Authentication**: Secure signup and login using JWT (JSON Web Tokens) and Bcrypt for password hashing.
- **Contact Management**: Search and save contacts to your chat list.
- **Message History**: Persistent chat history stored in MongoDB.
- **Online Status**: Real-time tracking of online users.
- **Responsive UI**: A modern, clean interface built with React.
- **Docker Support**: Containerized for easy deployment using Docker and Docker Compose.

## 🏗️ Cloud Architecture

The application is architected for scalability and reliability on **AWS**, utilizing a modern CI/CD pipeline and container orchestration.

### AWS Deployment Strategy
- **Compute (EC2)**: The application is hosted on an **AWS EC2** instance (Ubuntu).
- **Containerization**: Both frontend and backend are containerized using **Docker**, ensuring consistency across environments.
- **Orchestration**: **Docker Compose** manages the multi-container setup (Frontend, Backend, and MongoDB) on the EC2 instance.
- **Networking**: 
    - Port `3000`: Frontend (React)
    - Port `5000`: Backend API (Express)
    - Port `8080`: MongoDB (Internal mapping to 27017)

### CI/CD Pipeline (GitHub Actions)
- **Continuous Integration (CI)**: Automatically triggers on every push to validate code quality.
- **Continuous Deployment (CD)**: 
    - On every push to the `main` branch, a GitHub Action workflow automatically deploys the latest changes to the AWS EC2 instance via **SSH**.
    - The deployment process includes:
        1. Pulling the latest code from the repository.
        2. Shutting down existing containers.
        3. Rebuilding images with fresh code.
        4. Restarting the services in detached mode.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js
- **Routing**: React Router
- **State Management**: React Hooks
- **Styling**: CSS Modules / Vanilla CSS
- **Communication**: Axios (REST), Socket.io-client (Real-time)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Real-time**: Socket.io
- **Security**: JWT, Bcrypt
- **Testing**: Jest, Supertest

## 📂 Project Structure

```text
Messenger/
├── messenger-frontend/     # React frontend application
│   ├── src/
│   │   ├── components/     # UI Components (Login, Signup, Inbox, etc.)
│   │   └── App.js          # Main application & routing
│   └── public/             # Static assets
├── messenger-backend/      # Node.js/Express backend API
│   ├── controller/         # API business logic
│   ├── model/              # MongoDB schemas
│   ├── routes/             # API endpoint definitions
│   ├── Server.js           # Socket.io initialization & Entry point
│   └── app.js              # Express app configuration
├── docker-compose.yml      # Docker orchestration
└── README.md               # Project documentation
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Docker (Optional, for containerized setup)

### Local Development

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Messenger
   ```

2. **Backend Setup**:
   ```bash
   cd messenger-backend
   npm install
   ```
   Create a `.env` file in `messenger-backend/` and add:
   ```env
   PORT=5000
   CONNECTION_STRING=mongodb://localhost:27017/messenger-app
   ACCESS_TOKEN_SECRET=your_secret_key
   ```
   Start the backend:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**:
   ```bash
   cd ../messenger-frontend
   npm install
   ```
   Start the frontend:
   ```bash
   npm start
   ```

### Docker Setup

To run the entire stack using Docker:
```bash
docker-compose up --build
```

## 🧪 Running Tests

To run backend tests:
```bash
cd messenger-backend
npm test
```

---

Built with ❤️ by Raguram
