# Prompt Engineering Notes

## Project Overview

This project generates professional cover letters using Open Ai based on user information and uploaded resume content.

---

## Prompt Strategy

The prompt was iteratively refined during development to improve:

- Professional tone
- Context awareness
- Company personalization
- Skill highlighting
- Resume integration
- Output formatting

---

## Final Prompt

```
Generate a professional cover letter.

Candidate Name:
{name}

Job Role:
{role}

Target Company:
{company}

Skills:
{skills}

Resume Content:
{resumeText}

Requirements:

- Maintain a professional tone.
- Personalize the letter for the target company.
- Highlight relevant technical skills.
- Utilize resume information naturally.
- Keep the cover letter concise and well structured.
- Return only the final cover letter without additional explanations.
```

---

## Development Notes

During development, AI-assisted tools were used to:

- understand React concepts,
- improve prompt wording,
- resolve implementation issues,
- debug application logic,
- and learn best practices.

The application architecture, feature integration, debugging, testing, UI customization, and final implementation were completed and verified by the developer.

AI assistance was used as a development aid rather than as a replacement for understanding or implementation.

---

## Engineering Considerations

- Environment variables used for API security
- Async/Await for API communication
- Loading state for better UX
- Resume parsing before prompt generation
- Markdown rendering for cleaner output

---

