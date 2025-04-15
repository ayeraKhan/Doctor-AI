"use client";

import { useState } from "react";

const ChatComponent = () => {
  const [sentimentSummary, setSentimentSummary] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any>(null);

  const handleEndSession = async () => {
    try {
      const res = await fetch("http://192.168.1.8:5000/end-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        alert("Conversation ended.");

        const sentimentData = {
          positive: data.sentiment_counts.positive,
          neutral: data.sentiment_counts.neutral,
          negative: data.sentiment_counts.negative,
        };

        setSentimentSummary(sentimentData);
        setRecommendations(data.recommendations);
        console.log("Recommendations set:", data.recommendations); // log recommendations
        setRecommendations(data.recommendations); // expects structured data with categories
      } else {
        console.error("Failed to end session");
      }
    } catch (err) {
      console.error("API error:", err);
    }
  };

  return (
    <div className="chat-container mt-6 flex flex-col h-screen">
      <div className="end-chat-container mb-4">
        <button
          onClick={handleEndSession}
          className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
        >
          📝 Generate Report
        </button>
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {sentimentSummary && (
          <div className="sentiment-report p-4 border rounded shadow bg-white">
            <h2 className="text-xl font-bold mb-2">🧾 Sentiment Report</h2>
            <p>😊 Positive: {sentimentSummary.positive}</p>
            <p>😐 Neutral: {sentimentSummary.neutral}</p>
            <p>😟 Negative: {sentimentSummary.negative}</p>
          </div>
        )}

        {recommendations && (
          <div className="recommendations p-4 border rounded shadow bg-white">
            <h2 className="text-xl font-bold mb-2">📌 Personalized Recommendations</h2>
            {Object.entries(recommendations).map(([category, items]) => {
              if (!Array.isArray(items)) return null; // Guard against incorrect data format

              return (
                <div key={category} className="mb-4">
                  <h3 className="text-lg font-semibold capitalize">{category}</h3>
                  <ul className="list-disc pl-6">
                    {items.map((item, index) => (
                      <li key={index}>
                        {item?.url && item?.title ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            {item.title}
                          </a>
                        ) : (
                          <span>{typeof item === "string" ? item : "Unlabeled item"}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
