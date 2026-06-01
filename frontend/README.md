# NeerajBazarStore 🛒

A full-stack E-Commerce web application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).

## 🚀 Features

* User Authentication (Login / Register)
* JWT Authentication & Authorization
* Product Management
* Product Search
* Add to Cart
* User Profile Management
* Profile Picture Upload using Multer
* Razorpay Payment Gateway Integration
* Flash Messages & Notifications
* Responsive UI
* Secure Backend APIs

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Multer
* Razorpay

## 📂 Project Structure

```bash
NeerajBazarStore/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── controllers/
│   ├── app.js
│   └── package.json
│
└── README.md
```

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/neerajbazarstore.git
cd neerajbazarstore
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

## 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGODB_URL=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Create a `.env` file inside the frontend folder.

```env
VITE_API_URL=http://localhost:5000
VITE_RAZORPAY_KEY=your_razorpay_key_id
```

## 💳 Payment Integration

This project uses Razorpay Payment Gateway for secure online transactions.

## 📸 Screenshots

Add screenshots of your application here.

## 🌐 Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

## 👨‍💻 Author

Neeraj Gautam

GitHub: https://github.com/your-username

## 📄 License

This project is developed for learning and portfolio purposes.
