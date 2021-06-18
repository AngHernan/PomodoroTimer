import React from "react";
import {minutesToDuration, secondsToDuration} from "../utils/duration";




export default function ProgressBar({focusDuration, breakDuration, session, isTimerRunning, onBreak, setOnBreak}){
  
  let progress = 0;
  const breakTime = minutesToDuration(Number(breakDuration));
  const focusTime = minutesToDuration(Number(focusDuration))

  function isPaused(isTimerRunning) {
    return isTimerRunning? null : `PAUSED`;
  }
  function focusProgress() {
    progress = (((focusDuration*60) - session.timeRemaining)/(focusDuration*60)*100)
    }        
  function breakProgress() {
    progress = (((breakDuration*60) - session.timeRemaining)/(breakDuration*60)*100)
    }

  if(isTimerRunning){
    if(session.label==="Focusing"){
      focusProgress(); 
    } else {
      breakProgress();
      }
    }
       
    if (session !== null){
    return (<>

        <div>
        {/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
            <h2 data-testid="session-title">
                {session?.label} for {session?.label === 'Focusing'? focusTime : breakTime }  minutes
            </h2>
            {/* TODO: Update message below correctly format the time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
            {secondsToDuration(session?.timeRemaining)} remaining
            </p>
            <h3 >
                {isPaused(isTimerRunning)}
            </h3>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={progress} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: progress+"%"}} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>    
        </>)
    } else {
        
        return null;
    }
}
