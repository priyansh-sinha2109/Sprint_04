import React, { useState } from "react";
import Form from "./components/Form";
import Output from "./components/Output";
import Loader from "./components/Loader";
import { generateCoverLetter } from "./utils/gemini";
import { generateFallbackCoverLetter } from "./utils/helpers";
import "./App.css";

function App() {
  const [coverLetter, setCoverLetter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  async function handleGenerate(formData) {
    setIsLoading(true);
    setError("");
    setInfoMessage("");
    setCoverLetter("");

    try {
      const result = await generateCoverLetter({
        name: formData.name,
        role: formData.role,
        company: formData.company,
        skills: formData.skills,
        resumeText: formData.resumeText || "",
      });

      setCoverLetter(result);
    } catch (err) {
      console.error("Generation error:", err);

      const quotaError =
        err.message?.toLowerCase().includes("quota") ||
        err.message?.toLowerCase().includes("rate limit") ||
        err.message?.toLowerCase().includes("billing") ||
        err.message?.toLowerCase().includes("exceeded your current quota") ||
        err.message?.toLowerCase().includes("limit: 0");

      if (quotaError) {
        const fallbackResult = generateFallbackCoverLetter({
          name: formData.name,
          role: formData.role,
          company: formData.company,
          skills: formData.skills,
          resumeText: formData.resumeText || "",
        });

        setCoverLetter(fallbackResult);
        setInfoMessage(
          "Gemini AI quota is currently unavailable, so a smart local fallback cover letter was generated instead.",
        );
      } else {
        setError(err.message || "Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setCoverLetter("");
    setError("");
    setInfoMessage("");
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-badge">✦ Powered by Google Gemini AI</div>
        <h1>AI Cover Letter Generator</h1>
        <p>Create personalized, professional cover letters in seconds</p>
      </header>

      <Form onGenerate={handleGenerate} isLoading={isLoading} />

      {infoMessage && (
        <div
          style={{
            background: "rgba(0, 184, 148, 0.1)",
            border: "1px solid rgba(0, 184, 148, 0.35)",
            borderRadius: "12px",
            padding: "16px 20px",
            color: "#00d1a0",
            fontSize: "0.9rem",
            marginBottom: "20px",
          }}
        >
          <span style={{ marginRight: "8px" }}>ℹ️</span>
          {infoMessage}
        </div>
      )}

      {error && (
        <div className="error-message">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {isLoading && <Loader />}

      {!isLoading && coverLetter && (
        <Output coverLetter={coverLetter} onReset={handleReset} />
      )}

      <footer className="app-footer">
        <p>
          Built with React + Google Gemini AI &nbsp;|&nbsp; Sprint 4 Project
        </p>
      </footer>
    </div>
  );
}

export default App;
