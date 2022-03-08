import React, { useState } from "react";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { deleteUser } from "../../api";
import "./DeleteUser.css";

const DeleteUser = () => {
  const { name, id } = useParams();
  let history = useHistory();
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <>
      <div className="delete-user-border"></div>
      <div className="delete-user-main-container">
        <h1 className="delete-user-title">
          All user's data will be lost upon deletion!
        </h1>
        <div className="delete-user-delete-container">
          <h3>Do you want to delete user {name}?</h3>
          <div className="delete-user-buttons-container">
            <button
              className="delete-user-button"
              onClick={async (event) => {
                event.preventDefault();
                try {
                  await deleteUser(id);
                } catch (error) {
                  console.error(error);
                } finally {
                  history.push("/");
                  refreshPage();
                }
              }}
            >
              Yes
            </button>
            <Link className="delete-user-button" to={`/`}>
              No
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteUser;
