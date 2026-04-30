import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const analyzeSentiment = (text) => {
    const negativeWords = ["stress", "tired", "angry", "sad", "overwhelmed"];
    const positiveWords = ["good", "great", "happy", "motivated", "ready"];

    let score = 0;
    text.split(" ").forEach(word => {
      if (negativeWords.includes(word)) score--;
      if (positiveWords.includes(word)) score++;
    });

    return score < 0 ? "negative" : "positive";
  };

  const generateResponse = (text) => {
    const mood = analyzeSentiment(text);

    if (mood === "negative") {
      return "I detect you're feeling stressed. Let's break tasks into smaller steps.";
    }
    return "You seem good! Let’s maximize your study productivity 🚀";
  };

  const sendMessage = () => {
    const response = generateResponse(input);

    setChat([...chat, 
      { role: "user", text: input },
      { role: "ai", text: response }
    ]);

    setInput("");
  };

  const generateStudyPlan = () => {
    return [
      "Math - 30 min",
      "AI concepts - 45 min",
      "Break - 10 min",
      "Coding practice - 60 min"
    ];
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>MindMate AI</h1>

      <div>
        {chat.map((msg, i) => (
          <p key={i}>
            <b>{msg.role}:</b> {msg.text}
          </p>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Talk to AI..."
      />
      <button onClick={sendMessage}>Send</button>

      <hr />

      <h3>AI Study Planner</h3>
      <ul>
        {generateStudyPlan().map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}