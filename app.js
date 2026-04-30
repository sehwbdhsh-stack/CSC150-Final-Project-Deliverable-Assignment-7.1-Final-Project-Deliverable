import { useState, useEffect, useRef } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const analyzeSentiment = (text) => {
    const negativeWords = ["stress", "tired", "angry", "sad", "overwhelmed"];
    const positiveWords = ["good", "great", "happy", "motivated", "ready"];

    let score = 0;

    text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(" ")
      .forEach((word) => {
        if (negativeWords.includes(word)) score--;
        if (positiveWords.includes(word)) score++;
      });

    return score < 0 ? "negative" : "positive";
  };

  const generateResponse = (text) => {
    const mood = analyzeSentiment(text);

    const negativeResponses = [
      "I detect stress. Try breaking tasks into smaller steps.",
      "It’s okay to feel overwhelmed — let’s simplify your workload.",
    ];

    const positiveResponses = [
      "You’re in a great mindset 🚀 Let’s maximize productivity.",
      "Nice energy! Let’s get things done efficiently.",
    ];

    return mood === "negative"
      ? negativeResponses[Math.floor(Math.random() * negativeResponses.length)]
      : positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const response = generateResponse(input);

    setChat((prev) => [
      ...prev,
      { role: "user", text: input },
      { role: "ai", text: response },
    ]);

    setInput("");
  };

  const generateStudyPlan = () => [
    "Math - 30 min",
    "AI concepts - 45 min",
    "Break - 10 min",
    "Coding practice - 60 min",
  ];

  return (
    <div style={{ padding: 20, fontFamily: "Arial", maxWidth: 500 }}>
      <h1>MindMate AI</h1>

      <div style={{ marginBottom: 20 }}>
        {chat.length === 0 && <p>No messages yet...</p>}

        {chat.map((msg, i) => (
          <p key={i}>
            <b>{msg.role}:</b> {msg.text}
          </p>
        ))}

        <div ref={chatEndRef} />
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Talk to AI..."
        style={{ width: "70%", padding: 8 }}
      />

      <button onClick={sendMessage} style={{ padding: 8 }}>
        Send
      </button>

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
