import React from "react";
import PropTypes from "prop-types";

const Scorekeeper = props => {
  let minutes = Math.floor(props.time / 60);
  let formattedSeconds = props.time - minutes * 60 || 0;

  formattedSeconds =
    formattedSeconds < 10 ? `0${formattedSeconds}` : formattedSeconds;
  let time = `${minutes}:${formattedSeconds}`;
  let status =
    props.status === "running" || props.status === "waiting" ? (
      // <i className="icon ion-social-github" />
      <i className="icon ion-happy-outline" />
    ) : (
      <i className="icon ion-sad-outline" />
    );
  return (
    <div className="score-head">
      <div className="flag-count"><strong>{props.flagsUsed}</strong></div>
      <button className="reset" onClick={props.reset}>
        <strong>{status}</strong>
      </button>
      <div className="timer"><strong>{time}</strong></div>
    </div>
  );
};

Scorekeeper.propTypes = {
  time: PropTypes.number.isRequired,
  flagsUsed: PropTypes.number.isRequired
};

export default Scorekeeper;
