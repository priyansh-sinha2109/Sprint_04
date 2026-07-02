import OpenAI from "openai";

export async function generateCoverLetter({
  name,
  role,
  company,
  skills,
  resumeText,
}) {
  const client = new OpenAI({
    apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
    dangerouslyAllowBrowser: true,
  });
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let prompt = `
Today's date is exactly: ${today}

You are an expert HR Manager, Senior Recruiter, and Professional Career Coach.

Your task is to write a high-quality, human-like cover letter that is ready to send without any edits.

Candidate Details:
- Name: ${name}
- Job Role: ${role}
- Company: ${company}
- Skills: ${skills}
`;

  if (resumeText && resumeText.trim()) {
    prompt += `
Resume:
${resumeText}

Use the resume information to personalize the cover letter.
Mention relevant projects, achievements, internships, certifications, and technical skills whenever appropriate.
Never invent information that is not present in the resume.
`;
  }

  prompt += `
Instructions:

• The FIRST line MUST be exactly:
${today}

• Start with a professional greeting.

• Write 3–4 professional paragraphs.

• Explain why the candidate is interested in ${company}.

• Mention how the candidate's skills align with the ${role} role.

• If resume information exists, reference actual projects and achievements.

• Use a confident, natural, human tone.

• Do NOT use placeholders like [Your Address] or [Phone Number].

• End with:
Sincerely,
${name}

Return ONLY the cover letter.
Do not add explanations or markdown.
`;

  const response = await client.chat.completions.create({
    model: "openai/gpt-4.1-mini",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 700,
    temperature: 0.7,
  });

  return response.choices[0].message.content;
}
