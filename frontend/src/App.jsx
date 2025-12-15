import React, { useState } from "react";
import "./App.css";
import Upload from "./components/Upload";
import Result from "./components/Result";
import { predictImage } from "./api";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    setLoading(true);
    const res = await predictImage(file);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="header">🌱 Plant Disease Detector</div>

      <div className="title">
        <h2>Analyze Your Plant</h2>
        <p>Upload a leaf image for AI-powered disease detection</p>
      </div>

      <div className="main">
        <div className="card">
          <h3>📤 Upload Image</h3>

          <Upload
            onFile={(f, p) => {
              setFile(f);
              setPreview(p);
              setResult(null);
            }}
            preview={preview}
          />

          <textarea placeholder="Additional notes (optional)" />

          <button
            disabled={!file || loading}
            className={file ? "active" : ""}
            onClick={analyze}
          >
            {loading ? "Analyzing..." : "🔍 Analyze Plant"}
          </button>
        </div>

        <Result data={result} />
      </div>
    </div>
  );
}

export default App;
