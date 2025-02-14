# E-Pharmacy Backend

## Overview
This repository contains the backend code for the **E-Pharmacy** web application, built using the **MERN** stack with **Redux** for state management.
The backend is responsible for handling user authentication, managing pharmacy-related data, and ensuring secure API communication.

## Tech Stack
- **MongoDB** – NoSQL database for storing user and pharmacy data.
- **Express.js** – Web framework for handling API requests.
- **Node.js** – Backend runtime for executing JavaScript.
- **Redux** – State management (integrated with frontend).

## Features
- **Secure User Authentication & Session Management**: Built using **Node.js** and **RESTful APIs** to ensure data integrity and security.
- **Device Compatibility**: Backend designed to support frontend rendering across multiple breakpoints **(320px, 375px, 768px, 1440px)**.
- **Client-Side Validation Support**: Integrated with **React Hook Form** and third-party APIs for robust validation.

## Installation & Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/akash11-01/E-Pharma-backend.git
   cd epharmacy-backend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   Create a `.env` file and define the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   JWT_ACCESS_SECRET=your_secret_key
   JWT_REFRESH_SECRET=your_secret_key
   NODE_ENV=development
   ```
4. **Run the server:**
   ```bash
   npm run dev
   ```

## API Endpoints
| Method | Endpoint            | Description                         |
|--------|---------------------|-------------------------------------|
| POST   | `/api/auth/register` | User registration                  |
| POST   | `/api/auth/login`    | User login                         |
| GET    | `/api/products`      | Fetch available medicines          |
| POST   | `/api/orders`        | Place an order                     |

## Frontend Repository
The frontend code for this project can be found here:
[Frontend Repository](https://github.com/akash11-01/E-Pharma-frontend)

---

For contributions or issues, feel free to open a pull request or raise an issue!
