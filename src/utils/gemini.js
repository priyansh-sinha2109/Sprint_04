/**
 * Generate a cover letter using Google Gemini API
 * @param {object} params
 * @param {string} params.name - Candidate name
 * @param {string} params.role - Job role
 * @param {string} params.company - Target company
 * @param {string} params.skills - Key skills
 * @param {string} params.resumeText - Extracted resume text (optional)
 * @returns {Promise<string>} - Generated cover letter
 */
export async function generateCoverLetter({
  name,
  role,
  company,
  skills,
  resumeText,
}) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
    throw new Error(
      "Gemini API key is missing. Please add your API key to the .env file.",
    );
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  // Build the prompt
  let prompt = `You are a professional cover letter writer. Write a compelling, polished, and personalized cover letter for the following candidate.

**Candidate Details:**
- Full Name: ${name}
- Applying For: ${role}
- Target Company: ${company}
- Key Skills: ${skills}
`;

  if (resumeText && resumeText.trim().length > 0) {
    prompt += `
**Candidate's Resume (extracted text):**
${resumeText}

Use the resume information to make the cover letter more specific and personalized. Reference actual experiences, projects, or achievements from the resume where relevant.
`;
  }

  prompt += `
**Instructions:**
1. Start with today's date and a professional greeting.
2. Write 3-4 strong paragraphs.
3. Highlight how the candidate's skills and experience align with the role at the company.
4. Show enthusiasm for the company and the position.
5. End with a professional closing and the candidate's name.
6. Use a confident yet professional tone.
7. Do NOT use placeholder text like [Your Address] or [Phone Number].
8. Make it ready to send as-is.
9. Format the letter with proper spacing and structure.

Write the cover letter now:`;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048,
    },
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage =
        errorData?.error?.message ||
        `API Error: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();

    // Extract the text from the response
    const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error("No content was generated. Please try again.");
    }

    return generatedText;
  } catch (error) {
    if (error.message.includes("Failed to fetch")) {
      throw new Error(
        "Network error. Please check your internet connection and try again.",
      );
    }
    throw error;
  }
}
