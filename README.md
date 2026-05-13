# CareerPilot AI

CareerPilot AI is a premium AI-powered platform designed to help students and job seekers master their interview skills and optimize their career path.

## Features

- **AI Resume Analyzer**: Upload your PDF resume for a deep ATS analysis, grammar check, and specific bullet point improvements.
- **AI Mock Interview**: Interactive voice/text interviews with role-specific AI interviewers. Includes speech analysis (filler words, pace, clarity).
- **Job Match Analyzer**: Compare your resume against any job description to see how you stack up.
- **Career Roadmap**: Generate step-by-step learning paths based on your current skills and target role.
- **Admin Dashboard**: Overview of user activity and AI usage.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Recharts.
- **Backend**: Node.js, Express.
- **AI**: Google Gemini Pro (Text & JSON analysis).
- **Parsing**: pdf-parse for resume extraction.
- **Database/Auth**: Firebase Firestore & Auth.

## Setup Instructions

1. Ensure `GEMINI_API_KEY` is set in your environment.
2. The application uses Firebase for authentication. Ensure `firebase-applet-config.json` is present (automatically handled during initialization).
3. Run `npm install` and `npm run dev` to start the development server.
4. For production, run `npm run build` and then `npm start`.

## Deployment

The application is container-ready and follows the Google AI Studio build system standards. Deployment is handled via the Cloud Run container.
