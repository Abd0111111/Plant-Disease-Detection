// src/components/AnalysisResults.jsx
import React from "react";

export default function AnalysisResults({ image, result, loading }) {
  return (
    <div className="bg-white rounded-xl p-6 min-h-[520px] flex flex-col transition-all duration-300">
      {/* حالة التحميل */}
      {loading && (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600 mb-4"></div>
          <p className="text-gray-500">Analyzing plant...</p>
        </div>
      )}

      {/* قبل رفع الصورة */}
      {!loading && !image && !result && (
        <div className="flex flex-col items-center justify-center h-full text-center opacity-70">
          <span className="text-6xl mb-4">🌱</span>
          <p className="text-gray-500">
            Upload an image and click Analyze to see results
          </p>
        </div>
      )}

      {/* بعد رفع الصورة وقبل التحليل */}
      {!loading && image && !result && (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <span className="text-5xl mb-4">📸</span>
          <p className="text-gray-600">
            Image uploaded successfully<br />
            Click <strong>Analyze Plant</strong> to continue
          </p>
        </div>
      )}

      {/* بعد ظهور النتيجة */}
      {!loading && result && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              {result.disease}
            </h2>
            <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
              {result.severity?.toUpperCase()}
            </span>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Confidence</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${result.confidence}%` }}
              ></div>
            </div>
            <p className="text-sm mt-1">{result.confidence}%</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Observed Symptoms</p>
            <ul className="list-disc list-inside text-gray-600">
              {result.symptoms?.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Treatment</p>
            <ul className="list-disc list-inside text-gray-600">
              {result.treatment?.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
