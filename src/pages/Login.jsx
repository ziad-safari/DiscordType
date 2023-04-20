import React from "react";
import { Card } from "primereact/card";
import "./Login.css";

const Login = () => {
  function DiscordLogin({ clientId, scope = "identify", redirectUri }) {
    const handleMessage = (event) => {
      console.log(event);
    };

    const onClick = async (e) => {
      window.location.replace(
        `https://discord.com/api/oauth2/authorize?response_type=token&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`
      );
      window.addEventListener("message", handleMessage, false);
      try {
      } catch (err) {
        console.log(err.response.data);
      }
    };

    return (
      <button className="button" onClick={onClick}>
        Login with Discord
      </button>
    );
  }

  const header = (
    <img
      alt="Card"
      src="https://www.freepnglogos.com/uploads/discord-logo-png/discord-logo-logodownload-download-logotipos-1.png"
      style={{ width: "100px", height: "100px" }}
    />
  );

  return (
    <div className="body">
      <Card header={header} className="md:w-25rem">
        <p className="m-0">
          Hey! DiscordType is a web application that allows you to login with
          discord and compete in a typing speed test against your friends! Login
          with discord below to continue.
        </p>
      </Card>
      <DiscordLogin
        clientId="1085642207438049430"
        redirectUri="http://localhost:3000/logged"
      />
    </div>
  );
};

export default Login;
