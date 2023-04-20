import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TopScores.css";

const TopScores = () => {
  const [users, setUsers] = useState([]);

  // fetch all users from the database
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8800/discord");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
  }, []);

  return (
    <div>
      {users.map((user) => {
        return (
          <div className="scores" key={user.id}>
            <img
              className="scorespfp"
              src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpg`}
              alt="banner"
            ></img>
            <h4>{user.name}</h4>
            <p>WPM: {user.wpm} </p>
          </div>
        );
      })}
    </div>
  );
};

export default TopScores;
