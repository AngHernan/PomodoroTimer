import React from "react"


//function to set the duration of the focus time
//default to 5 minutes, no less than 5 or more than 60).
export default function DeltaFocusDuration({disableDurationChange, setDisableDurationChange, focusDuration, setFocusDuration}) {

  const handleIncrease = () => {
    if (focusDuration >= 60) {
      setFocusDuration(60)
    } else {
      setFocusDuration((focusDuration) = focusDuration + 5)
    }
}

  
const handleDecrease = () => {
  if (focusDuration <= 5) {
    setFocusDuration(5)
  } else {
    setFocusDuration((focusDuration) = focusDuration - 5)
  }
}

    return(<>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick={handleDecrease}
                disabled={disableDurationChange}
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                onClick={handleIncrease}
                disabled={disableDurationChange}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
    </>)
}