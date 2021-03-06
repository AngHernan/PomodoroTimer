import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import {minutesToDuration} from "../utils/duration";
import StopButton  from "../buttons/stop/StopButton";
import DeltaFocusDuration from "../buttons/settingDurations/DeltaFocusDuration";
import DeltaBreakDuration from "../buttons/settingDurations/DeltaBreakDuration"
import ProgressBar from "../Progress/ProgressBar";

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);
  const [disable, setDisable] = useState(true);

  // ToDo: Allow the user to adjust the focus and break duration <-Working but need to set maximums and minimums .
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
 
  // Disable controller for changing duration of break and focus 
  const [disableDurationChange, setDisableDurationChange] = useState(false);
  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(() => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            setDisable(false)
            setDisableDurationChange(true)
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
  
  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
          <span className="input-group-text" data-testid="duration-focus">
              {/* ***DONE*** TODO: Update this text to display the current focus session duration */}
              Focus Duration: { minutesToDuration(focusDuration)}
            </span>
            <DeltaFocusDuration 
            disableDurationChange={disableDurationChange} 
            setDisableDurationChange={setDisableDurationChange} 
            focusDuration={focusDuration} 
            setFocusDuration={setFocusDuration}/>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* ***DONE*** TODO: Update this text to display the current break session duration */}
                Break Duration: { minutesToDuration(breakDuration)}
              </span>
             <DeltaBreakDuration 
             disableDurationChange={disableDurationChange} 
             setDisableDurationChange={setDisableDurationChange} 
             breakDuration={breakDuration} 
             setBreakDuration={setBreakDuration}/>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* ***DONE*** TODO: Implement stopping the current focus or break session. and disable the stop button when there is no active session */ /* COMPLETED */}
            {/* ***DONE*** TODO: Disable the stop button when there is no active session */  /* COMPLETED */} 
            
            <StopButton 
            disable={disable} 
            setDisable={setDisable} 
            setSession={setSession} 
            setIsTimerRunning={setIsTimerRunning}
            setDisableDurationChange={setDisableDurationChange}/>
          </div>
        </div>
      </div>
        <ProgressBar 
        focusDuration={focusDuration} 
        breakDuration={breakDuration}
        session={session} 
        isTimerRunning={isTimerRunning}
        />
    </div>
  );
}

export default Pomodoro;
