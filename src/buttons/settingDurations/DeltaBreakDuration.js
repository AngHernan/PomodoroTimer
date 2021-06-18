import React from "react"


//function to set the duration of the break time
//default to 5 minutes, no less than 1 or more than 15).
export default function DeltaBreakDuration({disableDurationChange, setDisableDurationChange, breakDuration, setBreakDuration}) {
  const handleIncrease = () => {
    if (breakDuration >= 15) {
      setBreakDuration(15)
    } else {
      setBreakDuration((breakDuration) = breakDuration + 1)
    }
}

  
const handleDecrease = () => {
  if (breakDuration <= 1) {
    setBreakDuration(1)
  } else {
    setBreakDuration((breakDuration) = breakDuration - 1)
  }
}
    return (<>
         <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick={handleDecrease}
                  disabled={disableDurationChange}
                >
                  <span className="oi oi-minus" />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick={handleIncrease}
                  disabled={disableDurationChange}
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
    </>)
}