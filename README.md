## 🛒 MERN Stack E-Commerce App

This is a full-featured **E-Commerce Web Application** built using the **MERN stack** (MongoDB, Express.js, React, Node.js). It includes features like user authentication, product management, order processing, payments via **Stripe**, and an **admin dashboard** for full control.

---

### ✨ Features

#### 🧑‍💼 User

* Register/Login with JWT authentication
* View & update profile
* Reset password via email token
* Browse all products
* Filter/search by keyword
* Add to cart
* Checkout with shipping info
* Stripe payment integration
* View past orders and order details

#### 🛠️ Admin Dashboard

* Dashboard with summary stats
* Create, update, delete products
* Manage all orders (mark as shipped/delivered)
* Manage all users (update role or delete)
* Manage product reviews

---


### ⚙️ Tech Stack

#### Frontend:

* React.js + React Router v6
* Redux & Redux Thunk
* Axios
* Tailwind / Material-UI
* React Toastify
* Stripe.js

#### Backend:

* Node.js + Express.js
* MongoDB + Mongoose
* Cloudinary (Image Uploads)
* Stripe API (Payments)
* JSON Web Tokens (JWT)
* Nodemailer (Forgot Password)

---

### 📂 Folder Structure

```
client/
├── pages/
├── components/
├── Admin/
└── App.js

server/
├── controllers/
├── models/
├── routes/
└── server.js
```

---

### 🛠️ Setup Instructions

#### 1. Clone the Repo

```bash
git clone https://github.com/Shinkhal/ECOMMERCE_MERN.git
cd ECOMMERCE_MERN
```

#### 2. Install Client

```bash
cd client
npm install
```

#### 3. Install Server

```bash
cd ../server
npm install
```

#### 4. Add Environment Variables

Create `.env` files in both `client/` and `server/` directories.

##### 📁 `server/.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=5d
COOKIE_EXPIRE=5
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_API_KEY=your_stripe_publishable_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass
```

##### 📁 `client/.env`

```env
REACT_APP_API_URL=http://localhost:5000/api/v1
```

#### 5. Run the App

```bash
# Server
cd server
npm run dev

# Client
cd ../client
npm start
```

---


### 👤 Author

**Shinkhal Sinha**
[shinkhal-sinha.online](https://shinkhal-sinha.online) • [GitHub](https://github.com/Shinkhal)

---

### 📄 License

This project is licensed under the MIT License.

