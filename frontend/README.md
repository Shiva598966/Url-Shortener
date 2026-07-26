# 🌐 URL Shortener

A modern full-stack URL Shortener built with **React**, **Node.js**, **Express**, and **MongoDB**.

This application allows users to shorten long URLs, manage them through a clean dashboard, copy shortened links, track click counts, and delete URLs.

---

## ✨ Features

* 🔗 Shorten long URLs
* 🚀 Redirect to the original URL
* 📋 Copy shortened URL to clipboard
* 📜 View previously created URLs
* 🗑 Delete URLs
* 👆 Track click count
* ✅ URL validation
* ⏳ Loading spinner while creating URLs
* 🔔 Toast notifications for success and error messages
* 🎨 Modern glassmorphism UI with responsive design

---

## 🛠 Tech Stack

### Frontend

* React
* Vite
* CSS3
* React Hot Toast

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

---

## 📂 Project Structure

```
url-shortener/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/url-shortener.git
```

```bash
cd url-shortener
```

---

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

---

### 3. Install backend dependencies

```bash
cd ../backend
npm install
```

---

### 4. Configure Environment Variables

Create a `.env` file inside the **backend** folder.

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

---

### 5. Start Backend

```bash
cd backend
npm start
```

or

```bash
npm run dev
```

---

### 6. Start Frontend

Open another terminal.

```bash
cd frontend
npm run dev
```

---

## 📷 Screenshots

You can add screenshots here after deployment.

Example:

```
Home Page

History Dashboard

URL Created Successfully
```

---

## 📌 API Endpoints

### Create Short URL

```
POST /shorten
```

---

### Redirect

```
GET /:shortCode
```

---

### Get All URLs

```
GET /urls
```

---

### Delete URL

```
DELETE /urls/:id
```

---

## 🚀 Future Improvements

* ✨ Custom short URLs
* 📊 Analytics dashboard
* 🔍 Search history
* 📄 Pagination
* 👤 User authentication
* ☁️ Cloud deployment
* 📱 Progressive Web App (PWA)

---

## 📸 Preview

Current functionality includes:

* Creating short URLs
* Redirecting to original URLs
* Viewing URL history
* Copying URLs
* Deleting URLs
* Tracking click counts

---

## 👨‍💻 Author

**Shiva**

If you found this project helpful, consider giving it a ⭐ on GitHub.
