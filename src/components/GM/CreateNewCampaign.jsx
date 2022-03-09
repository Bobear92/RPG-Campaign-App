import React, { useState } from "react";
import "./CreateNewCampaign.css";
import { createCampaign } from "../../api/campaigns";
import { useHistory } from "react-router-dom";

const CreateNewCampaign = ({ GM }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const gm = GM;

  let history = useHistory();
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="create-campaign-main-container">
      <h1 className="create-campaign-title">Create Campaign</h1>
      <div className="create-campaign-add-form">
        <form
          id="create_campaign"
          onSubmit={async (event) => {
            event.preventDefault();

            try {
              const data = await createCampaign({
                name,
                gm,
              });
              setName("");
              setError("");
            } catch (error) {
              console.log(error.response);
              console.log(error.response.data.error);
              setError(error);
            } finally {
              history.push("/");
              refreshPage();
            }
          }}
        >
          <fieldset className="add-campaign-input">
            <label htmlFor="name">Campaign Name </label>
            <input
              id="name"
              type="text"
              placeholder="Enter Campaign Name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            ></input>
          </fieldset>
          <div className="create-campaign-button-outer">
            <button type="submit" className="add-campaign-interface-button">
              Create Campaign
            </button>
          </div>
          {error && <p>{error.response.data.error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateNewCampaign;

// works but if wrong stuff put in no error because the finally still happens
