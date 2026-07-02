import React, { useState } from "react";
import Button from "./Button";
import ResumeUpload from "./ResumeUpload";
import { validateForm, extractTextFromPDF } from "../utils/helpers";

function Form({ onGenerate, isLoading }) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    skills: "",
  });

  const [errors, setErrors] = useState({});
  const [resumeText, setResumeText] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  }

  async function handleFileSelect(file) {
    try {
      const text = await extractTextFromPDF(file);
      setResumeText(text);
    } catch (err) {
      console.error("Error extracting PDF text:", err);
      alert("Failed to extract text from PDF. Please try a different file.");
      setResumeText("");
    }
  }

  function handleFileRemove() {
    setResumeText("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Validate
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    // Send data to parent
    onGenerate({
      ...formData,
      resumeText: resumeText,
    });
  }

  return (
    <div className="card">
      <h2 className="card-title">
        <span className="icon">📝</span> Your Details
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className={`form-group ${errors.name ? "error" : ""}`}>
            <label htmlFor="name">Candidate Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className={`form-group ${errors.role ? "error" : ""}`}>
            <label htmlFor="role">Job Role</label>
            <input
              type="text"
              id="role"
              name="role"
              placeholder="e.g. Frontend Developer"
              value={formData.role}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.role && <span className="field-error">{errors.role}</span>}
          </div>

          <div className={`form-group ${errors.company ? "error" : ""}`}>
            <label htmlFor="company">Target Company</label>
            <input
              type="text"
              id="company"
              name="company"
              placeholder="e.g. Google"
              value={formData.company}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.company && (
              <span className="field-error">{errors.company}</span>
            )}
          </div>

          <div className={`form-group ${errors.skills ? "error" : ""}`}>
            <label htmlFor="skills">Key Skills</label>
            <input
              type="text"
              id="skills"
              name="skills"
              placeholder="e.g. React, JavaScript, Node.js"
              value={formData.skills}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.skills && (
              <span className="field-error">{errors.skills}</span>
            )}
          </div>

          <div className="form-group full-width">
            <label>Resume (Optional)</label>
            <ResumeUpload
              onFileSelect={handleFileSelect}
              onFileRemove={handleFileRemove}
            />
          </div>
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? "⏳ Generating..." : "🚀 Generate Cover Letter"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Form;
