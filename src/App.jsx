import React, { useState } from "react";
import Form from "./components/Form";
import Output from "./components/Output";
import Loader from "./components/Loader";
import { generateCoverLetter } from "./utils/openai";
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

      const apiError =
        err.message?.toLowerCase().includes("quota") ||
        err.message?.toLowerCase().includes("rate limit") ||
        err.message?.toLowerCase().includes("billing") ||
        err.message?.toLowerCase().includes("payment") ||
        err.message?.toLowerCase().includes("credit") ||
        err.message?.toLowerCase().includes("402");

      if (apiError) {
        const fallbackResult = generateFallbackCoverLetter({
          name: formData.name,
          role: formData.role,
          company: formData.company,
          skills: formData.skills,
          resumeText: formData.resumeText || "",
        });

        setCoverLetter(fallbackResult);

        setInfoMessage(
          "OpenAI is currently unavailable or your OpenRouter credits have been exhausted. A smart local fallback cover letter has been generated instead.",
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
        <div className="header-badge">✨ Powered by OpenAI GPT-4.1 Mini</div>

        <h1>AI Cover Letter Generator</h1>

        <p>Create personalized, professional cover letters in seconds.</p>
      </header>

      <Form onGenerate={handleGenerate} isLoading={isLoading} />

      {infoMessage && (
        <div
          style={{
            background: "rgba(0, 184, 148, 0.10)",
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
          Built with React + OpenAI GPT-4.1 Mini (via OpenRouter) &nbsp;|&nbsp;
          Sprint 4 Project
        </p>
      </footer>
    </div>
  );
}

export default App;
