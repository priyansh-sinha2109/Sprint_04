import React, { useState } from "react";

function ResumeUpload({ onFileSelect, onFileRemove }) {
  const [fileName, setFileName] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);

  function handleFileChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    // Check if it's a PDF
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file only.");
      e.target.value = "";
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Maximum size is 5MB.");
      e.target.value = "";
      return;
    }

    setFileName(file.name);
    setIsExtracting(true);

    onFileSelect(file).finally(() => {
      setIsExtracting(false);
    });
  }

  function handleRemove(e) {
    e.stopPropagation();
    e.preventDefault();
    setFileName("");
    onFileRemove();
  }

  return (
    <div className={`resume-upload-area ${fileName ? "has-file" : ""}`}>
      {!fileName ? (
        <>
          <div className="upload-icon">📄</div>
          <p className="upload-text">
            Click or drag to upload your resume (PDF)
          </p>
          <p className="upload-subtext">Maximum file size: 5MB</p>
          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
          />
        </>
      ) : (
        <>
          <div className="upload-icon">✅</div>
          {isExtracting ? (
            <p
              className="upload-text"
              style={{ animation: "pulse 1.5s infinite" }}
            >
              Extracting text from resume...
            </p>
          ) : (
            <>
              <p className="upload-text">Resume uploaded successfully!</p>
              <div className="upload-filename">
                <span>📎 {fileName}</span>
                <button
                  className="remove-file-btn"
                  onClick={handleRemove}
                  title="Remove file"
                >
                  ✕
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ResumeUpload;
