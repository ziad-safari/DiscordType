import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./TypingSpeed.css";

const TypingSpeed = ({ text }) => {
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  const [accessToken, tokenType] = [
    fragment.get("access_token"),
    fragment.get("token_type"),
  ];
  const [input, setInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const currentCharacter = text[currentIndex];
    const correct = inputValue.endsWith(currentCharacter);
    const now = Date.now();

    if (startTime === 0) {
      setStartTime(now);
    }

    if (correct && inputValue.length === currentIndex + 1) {
      setCurrentIndex(currentIndex + 1);
    }

    setInput(inputValue);

    if (currentIndex === text.length - 1) {
      setEndTime(now);
    }
  };

  const getTypedText = () => {
    const typed = input.slice(0, currentIndex);
    const currentCharacter = text[currentIndex];

    const typedArray = typed.split("");
    if (typedArray.length === 0) {
      return text;
    }

    const typedWithClasses = typedArray.map((char, index) => {
      const isCurrent = index === currentIndex - 1;
      const isCorrect = char === text[index];
      const className = `character ${isCurrent ? "current" : ""} ${
        isCorrect ? "correct" : "incorrect"
      }`;
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });

    const currentCharacterSpan = (
      <span key={currentIndex} className="character current">
        {currentCharacter}
      </span>
    );

    return (
      <>
        {typedWithClasses}
        {currentCharacterSpan}
        {text.slice(currentIndex + 1)}
      </>
    );
  };

  const reset = () => {
    setInput("");
    setCurrentIndex(0);
    setStartTime(0);
    setEndTime(0);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const calculateSpeed = () => {
    if (startTime === 0 || endTime === 0) {
      return 0;
    }

    const timeElapsedInSeconds = (endTime - startTime) / 1000;
    const wordsTyped = input.split(" ").length;
    const wpm = Math.round((wordsTyped / timeElapsedInSeconds) * 60);

    return wpm;
  };

  if (endTime !== 0) {
    fetch("https://discord.com/api/users/@me", {
      headers: {
        authorization: `${tokenType} ${accessToken}`,
      },
    })
      .then((result) => result.json())
      .then((response) => {
        const { id } = response;
        const time = calculateSpeed();
        axios.put("http://localhost:8800/update", { time, id }); // update user WPM when finished if higher
      })
      .catch(console.error);
  }
  return (
    <div className="typing-speed-test">
      <div className="text">{getTypedText()}</div>
      <input
        ref={inputRef}
        className="no-outline"
        value={input}
        onChange={handleInputChange}
      />
      <button onClick={reset}>Reset</button>
      {endTime !== 0 && (
        <div className="speed">Your speed: {calculateSpeed()} WPM</div>
      )}
    </div>
  );
};

export default TypingSpeed;
