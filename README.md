# AI Cover Letter Generator

An AI-powered Cover Letter Generator built with **React**, **Vite**, and **Open Ai API**.

The application generates professional and personalized cover letters based on user input such as candidate name, target company, job role, skills, and uploaded resume.

---

## Features

- AI-generated Cover Letters using Open Ai
- Resume PDF Upload
- Resume Text Extraction
- Dynamic Prompt Engineering
- Copy to Clipboard
- Loading Indicator
- Responsive User Interface
- Secure API Key using Environment Variables
- Markdown Rendering

---

## Tech Stack

- React
- Vite
- JavaScript (ES6)
- CSS3
- Open Ai
- React Markdown

---

## Folder Structure

```
src/
│
├── components/
│   ├── Form.jsx
│   ├── Output.jsx
│   ├── Loader.jsx
│   ├── ResumeUpload.jsx
│   └── Button.jsx
│
├── utils/
│   ├── gemini.js
│   └── helpers.js
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Run the application

```bash
npm run dev
```

---

## Environment Variables

Create a `.env` file.

```env
VITE_OPENROUTER_API_KEY=YOUR_API_KEY
```

---

## Project Workflow

1. User enters personal information.
2. User uploads resume (optional).
3. Resume text is extracted.
4. User data is combined with resume content.
5. Prompt is sent to Open Ai.
6. Open Ai generates a professional cover letter.
7. User can copy the generated letter.

---

## Security

- API keys are stored using `.env`
- `.env` is ignored using `.gitignore`
- Sensitive credentials are never committed to GitHub.

---

## Future Improvements

- Multiple cover letter templates
- AI Providers

---

## Author

Priyansh Sinha
