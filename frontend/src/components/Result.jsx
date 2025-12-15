import React from "react";

export default function Result({ data }) {
  if (!data)
    return (
      <div className="card">
        <h3>📊 Analysis Results</h3>
        <p style={{ textAlign: "center", color: "#90a4ae" }}>
          Upload an image and click Analyze to see results 🌱
        </p>
      </div>
    );

  return (
    <div className="card">
      <h3>
        🍃 {data.disease}
        <span className="badge">{data.severity.toUpperCase()}</span>
      </h3>

      <p><b>Infection Level</b></p>
      <div className="progress">
        <div style={{ width: `${Math.round(data.severity_ratio * 100)}%` }} />
      </div>

      <p><b>Treatment</b></p>
      <ul>
        <li>{data.treatment}</li>
      </ul>
    </div>
  );
}
