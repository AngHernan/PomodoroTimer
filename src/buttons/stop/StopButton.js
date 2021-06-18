  import React from "react";

  /**
   * Called whenever the play/pause button is clicked.
   */
export default function StopButton({disable, setDisable, setSession, setIsTimerRunning, setDisableDurationChange}){
  function handleClick(){
    setDisable(true)
    setDisableDurationChange(false)
    setSession(null) 
    setIsTimerRunning(false);
}

return(<>

    {/* TODO: Implement stopping the current focus or break session. and disable the stop button when there is no active session */ /* COMPLETED */}
    {/* TODO: Disable the stop button when there is no active session */  /* COMPLETED */} 
    
    <button
      type="button"
      className="btn btn-secondary"
      data-testid="stop"
      title="Stop the session"
      onClick={handleClick}
      disabled={disable}
    >
      <span className="oi oi-media-stop" />
    </button>
 
</>)
}