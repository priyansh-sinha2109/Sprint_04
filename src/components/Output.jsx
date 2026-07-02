import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import Button from "./Button";
import { copyToClipboard } from "../utils/helpers";

function Output({ coverLetter, onReset }) {
  const [showToast, setShowToast] = useState(false);

  async function handleCopy() {
    const success = await copyToClipboard(coverLetter);
    if (success) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } else {
      alert("Failed to copy. Please select the text and copy manually.");
    }
  }

  if (!coverLetter) return null;

  return (
    <div className="output-container">
      <div className="card">
        <div className="output-header">
          <h2 className="card-title">
            <span className="icon">✉️</span> Your Cover Letter
          </h2>
          <div className="output-actions">
            <Button
              variant="success"
              className="btn-small"
              onClick={handleCopy}
            >
              📋 Copy to Clipboard
            </Button>
            <Button variant="secondary" className="btn-small" onClick={onReset}>
              🔄 Generate New
            </Button>
          </div>
        </div>

        <div className="output-content">
          <ReactMarkdown>{coverLetter}</ReactMarkdown>
        </div>
      </div>

      {showToast && <div className="copy-toast">✅ Copied to clipboard!</div>}
    </div>
  );
}

export default Output;
