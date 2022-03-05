import React, { useState } from "react";
import { createRule } from "../../api/home_brew_rules";

const AddHomeRule = ({ gmName }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const gm = gmName;

  return (
    <div className="add-home-rule-main-conatiner">
      <h1>Add a Home Brew Rule to your Campaign</h1>
      <div className="home-brew-rules-form-container">
        <form
          id="create_rule"
          onSubmit={async (event) => {
            event.preventDefault();

            try {
              const data = await createRule({ name, description, gm });
              setName("");
              setDescription("");
              setError("");
            } catch (error) {
              console.log(error.response);
              console.log(error.response.data.error);
              setError(error);
            }
          }}
        >
          <fieldset className="add-rule-input">
            <label htmlFor="name">Rule Name </label>
            <input
              id="name"
              type="text"
              placeholder="Enter Rule Name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            ></input>
          </fieldset>

          <fieldset className="add-rule-description-input">
            <label htmlFor="description">Description </label>
            <textarea
              id="description"
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            ></textarea>
          </fieldset>

          <div className="button-outer">
            <button type="submit" className="add-rule-interface-button">
              Add Rule
            </button>
          </div>
          {error && <p>{error.response.data.error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddHomeRule;
