import React, { useEffect, useState } from "react";
import TypingSpeed from "../components/typingbox/TypingSpeed";
import axios from "axios";
import "./Logged.css";
import TopScores from "../components/TopScores/TopScores";

const Logged = () => {
  const [clicked, setClicked] = useState(false);
  const [quote, setQuote] = useState(
    " There's no one that can match me. My style is﻿ impetuous, my defense is impregnable, and I'm just ferocious. I want your heart, I want to eat his children. Praise be to Allah."
  );
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  const [accessToken, tokenType] = [
    fragment.get("access_token"),
    fragment.get("token_type"),
  ];

  // random quote api generator
  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setQuote(data.content);
      });
  }, [clicked]);

  // get the current user
  fetch("https://discord.com/api/users/@me", {
    headers: {
      authorization: `${tokenType} ${accessToken}`,
    },
  })
    .then((result) => result.json())
    .then((response) => {
      const { username, avatar, id } = response;
      axios.post("http://localhost:8800/discord", response); // add user to database
      document.getElementById(
        "name"
      ).innerText = `Welcome ${username}! Type below to start competing against all of our users! Reset the prompt if you don't like it or don't like your performance. See top scores and top guild scores at the top right.`;
      document.getElementById(
        "avatar"
      ).src = `https://cdn.discordapp.com/avatars/${id}/${avatar}.jpg`;
    })
    .catch(console.error);

  return (
    <div className="App">
      <div className="navbar">
        <img className="pfp" id="avatar" alt="banner"></img>
        <div className="desc">
          <h4 id="name"></h4>
        </div>
        <div className="right">
          <TopScores />
        </div>
      </div>
      <div className="body">
        <TypingSpeed text={quote} />
        <button onClick={() => setClicked(!clicked)}>Change text</button>
      </div>
    </div>
  );
};

export default Logged;
