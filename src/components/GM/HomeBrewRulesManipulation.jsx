import React, { useState } from "react";
import {
  createRule,
  deleteRule,
  updateRuleVisibleStatus,
} from "../../api/home_brew_rules";
import "./HomeBrewRulesManipulation.css";

const HomeBrewRulesManipulation = ({ gmName, allMyRules }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const gm = gmName;

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="home-rule-manipulation-main-container">
      <h1>Home Brew Rules Control Center</h1>
      <div className="home-rule-manipulation-add-main-container">
        <h2>Add a Home Brew Rule to your Campaign</h2>
        <div className="home-brew-rules-manipulation-add-form">
          <form
            id="create_rule"
            onSubmit={async (event) => {
              event.preventDefault();

              try {
                const data = await createRule({
                  name,
                  description,
                  visible,
                  gm,
                });
                setName("");
                setDescription("");
                setVisible(false);
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
            <fieldset className="add-rule-visible-input">
              <label htmlFor="visible">Visible to players</label>
              <input
                type="checkbox"
                id="visible"
                value={visible}
                onChange={(event) => {
                  setVisible(event.target.checked); // if uncheck doesn't go through as false, breaks everything
                }}
              ></input>
            </fieldset>

            <div className="button-outer">
              <button
                type="submit"
                className="add-rule-interface-button"
                onClick={refreshPage}
              >
                Add Rule
              </button>
            </div>
            {error && <p>{error.response.data.error}</p>}
          </form>
        </div>
        <div className="home-brew-rules-manipulation-border"></div>
      </div>
      <div className="home-rule-manipulation-content-main-container">
        <h2>All the Rules you have created.</h2>
        <div className="home-brew-rules-rule-map-main-component">
          {allMyRules && allMyRules.length
            ? allMyRules.map((rule, idx) => {
                return (
                  <div
                    className="home-brew-rules-rule-map-component"
                    key={`rule inside of rules map in home brew rules ${rule.name} ${idx}`}
                  >
                    <h3>{rule.name}</h3>
                    <p>{rule.description}</p>
                    {rule.visible ? (
                      <>
                        <p>Players can see this rule</p>
                        <button
                          className="visible-status-rule-button"
                          onClick={async (event) => {
                            event.preventDefault();
                            try {
                              await updateRuleVisibleStatus(rule.id, false);
                            } catch (error) {
                              console.error(error);
                            } finally {
                              refreshPage();
                            }
                          }}
                        >
                          Hide Rule
                        </button>
                      </>
                    ) : (
                      <>
                        <p>Players cannot see this rule.</p>
                        <button
                          className="visible-status-rule-button"
                          onClick={async (event) => {
                            event.preventDefault();
                            try {
                              await updateRuleVisibleStatus(rule.id, true);
                            } catch (error) {
                              console.error(error);
                            } finally {
                              refreshPage();
                            }
                          }}
                        >
                          Show Rule
                        </button>
                      </>
                    )}
                    <button
                      className="delete-rule-button"
                      onClick={async (event) => {
                        event.preventDefault();

                        try {
                          await deleteRule(rule.id);
                        } catch (error) {
                          console.error(error);
                        } finally {
                          refreshPage();
                        }
                      }}
                    >
                      Delete Rule
                    </button>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default HomeBrewRulesManipulation;
