/**
 * Copy text to clipboard
 * @param {string} text
 * @returns {Promise<boolean>}
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return true;
    } catch (fallbackErr) {
      console.error("Failed to copy text:", fallbackErr);
      return false;
    }
  }
}

/**
 * Validate form fields
 * @param {object} formData
 * @returns {object}
 */
export function validateForm(formData) {
  const errors = {};

  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = "Please enter your full name (at least 2 characters).";
  }

  if (!formData.role || formData.role.trim().length < 2) {
    errors.role = "Please enter the job role you are applying for.";
  }

  if (!formData.company || formData.company.trim().length < 2) {
    errors.company = "Please enter the target company name.";
  }

  if (!formData.skills || formData.skills.trim().length < 3) {
    errors.skills = "Please enter at least one key skill.";
  }

  return errors;
}

/**
 * Extract text from a PDF file using pdfjs-dist
 * @param {File} file
 * @returns {Promise<string>}
 */
export async function extractTextFromPDF(file) {
  const pdfjsLib = await import("pdfjs-dist");

  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item) => item.str).join(" ");
    fullText += pageText + "\n";
  }

  return fullText.trim();
}

/**
 * Get today's date in a readable format
 * @returns {string}
 */
export function getFormattedDate() {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Generate a professional fallback cover letter locally
 * @param {object} params
 * @returns {string}
 */
export function generateFallbackCoverLetter({
  name,
  role,
  company,
  skills,
  resumeText = "",
}) {
  const date = getFormattedDate();

  const skillsArray = skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  const formattedSkills =
    skillsArray.length > 0 ? skillsArray.slice(0, 4).join(", ") : skills;

  let resumeReference = "";

  if (resumeText && resumeText.trim().length > 40) {
    resumeReference = ` In addition, my resume reflects hands-on experience, practical project work, and a strong commitment to continuous learning, which I believe would allow me to contribute effectively to your team from day one.`;
  }

  return `${date}

Dear Hiring Manager,

I am writing to express my strong interest in the ${role} position at ${company}. With a solid foundation in ${formattedSkills}, I am excited about the opportunity to contribute my skills and enthusiasm to an innovative organization like ${company}.

I have developed relevant technical and problem-solving abilities that align well with the requirements of a ${role}. My background has helped me build confidence in working with ${formattedSkills}, and I am eager to apply these strengths in a professional environment where I can contribute meaningful results and continue growing.

What particularly attracts me to ${company} is the opportunity to be part of a team that values quality, innovation, and impact. I am confident that my dedication, adaptability, and passion for learning would make me a valuable addition to your organization.${resumeReference}

Thank you for considering my application. I would welcome the opportunity to discuss how my skills and enthusiasm can contribute to ${company}. I look forward to the possibility of speaking with you.

Sincerely,  
${name}`;
}
