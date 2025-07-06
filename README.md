
# 🏡 Samaj Sandesh - Community Notice Board

A full-stack web application that helps communities share and access important announcements and stay updated with the latest news — all in one place.

## 🌐 Live Site

Frontend: [https://samaj-sandesh.vercel.app](https://samaj-sandesh.vercel.app)  
Backend: [https://samaj-sandesh.onrender.com](https://samaj-sandesh.onrender.com)

---

## ✨ Features

- 🔐 User authentication (Register/Login)
- 📢 Post and manage community announcements
- 📰 Live News fetched from NewsAPI
- 🌓 Light/Dark theme support
- ⚙️ Role-based actions (Only post authors can delete their posts)
- 🔁 Secure backend with CORS, environment variables, and API key protection

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- dotenv
- cors
- NewsAPI integration

---

## 📁 Project Structure

### Backend
/backend  
├── routes/  
│ ├── auth.route.js  
│ ├── announcement.route.js  
│ └── news.route.js  
├── controllers/  
├── lib/  
│ └── connectDB.js  
├── .env  
└── server.js

### Frontend

/frontend  
├── src/  
│ ├── pages/  
│ │ ├── Login.jsx  
│ │ ├── Register.jsx  
│ │ ├── Announcements.jsx  
│ ├── components/  
│ │ ├── AnnouncementCard.jsx  
│ │ └── NewsSection.jsx  
│ ├── contexts/  
│ │ └── AuthContext.jsx  
│ └── api/  
│ └── axios.js


---

## 🔐 Environment Variables

### Backend (`.env`)
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEWS_API_KEY=your_newsapi_key
```
🔒 Never commit `.env` to source control.

## 🚀 Getting Started

### Clone the repository


```
git clone https://github.com/yourusername/samaj-sandesh.git 
cd samaj-sandesh
``` 

### Setup backend


```
cd backend
npm install 
cp .env.example .env  # and fill your env values
npm run dev
``` 

### Setup frontend

```cd frontend
npm install
npm run dev
```


## 📌 Future Improvements

-   🔍 Search and filter announcements
    
-   🗂️ Category tags for posts
    
-   📱 Mobile-first responsiveness
    
-   🔔 Email or in-app notifications
    
-   ✍️ Markdown support in announcements


