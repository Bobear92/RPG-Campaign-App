import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../api";
import { storeToken, storeUser } from "../../auth";

const Login = ({ setLoggedIn }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  let history = useHistory();

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="login-interface-main">
      <form
        id="login"
        onSubmit={async (event) => {
          event.preventDefault();

          try {
            const { token, user } = await loginUser(username, password);
            storeToken(token);
            storeUser(user.username);
            setLoggedIn(true);

            setUsername("");
            setPassword("");
            setError("");
            history.push("/");
          } catch (error) {
            console.log(error.response);
            setError(error);
          } finally {
            refreshPage();
          }
        }}
      >
        <fieldset className="login-username-input">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          ></input>
        </fieldset>

        <fieldset className="login-password-input">
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>
        </fieldset>

        <button className="login-interface-button">Submit</button>
        {error && <p>{error.response}</p>}
      </form>
    </div>
  );
};

export default Login;
