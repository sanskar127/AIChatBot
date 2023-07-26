import React, { useState } from 'react';
import axios from 'axios';

const ChattyApp = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const model = "text-davinci-002";
  const API_KEY = "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";

  const fetchData = async (prompt) => {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        prompt: `Complete this sentence: "${prompt}"`,
        model: model,
        max_tokens: 800,
        n: 1,
        stop: ".",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data.choices[0].text;
  };

  async function handleGenerateText() {
    try {
      const completedSentence = await fetchData(prompt);
      setGeneratedText(completedSentence);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container">
      <h1>OpenAI Integration</h1>
      <textarea
        rows="4"
        cols="50"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <br />
      <button onClick={handleGenerateText}>Generate Text</button>
      <div>
        <h2>Generated Text:</h2>
        <p>{generatedText}</p>
      </div>

    </div>
  );
}

export default ChattyApp;
