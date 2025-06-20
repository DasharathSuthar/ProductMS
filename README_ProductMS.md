
# 🛍️ ProductMS

**ProductMS** (Product Management System) is a full-stack MERN application designed to manage products, user accounts, and wishlists. Only admins can perform product CRUD operations, while users can browse products and manage their own wishlists.

---

## 📁 Project Structure

### Backend (`/Backend`)

```
src/
├── controllers/
│   ├── product.controller.js
│   ├── user.controller.js
│   └── wishList.controller.js
├── db/
│   └── index.js
├── middlewears/
│   ├── auth.middlewear.js
│   └── multer.middlewear.js
├── models/
│   ├── user.model.js
│   ├── product.model.js
│   └── wishList.model.js
├── routes/
│   ├── user.route.js
│   ├── product.route.js
│   └── wishList.route.js
├── utils/
│   ├── ApiError.js
│   ├── ApiResponse.js
│   ├── asyncHandler.js
│   └── cloudinary.js
├── app.js
├── index.js
├── .env
├── .gitignore
└── package.json
```

### Frontend (`/Frontend`)

```
src/
├── Admin-Pages/components/
├── Client-Pages/components/
├── controller/
│   ├── product.controller.js
│   ├── user.controller.js
│   └── wishList.controller.js
├── routes/
│   ├── user.route.js
│   ├── product.route.js
│   └── wishList.route.js
├── app.jsx
├── index.css
├── index.js
└── main.jsx
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
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
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

