
# 🛍️ ProductMS

**ProductMS** (Product Management System) is a full-stack MERN application designed to manage products, user accounts, and wishlists. Only admins can perform product CRUD operations, while users can browse products and manage their own wishlists.

---

## 📁 Project Structure

### Backend (`/Backend`)

```
│ ├── node_modules/
│ ├── public/temp/ # Temporary storage 
│ ├── src/
│ │ ├── controllers/ # Express route handlers
│ │ ├── db/ # Database connection
│ │ ├── middlewares/ # Middleware (e.g., auth, multer)
│ │ ├── models/ # Mongoose schemas
│ │ ├── routes/ # Express routes
│ │ ├── utils/ # Utility functions
│ │ ├── app.js # Express app instance
│ │ └── index.js # Entry point for backend
│ ├── .env # Environment variables
│ ├── package.json
│ └── package-lock.json
```

### Frontend (`/Frontend`)

```
│ ├── node_modules/
│ ├── public/
│ │ ├── fontawesome-free-6.6.0-web/
│ │ └── AdminLogo.jpg
│ ├── src/
│ │ ├── Admin-Pages/ # Admin dashboard components/pages
│ │ ├── Client-Pages/ # Client-side components/pages
│ │ ├── assets/ # Static images, fonts, etc.
│ │ ├── controller/ # Frontend API calls
│ │ ├── routes/ # React Router routes
│ │ ├── App.jsx # Root component
│ │ ├── App.css
│ │ ├── index.js
│ │ └── main.jsx # Vite entry point
│ ├── index.html
│ ├── package.json
│ ├── tailwind.config.js
│ ├── postcss.config.js
│ ├── vite.config.js
```

---

## 🔐 Authentication & Authorization

- **User Authentication**: Basic sign-up/login system with role-based access.
- **Admin Access**: Only admin users can perform product CRUD (Create, Read, Update, Delete).
- **JWT** is used for session management via `auth.middlewear.js`.

---

## 🚀 Features

### Admin
- Add, update, delete products.
- Image uploads with Cloudinary via Multer middleware.

### User
- Sign up, log in.
- View products.
- Add/remove items from wishlist.

---

## 🧰 Tech Stack

- **Frontend**: React (Vite), Axios, React Router
- **Backend**: Node.js, Express.js, MongoDB
- **Auth**: JWT
- **Storage**: Cloudinary for image handling
- **Middleware**: Multer (image upload), Custom async handler
- **Database**: MongoDB with Mongoose

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js
- MongoDB instance (local or Atlas)
- Cloudinary account

### Backend

```bash
cd Backend
npm install
# Add .env with Mongo URI, JWT secret, and Cloudinary config
npm run start
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

## 🌐 Environment Variables

`.env` file should include:

```env
ATLAS_DB=atlasdb_connection_string
JWT_SECRET=jwt_secret
CLOUDINARY_CLOUD_NAME=cloud_name
CLOUDINARY_API_KEY=api_key
CLOUDINARY_API_SECRET=api_secret
```

---

## 📌 Notes

- Product operations require authentication and must be performed by an admin.
- Wishlist is tied to user accounts.
- Protected routes use the `verifyJWT` middleware.
- Error and response handling is managed using custom utility classes.

---

## 👨‍💻 Author

**Dasharath Suthar**  

