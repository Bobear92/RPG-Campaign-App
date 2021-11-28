import React, { useState } from "react";
import { registerUser } from "../../api";
import { storeToken, storeUser } from "../../auth";

const Register = ({ setLoggedIn }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const admin = false;

  return (
    <div className="register-interface-main">
      <form
        id="register"
        onSubmit={async (event) => {
          event.preventDefault();

          try {
            const { token, user } = await registerUser(
              username,
              password,
              admin
            );
            storeToken(token);
            storeUser(user);
            setLoggedIn(true);

            setUsername("");
            setPassword("");
            setError("");
          } catch (error) {
            console.log(error);
            setError(error);
          }
        }}
      >
        <fieldset className="register-username-input">
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

        <fieldset className="register-password-input">
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

        <button className="register-interface-button">Submit</button>
        {/* {error ? <p>{error.response.data.message}</p> : null} */}
      </form>
    </div>
  );
};

export default Register;
