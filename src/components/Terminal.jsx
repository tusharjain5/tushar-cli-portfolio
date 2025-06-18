import React, { useState, useEffect, useRef } from "react";
import commands from "../data/commands";

const Terminal = () => {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    // Show welcome message on first load
    const welcomeMessage = [
      { cmd: "", response: "👋 Welcome to Tushar's Portfolio Terminal!" },
      { cmd: "", response: 'Type "help" to see available commands.' },
    ];
    setLines(welcomeMessage);
    inputRef.current?.focus();
  }, []);

  const handleCommand = (cmd) => {
    if (cmd === "clear") {
      setLines([]);
      return;
    }

    const response = commands[cmd] || `❌ Command not found: ${cmd}`;
    setLines((prev) => [...prev, { cmd, response }]);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      const trimmed = input.trim();
      if (trimmed !== "") {
        handleCommand(trimmed);
        setInput("");
      }
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [lines]);

  return (
    <div className="terminal">
      {lines.map((line, idx) => (
        <div key={idx}>
          {line.cmd && <div className="prompt">$ {line.cmd}</div>}
          <pre>{line.response}</pre>
        </div>
      ))}
      <div className="input-line">
        <span>$ </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          autoFocus
        />
      </div>
    </div>
  );
};

export default Terminal;
