"use client";

import { useState } from "react";

export default function TestAIPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendPrompt() {
    setLoading(true);

    try {
      const res = await fetch("/api/openrouter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setResponse(data.response);
      } else {
        setResponse("Error:\n" + data.error);
      }
    } catch (error) {
      setResponse("Request failed.");
    }

    setLoading(false);
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>AI Test</h1>

      <textarea
        rows={8}
        cols={70}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Write a prompt..."
      />

      <br />
      <br />

      <button onClick={sendPrompt} disabled={loading}>
        {loading ? "Thinking..." : "Send"}
      </button>

      <hr />

      <pre>{response}</pre>
    </main>
  );
}