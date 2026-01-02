# 📄 Smart Resume Builder

A modern, AI-powered resume builder with ATS (Applicant Tracking System) checker functionality. Create professional resumes with multiple templates, get AI-powered suggestions, and optimize your resume for ATS systems.

## ✨ Features

- **Multiple Professional Templates**: Choose from Classic, Modern, Creative, and Overleaf templates
- **AI-Powered Suggestions**: Get intelligent content suggestions using Google's Generative AI
- **ATS Score Checker**: Analyze and optimize your resume for Applicant Tracking Systems
- **Real-time Preview**: See your resume update in real-time as you edit
- **PDF Export**: Download your resume as a high-quality PDF
- **User Authentication**: Secure sign-up and login functionality
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Resume Management**: Save, edit, and manage multiple resumes

## 🚀 Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **html2pdf.js** - PDF generation
- **react-to-print** - Print functionality

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Google Generative AI** - AI-powered suggestions
- **pdf-parse** - PDF parsing for ATS analysis
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (v4.4 or higher)
- npm or yarn package manager

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/AbhayRaj2209/Project-1.git
cd Project-1
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the Backend directory with the following variables:
```env
PORT=3001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
```

### 3. Frontend Setup

```bash
cd ../Frontend
npm install
```

## 🚀 Running the Application

### Start the Backend Server

```bash
cd Backend
npm run dev
```
The backend server will start on `http://localhost:3001`

### Start the Frontend Development Server

```bash
cd Frontend
npm run dev
```
The frontend will start on `http://localhost:5173`

## 📁 Project Structure

```
Project-1/
├── Backend/
│   ├── controllers/
│   │   ├── atsController.js       # ATS checking logic
│   │   ├── resumeController.js    # Resume CRUD operations
│   │   └── suggestionController.js # AI suggestions
│   ├── models/
│   │   └── Resume.js               # Resume schema
│   ├── routes/
│   │   ├── atsRoutes.js
│   │   └── resumeRoutes.js
│   ├── server.js                   # Express server setup
│   ├── user.js                     # User model
│   └── package.json
│
└── Frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── templates/          # Resume templates
    │   │   ├── ATSChecker.jsx      # ATS score component
    │   │   ├── ResumeForm.jsx      # Resume editing form
    │   │   └── ResumePreview.jsx   # Live preview
    │   ├── api/
    │   │   └── getSuggestion.js    # API calls
    │   ├── Layouts/
    │   │   └── MainLayout.jsx
    │   ├── App.jsx
    │   ├── Dashboard.jsx
    │   ├── ResumeBuilderPage.jsx
    │   └── main.jsx
    └── package.json
```

## 🎯 Key Features Breakdown

### Resume Templates
- **Classic Template**: Traditional professional layout
- **Modern Template**: Contemporary design with clean lines
- **Creative Template**: Unique and eye-catching format
- **Overleaf Template**: Academic and research-focused design

### ATS Checker
- Upload existing resumes for analysis
- Get detailed ATS compatibility score
- Receive actionable recommendations
- Keyword optimization suggestions

### AI Suggestions
- Context-aware content recommendations
- Professional phrasing improvements
- Industry-specific terminology
- Action verb suggestions

## 🔐 API Endpoints

### Authentication
- `POST /register` - User registration
- `POST /login` - User login

### Resumes
- `GET /api/resumes` - Get all resumes
- `POST /api/resumes` - Create new resume
- `GET /api/resumes/:id` - Get specific resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume

### ATS
- `POST /api/ats/check` - Check ATS score

### Suggestions
- `POST /api/suggestions` - Get AI-powered suggestions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Abhay Raj**
- GitHub: [@AbhayRaj2209](https://github.com/AbhayRaj2209)

## 🙏 Acknowledgments

- Google Generative AI for AI-powered suggestions
- React team for the amazing library
- All contributors who help improve this project

## 📧 Contact

For any queries or support, please open an issue on GitHub.

