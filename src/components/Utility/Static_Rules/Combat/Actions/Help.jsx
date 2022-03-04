import React, { useState } from "react";
import "./Help.css";

const Help = () => {
  return (
    <div className="help-main-container">
      <h1>Help</h1>
      <h4>Type: Action</h4>
      <p>
        You can lend your aid to another creature in the completion of a task.
        When you take the Help action, the creature you aid gains advantage on
        the next ability check it makes to perform the task you are helping
        with, provided that it makes the check before the start of your next
        turn.
        <br />
        <br />
        Alternatively, you can aid a friendly creature in attacking a creature
        within 5 feet of you. You feint, distract the target, or in some other
        way team up to make your ally's Attack more effective. If your ally
        attacks the target before your next turn, the first Attack roll is made
        with advantage.
      </p>
    </div>
  );
};

export default Help;
