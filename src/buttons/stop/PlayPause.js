import React from "react";

 
  /**
   * Called whenever the play/pause button is clicked.
   */
export default function PlayPause() {

  function handleClick() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          //set stop button disable to false 
          if (prevStateSession === null) {
            setDisable(false)
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

return (<>

<button
      type="button"
      className="btn btn-primary"
      data-testid="play-pause"
      title="Start or pause timer"
      onClick={handleClick}
    >
      <span
        className={classNames({
          oi: true,
          "oi-media-play": !isTimerRunning,
          "oi-media-pause": isTimerRunning,
        })}
      />
    </button>

    </>) }