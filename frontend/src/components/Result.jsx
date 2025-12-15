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

      <p>
        <b>Confidence:</b>{" "}
        {data.confidence ? `${Math.round(data.confidence * 100)}%` : "-"}
      </p>
      <p>
        <b>Infection Level</b>:{" "}
        {data.severity_ratio
          ? `${Math.round(data.severity_ratio * 100)}%`
          : "0%"}
      </p>
      <div className="progress">
        <div
          style={{
            width: `${Math.round(data.severity_ratio * 100)}%`,
            height: "20px",
            backgroundColor: "#4caf50",
            borderRadius: "5px",
          }}
        />
      </div>

      <p>
        <b>🔍 Observed Symptoms:</b>
      </p>
      <ul>
        {data.symptoms.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>

      <p>
        <b>📍 Affected Areas:</b>
      </p>
      <ul>
        {data.affected_areas.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>

      <p>
        <b>💊 Treatment Recommendations:</b>
      </p>
      <ul>
        {Array.isArray(data.treatment) ? (
          data.treatment.map((t, i) => <li key={i}>{t}</li>)
        ) : (
          <li>{data.treatment}</li>
        )}
      </ul>

      <p>
        <b>💡 Additional Notes:</b> {data.notes || "Monitor plant regularly."}
      </p>
      <p>⏱️ Analysis completed in {data.time || "-"}s</p>
    </div>
  );
}
