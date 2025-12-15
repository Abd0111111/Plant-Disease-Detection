import React from "react";

export default function Upload({ onFile, preview }) {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    onFile(file, URL.createObjectURL(file));
  };

  return (
    <label className="upload-box">
      {preview ? (
        <img src={preview} alt="preview" />
      ) : (
        <>
          📷
          <p>
            Drag & drop a leaf image
            <br />
            or click to select
          </p>
          <small>JPEG, PNG (max 10MB)</small>
        </>
      )}
      <input type="file" hidden accept="image/*" onChange={handleFile} />
    </label>
  );
}
