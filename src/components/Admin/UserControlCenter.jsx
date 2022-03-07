import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeGM } from "../../api";
import "./UserControlCenter.css";

const UserControlCenter = ({ allUsers }) => {
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="user-control-center-main-component">
      <h1 className="user-control-center-title">All Users</h1>
      <div className="user-control-center-border"></div>
      <div className="user-control-center-users-component">
        <h3 className="user-control-center-title">All Players</h3>
        <div className="user-control-center-users-inner-container">
          {allUsers && allUsers.length
            ? allUsers.map((user, idx) => {
                return user.admin === false && user.gm === false ? (
                  <div
                    className="user-control-center-individual-user"
                    key={`User in player section from user list ${user.username} ${user.id} ${idx}`}
                  >
                    <h4>{user.username}</h4>
                    <div className="user-control-center-buttons">
                      <button
                        className="user-control-center-button"
                        onClick={async (event) => {
                          event.preventDefault();
                          try {
                            await makeGM(user.id);
                          } catch (error) {
                            console.error(error);
                          } finally {
                            refreshPage();
                          }
                        }}
                      >
                        Promote to Game Master
                      </button>
                      <Link
                        className="user-control-center-button"
                        to={`/delete-user/${user.username}/${user.id}`}
                      >
                        Delete User
                      </Link>
                    </div>
                  </div>
                ) : null;
              })
            : null}
        </div>
      </div>
      <div className="user-control-center-border"></div>
      <div className="user-control-center-users-component">
        <h3 className="user-control-center-title">All Game Masters</h3>
        <div className="user-control-center-users-inner-container">
          {allUsers && allUsers.length
            ? allUsers.map((user, idx) => {
                return user.gm === true ? (
                  <div
                    className="user-control-center-individual-user"
                    key={`User in game master section from user list ${user.username} ${user.id} ${idx}`}
                  >
                    <h4>{user.username}</h4>
                    <div className="user-control-center-buttons">
                      <Link
                        className="user-control-center-button"
                        to={`/delete-user/${user.username}/${user.id}`}
                      >
                        Delete User
                      </Link>
                    </div>
                  </div>
                ) : null;
              })
            : null}
        </div>
      </div>
      <div className="user-control-center-border"></div>
      <div className="user-control-center-users-component">
        <h3 className="user-control-center-title">Administrator</h3>
        {allUsers && allUsers.length
          ? allUsers.map((user, idx) => {
              return user.admin === true ? (
                <div
                  className="user-control-center-individual-user"
                  key={`User in admin section from user list ${user.username} ${user.id} ${idx}`}
                >
                  <h4 className="user-control-center-button">
                    {user.username}
                  </h4>
                  <p className="user-control-center-button">The One And Only</p>
                </div>
              ) : null;
            })
          : null}
      </div>
    </div>
  );
};

export default UserControlCenter;
