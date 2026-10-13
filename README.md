# Smart Resume Builder

Smart Resume Builder is a full-stack resume editor for creating, saving, previewing, and exporting professional resumes. It includes multiple templates, authentication, AI-assisted suggestions, and a local ATS (Applicant Tracking System) score checker for uploaded PDF resumes.

## Features

- Create and edit resumes with a live preview
- Choose from multiple resume templates
- Save, update, list, and delete resumes
- Export resumes to PDF
- Get AI-powered suggestions for resume sections
- Upload a PDF and receive an ATS compatibility score with:
  - Resume structure checks
  - Contact information checks
  - Action-verb and quantified-achievement checks
  - Technical-skill detection
  - Resume length and formatting feedback
- Email/password authentication
- Optional Google and GitHub OAuth
- Password-reset email flow
- Responsive React interface

## Tech stack

### Frontend

- React 19
- Vite
- React Router
- Axios and Fetch
- `html2pdf.js`
- `react-to-print`

### Backend

- Node.js and Express
- MongoDB with Mongoose
- JWT authentication
- bcrypt password hashing
- Passport OAuth strategies for Google and GitHub
- Google Generative AI and OpenAI integrations for suggestions
- `pdfjs-dist` for PDF text extraction
- CORS and `express-fileupload`

## Project structure

```text
Project-1/
├── Backend/
│   ├── config/
│   │   ├── env.js                 # Environment loading and validation
│   │   └── passport.js            # Google/GitHub Passport configuration
│   ├── controllers/
│   │   ├── authController.js      # Registration, login, OAuth, reset password
│   │   ├── atsController.js       # PDF extraction and ATS scoring
│   │   ├── resumeController.js    # Resume CRUD operations
│   │   └── suggestionController.js # AI-assisted suggestions
│   ├── middleware/
│   │   ├── asyncHandler.js
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   └── Resume.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── atsRoutes.js
│   │   └── resumeRoutes.js
│   ├── utils/
│   │   └── connectDB.js
│   ├── app.js                    # Express middleware and API routes
│   ├── server.js                 # Database connection and server startup
│   ├── user.js                   # User model
│   ├── .env.sample
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── components/
    │   │   ├── templates/         # Resume template components
    │   │   ├── ATSScoreChecker.jsx
    │   │   ├── ResumeForm.jsx
    │   │   ├── ResumePreview.jsx
    │   │   └── ...
    │   ├── api/
    │   ├── Layouts/
    │   ├── theme/
    │   ├── App.jsx
    │   ├── AuthPage.jsx
    │   ├── Dashboard.jsx
    │   ├── GettingStartedPage.jsx
    │   ├── ResumeBuilderPage.jsx
    │   └── main.jsx
    ├── .env.example
    ├── vite.config.js
    └── package.json
```

## Prerequisites

- Node.js 18 or newer
- npm
- MongoDB (local or hosted)

## Local setup

### 1. Clone the repository

```bash
git clone https://github.com/AbhayRaj2209/Project-1.git
cd Project-1
```

### 2. Install backend dependencies

```bash
cd Backend
npm install
```

Create `Backend/.env` from `Backend/.env.sample`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/resume-builder
JWT_SECRET=replace-with-a-long-random-secret

BACKEND_URL=http://localhost:5000
CLIENT_URL=http://localhost:5173
CORS_ORIGINS=http://localhost:5173
```

The backend requires `MONGO_URI` and `JWT_SECRET`. The Google/GitHub OAuth and email-reset variables are optional. Add the corresponding values from `.env.sample` when those features are needed.

### 3. Install frontend dependencies

Open a second terminal from the repository root:

```bash
cd Frontend
npm install
```

Create `Frontend/.env` from `Frontend/.env.example`:

```env
VITE_API_URL=http://localhost:5000
```

`VITE_API_URL` is embedded into the frontend at build time. Set it to the deployed backend URL before creating a production build.

## Run locally

Start the backend:

```bash
cd Backend
npm run dev
```

The API runs at `http://localhost:5000`.

Start the frontend in a second terminal:

```bash
cd Frontend
npm run dev
```

The Vite development server runs at `http://localhost:5173`.

For a production frontend build:

```bash
cd Frontend
npm run build
npm run preview
```

## API endpoints

All API routes are served by the backend.

### Health checks

- `GET /` - API status
- `GET /about` - API information

### Authentication

- `POST /api/signup` - Create an account
- `POST /api/login` - Log in with email and password
- `POST /api/forgot-password` - Request a password-reset email
- `POST /api/reset-password` - Reset a password
- `GET /api/auth/providers` - Check enabled OAuth providers
- `GET /api/auth/google` - Start Google OAuth
- `GET /api/auth/github` - Start GitHub OAuth

### Resumes

- `POST /api/resume/save` - Create a resume
- `GET /api/resume/list` - List the current user's resumes
- `GET /api/resume/:id` - Get one resume
- `PUT /api/resume/:id` - Update a resume
- `DELETE /api/resume/:id` - Delete a resume
- `POST /api/resume/suggest` - Generate section suggestions

### ATS checker

- `POST /api/ats/check` - Upload a PDF resume using the `resume` multipart field and receive an ATS analysis

The ATS checker currently analyzes the uploaded resume locally on the backend; it does not require an external AI service.

## Environment variables

The complete lists, comments, OAuth callback examples, and optional email settings are maintained in:

- `Backend/.env.sample`
- `Frontend/.env.example`

For OAuth, the provider callback URLs must match the values configured in Google Cloud Console or GitHub OAuth Apps. In production, set `CLIENT_URL`, `BACKEND_URL`, `CORS_ORIGINS`, and `VITE_API_URL` to the deployed URLs.

## Useful commands

### Backend

```bash
npm run dev       # Start with nodemon
npm start         # Start with Node.js
```

### Frontend

```bash
npm run dev       # Start Vite development server
npm run build     # Create production build
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make and test your changes.
4. Open a pull request with a clear description.

## Author

**Abhay Raj** - [@AbhayRaj2209](https://github.com/AbhayRaj2209)
