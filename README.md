# Project Setup

This project consists of two folders: `frontend` and `backend`.

## Frontend Setup

1. Navigate to the `frontend` directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Set up the `.env` file in the `frontend` directory and add the following:
   ```env
   NEXT_PUBLIC_BASE_URL=http://localhost:5000/api
   ```

## Backend Setup

1. Navigate to the `backend` directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Set up the `.env` file in the `backend` directory and add the following:
   ```env
   PORT=5000
   DATABASE_URL=postgres database url
   JWT_SECRET=mysecret
   
